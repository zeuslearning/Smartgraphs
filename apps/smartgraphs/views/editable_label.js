// ==========================================================================
// Project:   Smartgraphs.EditableLabelView
// Copyright: ©2011 Concord Consortium
// Author:    Noah Paessel <knowuh@gmail.com>
// ==========================================================================
/*globals Smartgraphs, RaphaelViews */

/** @class

  RaphaelView for an editable label.


  @extends SC.View
  @extends RaphaelViews.RenderSupport
  @extends SC.Editable
*/
Smartgraphs.EditableLabelView = RaphaelViews.RaphaelView.extend(SC.Editable, {
/** @scope Smartgraphs.EditableLabelView.prototype */

  isEditing:           NO,
  $textarea:            $('<textarea>').css('position', 'absolute'),
  fontSize:            12,

  displayProperties:   'displayText textColor displayText x y raphTextY isEditing width height'.w(),

  labelBodyView:       SC.outlet('parentView'),
  labelView:           SC.outlet('labelBodyView.parentLabelView'),
  graphView:           SC.outlet('labelView.graphView'),
  graphCanvasView:     SC.outlet('graphView.graphCanvasView'),

  textBinding:         '.labelBodyView.text',
  textColorBinding:    '.labelBodyView.textColor',
  itemBinding:         '.labelBodyView.item',

  parentXBinding:      '.labelBodyView.bodyXCoord',
  parentYBinding:      '.labelBodyView.bodyYCoord',
  parentMarginBinding: '.labelBodyView.margin',

  // Bounds need to be calculated by Raphael:
  minHeight: 18,
  minWidth: 80,

  isEditingDidChange: function () {
    if ( ! this.get('isEditing')) debugger;
  }.observes('isEditing'),

  // our parent view is going to modify our position
  // but we will modify our parents width and height
  x: function () {
    // in IE 8 and 9, parentX is sometimes undefined
    var parentX = this.get('parentX') || 0;
    return  parentX + this.get('parentMargin') || 0;
  }.property('parentX', 'parentMargin').cacheable(),

  y: function () {
    // in IE 8 and 9, parentX is sometimes undefined
    var parentY = this.get('parentY') || 0;
    return parentY + this.get('parentMargin') || 0;
  }.property('parentY', 'parentMargin').cacheable(),

  raphTextY: function () {
    // in IE 8 and 9, height is sometimes undefined
    var h = this.get('height') || 0;
    return this.get('y') + (h / 2);
  }.property('y', 'height').cacheable(),

  displayText: function () {
    var txt = this.get('text');
    return txt;
  }.property('text', 'isEditing').cacheable(),

  renderCallback: function (raphaelCanvas, attrs, adjustTextarea) {
    var ret = raphaelCanvas.text().attr(attrs);
    adjustTextarea();
    return ret;
  },

  render: function (context, firstTime) {
    var x               = this.get('x'),
        y               = this.get('y'),
        raphTextY       = this.get('raphTextY'),
        width           = this.get('width'),
        height          = this.get('height'),

        attrs = {
          x:             x,
          y:             raphTextY,
          fill:          this.get('textColor'),
          text:          this.get('displayText'),
          'font-size':   this.get('fontSize'),
          'text-anchor': 'start'
        },

        isEditing       = this.get('isEditing'),

        graphCanvasView = this.get('graphCanvasView'),
        $textarea       = this.$textarea,

        adjustTextarea = function () {
          var offset;
          if (isEditing) {
            offset = graphCanvasView.$().offset();
            $textarea.
              css('left', offset.left + x).
              css('top',  offset.top + y).
              height(height).
              width(width).
              appendTo('body');
          }
          else {
            $textarea.detach();
          }
        },

        raphaelText;

    if (firstTime) {
      context.callback(this, this.renderCallback, attrs, adjustTextarea);
    }
    else {
      raphaelText = this.get('raphaelObject');
      raphaelText.attr(attrs);
      adjustTextarea();
    }
  },

  didRemoveFromGraphView: function () {
    this.$textarea.detach();
  },

  adjustMetrics: function () {
    var editing = this.get('isEditing'),
        raphaelText = this.get('raphaelObject'),
        bounds,
        minWidth = this.get('minWidth'),
        minHeight = this.get('minHeight'),
        width,
        height;

    if (raphaelText) {
      raphaelText.attr('text',this.get('displayText'));
      bounds = raphaelText.getBBox();
      width  = bounds.width  < minWidth  ? minWidth  : bounds.width;
      height = bounds.height < minHeight ? minHeight : bounds.height;

      this.beginPropertyChanges();
      this.set('width'  , width);
      this.set('height' , height);
      this.endPropertyChanges();
    }
  }.observes('displayText'),

  beginEditing: function () {
    if (this.get('isEditable')) {
      this.set('isEditing', YES);
      return YES;
    }
    return NO;
  },

  discardEditing: function () {
    return this.commitEditing();
  },

  commitEditing: function () {
    this.set('isEditing', NO) ;
    return YES ;
  },

  updateText: function (newtext) {
    this.beginPropertyChanges();
    this.set('text', newtext);
    this.endPropertyChanges();
  }

});
