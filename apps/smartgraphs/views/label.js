// ==========================================================================
// Project:   Smartgraphs.LabelView
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews*/

sc_require('views/editable_label');

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.LabelView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.LabelView.prototype */ {

  // The 'item', 'graphView', and 'controller' will be set for us (overwriting the below) if we are added directly
  // to the graphView. If we are the exampleView of a LabelSet collection view, on the other hand, we need to find the
  // properties as shown below. Note that these values, once set, should be cached.
  item: function () {
    return this.get('content');
  }.property().cacheable(),

  graphView: function () {
    return this.getPath('parentView.graphView');
  }.property().cacheable(),

  controller: function () {
    return this.getPath('parentView.controller');
  }.property().cacheable(),

  textBinding:       '*item.text',
  textColor:         '#333333',
  stroke:            '#000000',
  highlightedStroke: '#6699ff',
  fill:              '#ffffff',

  shouldMarkTargetPointBinding: '*item.shouldMarkTargetPoint',
  shouldMarkTargetPointBindingDefault: SC.Binding.oneWay(),

  isBodyDragging: NO,

  markerStyle: 'arrow', // 'arrow', 'x', or 'none'
  markerSize:  10,

  xBinding:       '*item.x',
  yBinding:       '*item.y',

  topAnnotationHolderBinding: '*graphView.topAnnotationHolder',

  xOffsetBinding: '*item.xOffset',
  yOffsetBinding: '*item.yOffset',

  isPositionUpdateRequiredBinding: '*item.isPositionUpdateRequired',

  isRemovalEnabledBinding: '*item.isRemovalEnabled',
  isEditableBinding: '*item.isEditable',
  
  // graphScale isn't a real property, just a token we use to invalidate (xCoord, yCoord)
  xCoord: function () {
    return this.get('graphView').coordinatesForPoint(this.get('x'), 0).x;
  }.property('x', 'graphScale'),

  yCoord: function () {
    return this.get('graphView').coordinatesForPoint(0, this.get('y')).y;
  }.property('y', 'graphScale'),

  defaultWidth: 100,
  defaultHeight: 45,

  labelBodyWidthBinding:  '.labelBodyView.width',
  labelBodyHeightBinding: '.labelBodyView.height',
  cornerRadius: 4,

  bodyXCoord: null,
  bodyYCoord: null,

  anchorXCoord: null,
  anchorYCoord: null,

  labelTextView: SC.outlet('labelBodyView.labelTextView'),

  didRemoveFromGraphView: function () {
    this.get('labelTextView').didRemoveFromGraphView();
  },

  coordsDidChange: function () {
    var topAnnotationHolder = this.get('topAnnotationHolder');
    var xCoord  = this.get('xCoord'),
        yCoord  = this.get('yCoord'),
        xOffset = this.get('xOffset'),
        yOffset = this.get('yOffset'),
        height  = this.get('labelBodyHeight'),
        width   = this.get('labelBodyWidth');

    // Calculation of xOffset and yOffset when label is not being dragged.
    // Checks and calculation to keep labels within the graph pane.
    if (!this.isBodyDragging) {
      this.getLabelBodyWithinBounds();
      xOffset = this.get('xOffset');
      yOffset = this.get('yOffset');
    }

    this.set('bodyXCoord',   xCoord + xOffset);
    this.set('anchorXCoord', xCoord + xOffset + width / 2);
    this.set('bodyYCoord',   yCoord + yOffset - height);
    this.set('anchorYCoord', yCoord + yOffset);

    var originalX = this.get('bodyXCoord');
    var originalY = this.get('bodyYCoord');
    var graphView = this.get('graphView');

    if (graphView) {
      var item = this.get('item');
      var arrLabelsLayout = graphView.get('arrLabelsLayout');
      var obj = this.checkObjectInArray(item);
      if (!obj) {
        obj = {
          item: item,
          right: this.get('bodyXCoord') + width,
          bottom: this.get('bodyYCoord') + height,
          left: this.get('bodyXCoord'),
          top: this.get('bodyYCoord'),
          width: width,
          height: height
        };
        arrLabelsLayout.push(obj);
      }
      else {
        obj.item = item;
        obj.right = this.get('bodyXCoord') + width;
        obj.bottom = this.get('bodyYCoord') + height;
        obj.left = this.get('bodyXCoord');
        obj.top = this.get('bodyYCoord');
        obj.width = width;
        obj.height = height;
      }
    }
  }.observes('xCoord', 'yCoord', 'xOffset', 'yOffset', 'labelBodyWidth', 'labelBodyHeight'),

  // Do all the position calculation in here.
  updateLabelPosition: function () {
    var isPositionUpdateRequired = this.get('isPositionUpdateRequired');

    if (isPositionUpdateRequired) {
      this.beginPropertyChanges();

      // Position related calculations
      this.avoidOverlapsWithOtherLabels();
      this.avoidAxes();
      this.checkConnectingLineLength();

      this.endPropertyChanges();

      this.getLabelBodyWithinBounds();
      this.set('isPositionUpdateRequired', NO);
    }
  }.observes('isPositionUpdateRequired'),

  // Check overlapping with other labels
  avoidOverlapsWithOtherLabels: function () {
    this.beginPropertyChanges();
    var originalX = this.get('bodyXCoord');
    var originalY = this.get('bodyYCoord');
    var graphView = this.get('graphView');

    if (graphView) {
      var item = this.get('item');
      var arrLabelsLayout = graphView.get('arrLabelsLayout');
      var obj = this.checkLabelInArray(item);

      var newPositionedObj = this.getNewPosition(arrLabelsLayout, obj);
      if (newPositionedObj) {
        this.set('xOffset', newPositionedObj.left - originalX + this.xOffset);
        this.set('yOffset', newPositionedObj.top - originalY + this.yOffset);
      }
    }
    this.endPropertyChanges();
  },

  getNewPosition: function (arrLabelsLayout, obj) {
    if (arrLabelsLayout.length === 1) {
      return obj;
    }

    var newPositionedObj = obj;
    for (var i = 0; i < arrLabelsLayout.length; i++) {
      if (arrLabelsLayout[i] === obj) {
        continue;
      }
      var tempNewPos = this.getNewPostionLayout(arrLabelsLayout[i], newPositionedObj);
      if (tempNewPos !== null) {
        newPositionedObj = tempNewPos;
      }
      else {
        continue;
      }
      if (newPositionedObj) {
        var bFlag = false;
        for (var j = 0; j < arrLabelsLayout.length; j++) {
          if (j !== i && arrLabelsLayout[j] !== obj) {
            if (this.checkOverlap(arrLabelsLayout[j], newPositionedObj)) {
              bFlag = true;
              break; 
            }
          }
        }
        if (!bFlag) {
          return newPositionedObj;
        }
      }
    }
    return obj;
  },

  // Check overlapping with axes
  avoidAxes: function () {
    
  },

  // Check connecting line's length'
  checkConnectingLineLength: function () {
    
  },

  getLabelBodyWithinBounds: function () {
    var xCoord  = this.get('xCoord'),
        yCoord  = this.get('yCoord'),
        xOffset = this.get('xOffset'),
        yOffset = this.get('yOffset'),
        height  = this.get('labelBodyHeight'),
        width   = this.get('labelBodyWidth');
    var graphView = this.get('graphView');
    var strokeWidth = this.get('labelBodyView').strokeWidth();
    var padding = graphView.get('padding');
    var xAxis = graphView.get('xAxis');
    var yAxis = graphView.get('yAxis');

    var topLeft = graphView.coordinatesForPoint(xAxis.get('min'), yAxis.get('max'));
    var bottomRight = graphView.coordinatesForPoint(xAxis.get('max'), yAxis.get('min'));

    var bounds = {};
    bounds.left = topLeft.x - padding.left;
    bounds.right = bottomRight.x + padding.right - 2 * strokeWidth - width;
    bounds.top = topLeft.y - padding.top + height;
    bounds.bottom = bottomRight.y + padding.bottom - 2 * strokeWidth;

    this.beginPropertyChanges();

    if ((xCoord + xOffset) < bounds.left) {
      this.set('xOffset', bounds.left - xCoord);
    }
    else if ((xCoord + xOffset) > bounds.right) {
      this.set('xOffset', bounds.right - xCoord);
    }

    if ((yCoord + yOffset) < bounds.top) {
      this.set('yOffset', bounds.top - yCoord);
    }
    else if ((yCoord + yOffset) > bounds.bottom) {
      this.set('yOffset', bounds.bottom - yCoord);
    }

    this.endPropertyChanges();
  },

  checkLabelInArray: function (item) {
    var graphView = this.get('graphView');
    var arrObjects = graphView.get('arrLabelsLayout');

    for (var i = 0; i < arrObjects.length; i++) {
      if (arrObjects[i].item === item) {
        return arrObjects[i];
      }
    }
    return null;
  },

  getNewPostionLayout: function (rectA, rectB) {
    var bOverlap = this.checkOverlap(rectA, rectB);
    if (bOverlap) {
      var newRect = {
        top: rectB.top,
        bottom: rectB.bottom,
        left: rectB.left,
        right: rectB.right,
        width: rectB.width,
        height: rectB.height
      };
      var gap = 15;
      if (rectA.left <= rectB.left) {
        newRect.left = rectA.right + gap;
        newRect.right = newRect.left + rectB.width;
      }
      else {
        newRect.left = rectA.left - rectB.width - gap;
        newRect.right = newRect.left + rectB.width;
      }
      if (rectA.top <= rectB.top) {
        newRect.top = rectA.bottom + gap;
        newRect.bottom = newRect.top + rectB.height;
      }
      else {
        newRect.top = rectA.top - rectB.height - gap;
        newRect.bottom = newRect.top + rectB.height;
      }
      return newRect;
    }
    else {
      return null;
    }
  },

  checkOverlap: function (rectA, rectB) {
    var bOverlap = this.intersectRect(rectA, rectB);
    return bOverlap;
  },

  intersectRect: function (r1, r2) {
    return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
  },

  didCreateLayer: function () {
    sc_super();
    this.$().css('cursor', 'default');
    this.get('item').set('view', this);

    if (this.get('isPositionUpdateRequired') === null) {
      this.set('isPositionUpdateRequired', YES);
    }
  },

  viewDidResize: function () {
    this.invokeLast(this.notifyGraphScaleChange);
  },

  notifyGraphScaleChange: function () {
    this.notifyPropertyChange('graphScale');
  },

  childViews: 'targetPointView connectingLineView labelBodyView'.w(),

  targetPointView: RaphaelViews.RaphaelView.design(Smartgraphs.ArrowDrawing, {

    labelView: SC.outlet('parentView'),

    xCoordBinding:       '.labelView.xCoord',
    yCoordBinding:       '.labelView.yCoord',
    anchorXCoordBinding: '.labelView.anchorXCoord',
    anchorYCoordBinding: '.labelView.anchorYCoord',
    strokeBinding:       '.labelView.stroke',
    markerStyleBinding:  '.labelView.markerStyle',
    markerSizeBinding:   '.labelView.markerSize',

    // Using a computed property for 'isVisible' here
    // because the following locks up the jasmine test for some reason:
    // isVisibleBinding: '.labelView.shouldMarkTargetPoint',
    // isVisibleBindingDefault: SC.Binding.oneWay(),

    shouldMarkTargetPointBinding: '.labelView.shouldMarkTargetPoint',
    defaultFillBinding:           '.labelView.stroke',
    highlightedFillBinding:       '.labelView.highlightedStroke',
    isHighlightedBinding:         '.labelView.isBodyDragging',

    fill: function () {
      return this.get('isHighlighted') ? this.get('highlightedFill') : this.get('defaultFill');
    }.property('isHighlighted', 'highlightedFill', 'defaultFill').cacheable(),

    strokeWidth: function () {
      return this.get('isHighlighted') ? this.get('highlightedStrokeWidth') : this.get('defaultStrokeWidth');
    }.property('isHighlighted', 'highlightedStrokeWidth', 'defaultStrokeWidth').cacheable(),

    displayProperties: 'xCoord yCoord anchorXCoord isHighlighted anchorYCoord stroke startRadius'.w(),

    isVisible: function () {
      return this.get('shouldMarkTargetPoint');
    }.property('shouldMarkTargetPoint').cacheable(),

    renderCallback: function(raphaelCanvas, pathString, stroke) {
      return raphaelCanvas.path(pathString).attr({ stroke: stroke });
    },

    render: function (context, firstTime) {
      var xCoord     = this.get('xCoord'),
          yCoord     = this.get('yCoord'),
          fill       = this.get('fill'),
          pathString,
          raphaelPath;

      pathString = this.markPath();
      if (firstTime) {
        context.callback(this, this.renderCallback, pathString, fill);
        this.renderChildViews(context, firstTime);
      }
      else {
        raphaelPath = this.get('raphaelObject');
        raphaelPath.attr({
          path: pathString,
          fill: fill,
          stroke: fill
        });
      }
    },

    /*
    *  Render the marker at this.xCoord, this.yCoord.
    */
    markPath: function() {
      if( this.get('markerStyle') == 'arrow') {
        return this.arrowMark();
      }
      if (this.get('markerStyle') == 'x') {
        return this.xMark();
      }
      // TODO: should we note that no marker was specified?
      return this.emptyPath();
    },

    /*
    *  Render an empty path for no marker.
    */
    emptyPath: function() {
      return "M 0 0";
    },

    /*
    *  Render an arrow -> mark at  this.xCoord, this.yCoord.
    */
    arrowMark: function() {
      var startx = this.get('anchorXCoord'),
        starty   = this.get('anchorYCoord'),
        endx     = this.get('xCoord'),
        endy     = this.get('yCoord'),
        len      = this.get('markerSize'),
        angle    = 20;
      if (SC.none(startx) || SC.none(starty) || SC.none(endx) || SC.none(endy) || SC.none(angle)) {
        return this.emptyPath();
      }
      return this.arrowPath(startx,starty,endx,endy,len,angle);
    },

    /*
    *  Render an "x" mark at  this.xCoord, this.yCoord.
    */
    xMark: function () {
      var elements = [],
          xCoord   = this.get('xCoord'),
          yCoord   = this.get('yCoord'),
          diameter = this.get('markerSize'),
          radius   = diameter / 2,
          x        = xCoord - radius,
          y        = yCoord + radius;

      if (SC.none(xCoord) || SC.none(yCoord)) return this.emptyPath();
      elements.push('M', x, y);
      elements.push('L', x + diameter, y - diameter);

      x = xCoord - radius;
      y = yCoord - radius;

      elements.push('M', x , y);
      elements.push('L', x + diameter, y + diameter);
      return elements.join(' ');
    }
  }),

  connectingLineView: RaphaelViews.RaphaelView.design({

    displayProperties: 'xCoord yCoord anchorXCoord anchorYCoord stroke startRadius'.w(),

    labelView: SC.outlet('parentView'),

    defaultStrokeWidth:       1,
    highlightedStrokeWidth:   2,

    defaultStrokeBinding:     '.labelView.stroke',
    highlightedStrokeBinding: '.labelView.highlightedStroke',
    isHighlightedBinding:     '.labelView.isBodyDragging',
    xCoordBinding:            '.labelView.xCoord',
    yCoordBinding:            '.labelView.yCoord',
    anchorXCoordBinding:      '.labelView.anchorXCoord',
    anchorYCoordBinding:      '.labelView.anchorYCoord',

    stroke: function () {
      return this.get('isHighlighted') ? this.get('highlightedStroke') : this.get('defaultStroke');
    }.property('isHighlighted', 'highlightedStroke', 'defaultStroke').cacheable(),

    strokeWidth: function () {
      return this.get('isHighlighted') ? this.get('highlightedStrokeWidth') : this.get('defaultStrokeWidth');
    }.property('isHighlighted', 'highlightedStrokeWidth', 'defaultStrokeWidth').cacheable(),

    // How far from the targetPointView's center to start drawing the connecting line
    startRadius: 9,

    renderCallback: function (raphaelCanvas, pathString, stroke, strokeWidth) {
      return raphaelCanvas.path(pathString).attr({stroke: stroke, 'stroke-width': strokeWidth});
    },

    render: function (context, firstTime) {
      var xCoord       = this.get('xCoord'),
          yCoord       = this.get('yCoord'),
          anchorXCoord = this.get('anchorXCoord'),
          anchorYCoord = this.get('anchorYCoord'),
          stroke       = this.get('stroke'),
          strokeWidth  = this.get('strokeWidth'),
          startRadius  = this.get('startRadius'),
          dx           = anchorXCoord - xCoord,
          dy           = anchorYCoord - yCoord,

          // dist. between (xCoord, yCoord) and (anchorXCoord, anchorYCoord)
          length       = Math.sqrt( dx*dx + dy*dy ),
          startX,
          startY,
          pathString,
          raphaelPath,
          arrowP;

      if (SC.none(xCoord) || SC.none(yCoord) || SC.none(anchorXCoord) || SC.none(anchorYCoord)) {
        pathString = 'M 0 0';
      }
      else {
        startX     = xCoord + (startRadius / length) * dx;
        startY     = yCoord  + (startRadius / length) * dy;
        pathString = ['M', startX, startY, 'L', anchorXCoord, anchorYCoord].join(' ');
      }

      if (firstTime) {
        context.callback(this, this.renderCallback, pathString, stroke, strokeWidth);
        this.renderChildViews(context, firstTime);
      }
      else {
        raphaelPath = this.get('raphaelObject');
        raphaelPath.attr({ path: pathString, stroke: stroke, 'stroke-width': strokeWidth });
      }
    }

  }),

  labelBodyView: RaphaelViews.RaphaelView.design({

    childViews: 'labelTextView removeButtonView'.w(),

    parentLabelView: SC.outlet('parentView'),
    labelView:     SC.outlet('parentLabelView'),
    graphView:     SC.outlet('labelView.graphView'),
    topAnnotationHolder: SC.outlet('graphView.topAnnotationHolder'),

    displayProperties:   'bodyXCoord bodyYCoord width height stroke strokeWidth fill cornerRadius'.w(),

    itemBinding:         '.parentLabelView.item',
    textBinding:         '.parentLabelView.text',
    textColorBinding:    '.parentLabelView.textColor',

    bodyXCoordBinding:   '.parentLabelView.bodyXCoord',
    bodyYCoordBinding:   '.parentLabelView.bodyYCoord',
    xOffsetBinding:      '.parentLabelView.xOffset',
    yOffsetBinding:      '.parentLabelView.yOffset',

    textWidthBinding:    '.labelTextView.width',
    textHeightBinding:   '.labelTextView.height',

    fillBinding:         '.parentLabelView.fill',
    cornerRadiusBinding: '.parentLabelView.cornerRadius',

    defaultStrokeBinding:     '.parentLabelView.stroke',
    highlightedStrokeBinding: '.parentLabelView.highlightedStroke',
    defaultStrokeWidth:       1,
    highlightedStrokeWidth:   2,
    leftMargin:               12,
    topMargin:                12, 
    rightMargin:              SC.platform.touch ? 30 : 20,
    bottomMargin:             12,
    isHighlightedBinding:     '.parentLabelView.isBodyDragging',

    width: function () {
      var textWidth = this.get('textWidth');
      if (textWidth) {
        return this.get('textWidth') + this.get('leftMargin') + this.get('rightMargin');
      }
      return 100;
    }.property('textWidth').cacheable(),

    height: function () {
      var textHeight = this.get('textHeight');
      if (textHeight) {
        return this.get('textHeight') + this.get('bottomMargin') + this.get('topMargin');
      }
      return 30;
    }.property('textHeight').cacheable(),

    stroke: function () {
      return this.get('isHighlighted') ? this.get('highlightedStroke') : this.get('defaultStroke');
    }.property('isHighlighted', 'highlightedStroke', 'defaultStroke').cacheable(),

    strokeWidth: function () {
      return this.get('isHighlighted') ? this.get('highlightedStrokeWidth') : this.get('defaultStrokeWidth');
    }.property('isHighlighted', 'highlightedStrokeWidth', 'defaultStrokeWidth').cacheable(),


    renderCallback: function (raphaelCanvas, attrs) {
      return raphaelCanvas.rect().attr(attrs);
    },

    render: function (context, firstTime) {
      var attrs = {
            x:              this.get('bodyXCoord')   || 0,
            y:              this.get('bodyYCoord')   || 0,
            width:          this.get('width')        || 0,
            height:         this.get('height')       || 0,
            r:              this.get('cornerRadius') || 0,
            stroke:         this.get('stroke'),
            'stroke-width': this.get('strokeWidth')  || 1,
            fill:           this.get('fill'),
            'fill-opacity': 1.0
          },

          raphaelRect;

      if (firstTime) {
        context.callback(this, this.renderCallback, attrs);
        this.renderChildViews(context, firstTime);
      }
      else {
        raphaelRect = this.get('raphaelObject');
        raphaelRect.attr(attrs);
      }
    },

    // Dragging. Note that dragging is 'stateless' in the sense that you can always drag a label view. So we won't hook
    // into states or the controller layer. We also assume until proven otherwise that we can modify our own cursor
    // without consequence.
    mouseDown: function (evt) {
      this.startDrag(evt);
      return YES;
    },

    touchStart: function (evt) {
      this.startDrag(evt);
      return YES;
    },

    mouseUp: function (evt)  { return this._mouseUpOrTouchEnd(evt); },
    touchEnd: function (evt) { return this._mouseUpOrTouchEnd(evt); },

    _mouseUpOrTouchEnd: function(evt) {
      this.endDrag(evt);
      var now      = new Date().getTime(),// ms
          interval = 202,                 // ms
          maxTime  = 200;                 // ms

      if (typeof this.lastUp != 'undefined' && this.lastUp) {
        interval  = now - this.lastUp;
        if (interval < maxTime) {
          return this.doubleClick(evt);
        }
      }
      this.lastUp = now;
      return NO;
    },

    doubleClick: function (evt) {
      this.labelTextView.beginEditing();
      return YES;
    },

    mouseDragged: function (evt) {
      this.drag(evt);
      return YES;
    },

    touchesDragged: function (evt) {
      this.drag(evt);
      return YES;
    },

    startDrag: function (evt) {
      this.setPath('parentLabelView.isBodyDragging', YES);
      if (this.labelTextView.textFieldView.get('value') || this.labelTextView.textFieldView.get('value') === "") {
        var self = this;
        // Wrapping this in the run loop so that we get updated height and width before starting the drag.
        SC.run(function () {
          self.labelTextView.set('text', self.labelTextView.textFieldView.get('value'));
        });
      }
      this._isDragging = YES;
      this._dragX = evt.pageX;
      this._dragY = evt.pageY;
      var topAnnotationHolder = this.getPath('topAnnotationHolder');

      var frameWidth = topAnnotationHolder.$().width();
      var frameHeight = topAnnotationHolder.$().height();
      var labelWidth = this.width();
      var labelHeight = this.height();
      var labelTop = this.get('bodyYCoord');
      var labelLeft = this.get('bodyXCoord');
      var xOffset = this.get('xOffset');
      var yOffset = this.get('yOffset');
      var widthBound = frameWidth - labelWidth;
      var heightBound = frameHeight - labelHeight;

      this._mouseDownInfo = {
        minXOffset: xOffset - labelLeft,
        maxXOffset: widthBound - labelLeft + xOffset,
        minYOffset: yOffset - labelTop,
        maxYOffset: heightBound - labelTop + yOffset,
        xMIN: evt.pageX - labelLeft,
        xMAX: evt.pageX - labelLeft + widthBound,
        yMIN: evt.pageY - labelTop,
        yMAX: evt.pageY - labelTop + heightBound
      };

      // our layer doesn't respect SC.Cursor, so set the cursors manually
      this.$().css('cursor', 'move');
      return YES;
    },

    drag: function (evt) {
      var xOffset = this.get('xOffset'),
          yOffset = this.get('yOffset');

      if (!this._isDragging) { 
        return;
      }

      var info = this._mouseDownInfo,
          currXOffset, currYOffset;

      currXOffset = xOffset + evt.pageX - this._dragX;
      if (evt.pageX < info.xMIN) {
        currXOffset = info.minXOffset;
      }
      if (evt.pageX > info.xMAX) {
        currXOffset = info.maxXOffset;
      }
      

      currYOffset = yOffset + evt.pageY - this._dragY;
      if (evt.pageY < info.yMIN) {
        currYOffset = info.minYOffset;
      }
      if (evt.pageY > info.yMAX) {
        currYOffset = info.maxYOffset;
      }

      this._dragX = evt.pageX;
      this._dragY = evt.pageY;

      this.parentLabelView.beginPropertyChanges();
      this.set('xOffset', currXOffset);
      this.set('yOffset', currYOffset);
      this.parentLabelView.endPropertyChanges();
    },

    endDrag: function (evt) {
      this.drag(evt);
      this.setPath('parentLabelView.isBodyDragging', NO);
      this._isDragging = NO;

      this.$().css('cursor', 'default');
      return YES;
    },

    labelTextView: Smartgraphs.EditableLabelView.design({
      labelView:     SC.outlet('parentView.parentLabelView'),
      isEditableBinding: '.labelView.isEditable',
      fontSize: 14
    }),

    removeButtonView: RaphaelViews.RaphaelView.design({

      displayProperties: 'bodyXCoord bodyYCoord width isHighlighted'.w(),

      labelBodyView: SC.outlet('parentView'),
      labelView:     SC.outlet('parentView.parentLabelView'),
      graphView:     SC.outlet('labelView.graphView'),
      graphCanvasView: SC.outlet('graphView.graphCanvasView'),

      widthBinding:      '.labelBodyView.width',
      bodyXCoordBinding: '.labelBodyView.bodyXCoord',
      bodyYCoordBinding: '.labelBodyView.bodyYCoord',

      isRemovalEnabledBinding: '.labelView.isRemovalEnabled',
      
      radius: SC.platform.touch ? 10 : 6,

      centerX: function () {
        return this.get('bodyXCoord') + this.get('width') - 4 - this.get('radius') || 0;
      }.property(),
      
      centerY: function () {
        return this.get('bodyYCoord') + 4 + this.get('radius') || 0;
      }.property(),
      
      isVisible: function () {
        return this.get('isRemovalEnabled');
      }.property('isRemovalEnabled'),

      isHighlighted: NO,

      highlightedCircleColor:    '#999999',
      notHighlightedCircleColor: '#ffffff',
      highlightedXStroke:        '#ffffff',
      notHighlightedXStroke:     '#999999',

      circleColor: function () {
        return this.get('isHighlighted') ? this.get('highlightedCircleColor') : this.get('notHighlightedCircleColor');
      }.property('isHighlighted', 'highlightedCircleColor', 'notHighlightedCircleColor').cacheable(),

      xStroke: function () {
        return this.get('isHighlighted') ? this.get('highlightedXStroke') : this.get('notHighlightedXStroke');
      }.property('isHighlighted', 'highlightedXStroke', 'notHighlightedXStroke').cacheable(),
      
      xStrokeWidth: SC.platform.touch ? 3 : 2,

      renderCallback: function (raphaelCanvas, circleAttrs, xAttrs) {
        return raphaelCanvas.set().push(
          raphaelCanvas.circle().attr(circleAttrs),
          raphaelCanvas.path().attr(xAttrs)
        );
      },

      render: function (context, firstTime) {
        var radius  = this.get('radius'),
            t       = radius / 2,
            centerX = this.get('centerX'),
            centerY = this.get('centerY'),

            circleAttrs = {
              r:      radius,
              cx:     centerX,
              cy:     centerY,
              stroke: this.get('circleColor'),
              fill:   this.get('circleColor')
            },

            xPath = ['M', centerX - t, centerY - t, 'L', centerX + t, centerY + t,
                     'M', centerX - t, centerY + t, 'L', centerX + t, centerY - t].join(' '),

            xAttrs = {
              path:           xPath,
              'stroke-width': this.get('xStrokeWidth'),
              stroke:         this.get('xStroke')
            },

            raphaelObj,
            raphaelCircle,
            raphaelX;

        this.set('centerX', centerX);
        this.set('centerY', centerY);
        
        if (firstTime) {
          context.callback(this, this.renderCallback, circleAttrs, xAttrs);
        }
        else {
          raphaelObj    = this.get('raphaelObject');
          raphaelCircle = raphaelObj.items[0];
          raphaelX      = raphaelObj.items[1];

          raphaelCircle.attr(circleAttrs);
          raphaelX.attr(xAttrs);
        }
      },

      touchStart: function () {
        this.set('isHighlighted', YES);
        return YES;
      },
      
      touchEnd: function (evt) {
        var offset = this.get('graphCanvasView').$().offset();
        
        this.set('isHighlighted', NO);
        
        if (   Math.abs(evt.pageX - this.get('centerX') - offset.left) < 50 
            && Math.abs(evt.pageY - this.get('centerY') - offset.top)  < 50)
        {
          this.get('labelView').remove();
        }
        return YES;
      },

      mouseDown: function () {
        this.get('labelView').remove();
      },

      mouseEntered: function () {
        this.set('isHighlighted', YES);
      },

      mouseExited: function () {
        this.set('isHighlighted', NO);
      }
    })
  }),

  remove: function () {
    this.removeLabelFromArray();
    if (this.get('isRemovalEnabled')) {
      this.get('controller').labelViewRemoveLabel(this.get('item'));
    }
  },

  removeLabelFromArray: function () {
    var graphView = this.get('graphView');
    var item = this.get('item');
    if (graphView) {
      var arrTemp = graphView.get('arrLabelsLayout');
      var newArray = [];
      for (var i = 0; i < arrTemp.length; i++) {
        if (arrTemp[i].item !== item) {
          newArray.push(arrTemp[i]);
        }
      }
      graphView.set('arrLabelsLayout', newArray);
    }
  }

});
