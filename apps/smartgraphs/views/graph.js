// ==========================================================================
// Project:   Smartgraphs.GraphView
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.GraphView = SC.View.extend(
/** @scope Smartgraphs.GraphView.prototype */ {
  
  axesBinding: '*graph.axes',
  seriesListBinding: '*graph.seriesList',
  
  padding: { top: 20, right: 20, bottom: 40, left: 60 },  
  
  childViews: 'graphCanvasView'.w(),
  
  init: function () {
    this._seriesViewsById = {};
    sc_super();
  },
  
  viewDidResize: function () {
    // TODO can reduce flickering by only replacing layer only if existing Raphael canvas is too small
    // (call renderChildViews on graphCanvasView)
    sc_super();
    this.replaceLayer();
    //this.get('graphCanvasView').renderChildViews(null, NO);  // works unless Raphael canvas needs to grow
  },
  
  // could move to a graphViewController if we had one.
  coordinatesForPoint: function (x, y) {
    var axes = this.get('axes');
    var xMin = axes.get('xMin'),
        xMax = axes.get('xMax'),
        yMin = axes.get('yMin'),
        yMax = axes.get('yMax');

    var frame = this.get('frame');
    var height = frame.height,
        width  = frame.width;
        
    var padding = this.get('padding');
    
    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;
    
    var xScale = plotWidth / xMax;
    var yScale = plotHeight / yMax;
    
    return { 
      x: padding.left + x * xScale,
      y: padding.top + plotHeight - (y * yScale)
    };
  },
  
  // inverse of coordinatesForPoint, obviously
  pointForCoordinates: function (x, y) {
    var axes = this.get('axes');
    var xMin = axes.get('xMin'),
        xMax = axes.get('xMax'),
        yMin = axes.get('yMin'),
        yMax = axes.get('yMax');

    var frame = this.get('frame');
    var height = frame.height,
        width  = frame.width;
        
    var padding = this.get('padding');
    
    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;
    
    var xScale = plotWidth / xMax;
    var yScale = plotHeight / yMax;
    
    return {
      x: (x - padding.left) / xScale,
      y: (padding.top + plotHeight - y) / yScale
    };
  },
  
  _seriesListDidChange: function () {
    var seriesList = this.get('seriesList');
    var series, id;
    var seriesListById = {};
    var seriesToAdd = [], viewsToRemove = [];
    
    // add views for new series
    for (var i = 0, ii = seriesList.get('length'); i < ii; i++) {
      series = seriesList.objectAt(i);
      id = series.get('id');
      
      seriesListById[id] = series;
      
      if (!this._seriesViewsById.hasOwnProperty(id)) {
        this._addViewForSeries(series);
      }
    }
    
    // remove views for no-longer-displayed series
    var oldView;

    for (id in this._seriesViewsById) {
      if (this._seriesViewsById.hasOwnProperty(id)) {
        oldView = this._seriesViewsById[id];
        
        if (!seriesListById[id]) {
          this._removeSeriesView(oldView);
        }
      }
    }
  }.observes('*seriesList.[]'),

  _addViewForSeries: function (series) {
    var pointsQuery = SC.Query.local(Smartgraphs.DataPoint, { 
      conditions: 'series = {series}',
      series: series,
      orderBy: 'id'
    });
    
    // TODO make this a view class
    var view = RaphaelViews.RaphaelCollectionView.design({
      exampleView: Smartgraphs.DataPointView,
      graphView: this,
      seriesId: series.get('id'),
      content: Smartgraphs.store.find(pointsQuery),
      // keep this set to YES prevents the collection view from redrawing all the points when re-rendering
      useFastPath: YES
    }).create();
    
    this.get('graphCanvasView').appendChild(view);
    this._seriesViewsById[series.get('id')] = view;
  },
  
  _removeSeriesView: function (view) {
    var seriesId = view.get('seriesId');
    delete this._seriesViewsById[seriesId];
    this.get('graphCanvasView').removeChild(view);
  },
  
  graphCanvasView: RaphaelViews.RaphaelCanvasView.design({
    graphBinding: '.parentView*graph',
    
    childViews: 'axesView'.w(),
    
    axesView: RaphaelViews.RaphaelView.design({
      axesBinding: '.parentView.parentView*axes',      
      paddingBinding: '.parentView.parentView*padding',

      displayProperties: 'axes.xMin axes.xMax axes.yMin axes.yMax axes.xSteps axes.ySteps'.w(),
      
      childViews: 'xLabelView yLabelView eventSurface'.w(),
      
      eventSurface: RaphaelViews.RaphaelView.design({
        axesBinding: '.parentView.parentView.parentView*axes',      
        shouldNotifyControllerBinding: '.parentView.parentView.parentView.shouldNotifyController',
        controllerBinding: '.parentView.parentView.parentView.controller',
        
        renderCallback: function (raphaelCanvas, xLeft, yTop, plotWidth, plotHeight) {          
          return raphaelCanvas.rect(xLeft, yTop, plotWidth, plotHeight).attr({
            fill: '#ffffff', stroke: '#ffffff', opacity: 0.7 
          });
        },
        
        render: function (context, firstTime) {
          var frame = this.getPath('parentView.parentView.frame');
          var padding = this.getPath('parentView.parentView.parentView.padding');

          var xLeft = frame.x + padding.left;
          var yTop = frame.y + padding.top;
          var plotWidth = frame.width - padding.left - padding.right;
          var plotHeight = frame.height - padding.top - padding.bottom;
          
          if (firstTime) {
            context.callback(this, this.renderCallback, xLeft, yTop, plotWidth, plotHeight);
          }
          else {       
            var rect = context.raphael();
            rect.attr({x: xLeft, y: yTop, width: plotWidth, height: plotHeight});
          }
        },
        
        pointForEvent: function (e) {
          var canvasOffset = $(this.get('raphaelCanvas').canvas).offset();
          var x = e.pageX - canvasOffset.left;
          var y = e.pageY - canvasOffset.top;
          var graphView = this.getPath('parentView.parentView.parentView');
          return graphView.pointForCoordinates(x, y);
        },

        mouseDown: function (evt) {
          if (this.get('shouldNotifyController')) {
            var point = this.pointForEvent(evt);
            return this.get('controller').inputAreaMouseDown(point.x, point.y);
          }
          return YES;
        },

        mouseDragged: function (evt) {
          if (this.get('shouldNotifyController')) {
            var point = this.pointForEvent(evt);
            return this.get('controller').inputAreaMouseDragged(point.x, point.y);
          }
          return YES;
        },

        mouseUp: function (evt) {
          if (this.get('shouldNotifyController')) {
            var point = this.pointForEvent(evt);
            return this.get('controller').inputAreaMouseUp(point.x, point.y);
          }
          return YES;
        }       
      }),
      
      xLabelView: RaphaelViews.RaphaelView.design({
      }),
      
      yLabelView: RaphaelViews.RaphaelView.design({
      }),


      renderCallback: function (raphaelCanvas, shouldDrawAxes, xLeft, yBottom, yTop, plotWidth, plotHeight, xMax, xMin, xSteps, yMax, yMin, ySteps) {
        if (shouldDrawAxes) {
          // A total hack. Just draw the axes to the screen as a side effect of creating our layer.
          
          // keep this until (a) we can get Raphael to draw the <text> elements when layer is offscreen
          // and (b) we find a way to find all the <path> and the <texts> that g.axis draws, and convince
          // RaphaelRenderSupport to group them into our layer (or (c) draw the tick marks and labels ourselves
          // -- it's not hard!)
          
          this.invokeLater(function () {
            this.drawAxes(raphaelCanvas, xLeft, yBottom, yTop, plotWidth, plotHeight, xMax, xMin, xSteps, yMax, yMin, ySteps);
          });
        }
      },

      drawAxes: function (raphaelCanvas, xLeft, yBottom, yTop, plotWidth, plotHeight, xMax, xMin, xSteps, yMax, yMin, ySteps) {
        // x axis
        if (this._x) this._x.remove();
        this._x = raphaelCanvas.g.axis(xLeft, yBottom, plotWidth, xMin, xMax, xSteps, 0);
        // y axis
        if (this._y) this._y.remove();          
        this._y = raphaelCanvas.g.axis(xLeft, yBottom, plotHeight, yMin, yMax, ySteps, 1);
      },
      
      render: function (context, firstTime) {
        var shouldDrawAxes = NO;
        var xLeft, xRight, yBottom, yTop, plotWidth, plotHeight, xMax, xMin, xSteps, yMax, yMin, ySteps;
        var axes = this.get('axes');

        if (axes) {
          shouldDrawAxes = YES;
          
          xMin = axes.get('xMin');
          xMax = axes.get('xMax');
          xSteps = axes.get('xSteps');
          yMin = axes.get('yMin');
          yMax = axes.get('yMax');       
          ySteps = axes.get('ySteps');
            
          var graphView = this.getPath('parentView.parentView');
          var bottomLeft = graphView.coordinatesForPoint(0, 0);
          var bottomRight = graphView.coordinatesForPoint(xMax, 0);
          var topLeft = graphView.coordinatesForPoint(0, yMax);
          
          xLeft = bottomLeft.x;
          xRight = bottomRight.x;
          yBottom = bottomLeft.y;
          yTop = topLeft.y;
              
          plotWidth = xRight - xLeft;
          plotHeight = yBottom - yTop;
        }

        if (firstTime) {
          context.callback(this, this.renderCallback, shouldDrawAxes, xLeft, yBottom, yTop, plotWidth, 
            plotHeight, xMax, xMin, xSteps, yMax, yMin, ySteps);
        }
        else if (shouldDrawAxes) {
          this.drawAxes(this.get('raphaelCanvas'), xLeft, yBottom, yTop, plotWidth, plotHeight, xMax, xMin, xSteps, yMax, yMin, ySteps);
        }
        
        this.renderChildViews(context, firstTime);      // don't forget to render child views        
      }
    })
  })
});
