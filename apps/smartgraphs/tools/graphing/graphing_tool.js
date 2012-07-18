/*globals Smartgraphs */

sc_require('tools/tool');

/** @class

  @extends Smartgraphs.Tool
*/
Smartgraphs.graphingTool = Smartgraphs.Tool.create(
/** @scope Smartgraphs.graphingTool.prototype */ {

  name: 'graphing',
  state: 'GRAPHING_TOOL',
  lineCount : 0,
  annotationName : null,
  datadefName : null,
  requestedCursorStyle : 'default',
  showTooltip : true, 

  setup: function (args) {
    var controller = this.graphControllerForPane(args.pane);
    var otherPane = this.otherPaneFor(args.pane);
    var tableController = this.tableControllerForPane(otherPane);
    tableController.setRoundingFunc('Fixed');
    controller.graphingToolStartTool({ annotationName: args.annotationName, shape: args.shape, datadefName: args.data});
    this.set('annotationName', args.annotationName);
    this.set('datadefName', args.data);
  },

  appendSketch: function (state, sketch) {
    this.graphControllerForState(state).addAnnotation(sketch);
  },
  
  appendRepresentation: function (state, rep) {
    this.graphControllerForState(state).addDatadef(rep);
  },

  hideGraphTitle: function (state) {
    var graphView = this.graphViewForPane(this.paneForState(state));
    graphView.get('titleView').set('isVisible', false);
  },
  
  showGraphTitle: function (state) {
    var graphView = this.graphViewForPane(this.paneForState(state));
    graphView.get('titleView').set('isVisible', true);
  },
  
  graphingStarting: function (state) {
    var controller = this.graphControllerForState(state);
    if (controller && controller.graphingToolGraphingStarting)
    { 
      controller.graphingToolGraphingStarting();
    }
  },

  graphingFinished: function (state) {
    var controller = this.graphControllerForState(state);
    if (controller && controller.graphingToolGraphingFinished)
    {
      this.set('showTooltip', false);
      controller.graphingToolGraphingFinished();
    }
  },
  
  graphViewForPane: function (pane) {
    return Smartgraphs.activityPage.getPath(Smartgraphs.activityViewController.firstOrSecondFor(pane) + 'GraphPane.graphView');
  },
  
  getLogicalBoundsFromState: function (state) {
    var graphView = this.graphViewForPane(this.paneForState(state));
    return graphView.graphCanvasView._getLogicalBounds();
  },
  
  plotPoint: function (x, y) {
    this.getDatadef(this.get('datadefName')).addPoint(x, y);
  },
  
  drawLineThroughPoints: function (point1, point2, state) {
    var m, c, ptPlotted1, ptPlotted2, screenBounds, pointLogical1, pointLogical2;
    
    if (point1[0] > point2[0]) {
      var point3 = point2;
      point2 = point1;
      point1 = point3;
    }

    screenBounds = this.getLogicalBoundsFromState(state);
    
    pointLogical1 = [];
    pointLogical2 = [];
    
    if ((point2[0] === point1[0])) {
      pointLogical1 = [point1[0], screenBounds.yMin];
      pointLogical2 = [point1[0], screenBounds.yMax];
    } else {
      m = (point2[1] - point1[1]) / (point2[0] - point1[0]);
      c = point2[1] - m * point2[0];
   
      if (m === 0) {
        pointLogical1 = [screenBounds.xMin, point1[1]];
        pointLogical2 = [screenBounds.xMax, point1[1]];
      } else {
        pointLogical1[0] = screenBounds.xMin;
        pointLogical1[1] = m * pointLogical1[0] + c;
        
        pointLogical1 = this.getLinePointWithinLogicalBounds(pointLogical1, m, c, screenBounds);
        
        pointLogical2[1] = m > 0 ? screenBounds.yMax : screenBounds.yMin;
        pointLogical2[0] = (pointLogical2[1] - c) / m;
        
        pointLogical2 = this.getLinePointWithinLogicalBounds(pointLogical2, m, c, screenBounds);
      }
    }
    
    this.getAnnotation(this.get('annotationName')).addPoint(pointLogical1[0], pointLogical1[1]);
    this.getAnnotation(this.get('annotationName')).addPoint(pointLogical2[0], pointLogical2[1]);
    
    this.set('lineCount', this.get('lineCount') + 1);
  },
  
  getLinePointWithinLogicalBounds: function (point, m, c, screenBounds) {
    var pointCalculated;
    
    pointCalculated = [point[0], point[1]];
    
    if (point[0] < screenBounds.xMin) {
      pointCalculated[0] = screenBounds.xMin;
      pointCalculated[1] = m * pointCalculated[0] + c;
    } else if (point[0] > screenBounds.xMax) {
      pointCalculated[0] = screenBounds.xMax;
      pointCalculated[1] = m * pointCalculated[0] + c;
    }
  
    if (point[1] < screenBounds.yMin) {
      pointCalculated[1] = screenBounds.yMin;
      pointCalculated[0] = (pointCalculated[1] - c) / m;
    } else if (point[1] > screenBounds.yMax) {
      pointCalculated[1] = screenBounds.yMax;
      pointCalculated[0] = (pointCalculated[1] - c) / m;
    }
    
    return pointCalculated;
  }
  
});
