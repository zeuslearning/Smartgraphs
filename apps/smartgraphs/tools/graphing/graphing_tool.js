/*globals Smartgraphs */

sc_require('tools/tool');

/** @class

  @extends Smartgraphs.Tool
*/
Smartgraphs.graphingTool = Smartgraphs.Tool.create(
/** @scope Smartgraphs.graphingTool.prototype */ {

  name: 'graphing',
  state: 'GRAPHING_TOOL',
  lineCount: 0,
  pointSelectedInArray: null, // used this tool-variable for checking that which point from the data point is moved 
  annotationName: null,
  datadefName: null,
  requestedCursorStyle: 'default',
  showTooltip: true, 

  setup: function (args) {
    var graphController = this.graphControllerForPane(args.pane);
    var otherPane = this.otherPaneFor(args.pane);
    var tableController = this.tableControllerForPane(otherPane);
    tableController.setRoundingFunc('Fixed');
    graphController.graphingToolStartTool({ annotationName: args.annotationName, shape: args.shape, datadefName: args.data});
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
    var graphController = this.graphControllerForState(state);
    if (graphController && graphController.graphingToolGraphingStarting) {
      graphController.graphingToolGraphingStarting();
    }
  },

  graphingFinished: function (state) {
    var graphController = this.graphControllerForState(state);
    if (graphController && graphController.graphingToolGraphingFinished) {
      this.set('showTooltip', false);
      graphController.graphingToolGraphingFinished();
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
    var pointLogicalBoundsArr = this.getLineEndPointsArray(point1, point2, state);
    var annotation = this.getAnnotation(this.get('annotationName'));
    annotation.addPoint(pointLogicalBoundsArr[0][0], pointLogicalBoundsArr[0][1]);
    annotation.addPoint(pointLogicalBoundsArr[1][0], pointLogicalBoundsArr[1][1]);
    this.set('lineCount', this.get('lineCount') + 1);
  },

  getLinePointWithinLogicalBounds: function (point, m, c, screenBounds) {
    var x, y;
    x = point[0];
    y = point[1];
    if (x < screenBounds.xMin) {
      x = screenBounds.xMin;
      y = m * x + c;
    } else if (x > screenBounds.xMax) {
      x = screenBounds.xMax;
      y = m * x + c;
    }
    if (y < screenBounds.yMin) {
      y = screenBounds.yMin;
      x = (y - c) / m;
    } else if (y > screenBounds.yMax) {
      y = screenBounds.yMax;
      x = (y - c) / m;
    }
    return [x, y];
  },

  getLineEndPointsArray: function (point1, point2, state) {
    var screenBounds, m, c, x1, y1, x2, y2;
    screenBounds = this.getLogicalBoundsFromState(state);
    if (point2[0] === point1[0]) {
      x1 = point1[0];
      y1 = screenBounds.yMin;
      x2 = x1;
      y2 = screenBounds.yMax;
      
      return [[x1, y1], [x2, y2]];
    }
    
    m = (point2[1] - point1[1]) / (point2[0] - point1[0]);
    c = point2[1] - m * point2[0];
    
    if (m === 0) {
      x1 = screenBounds.xMin;
      y1 = point1[1];
      x2 = screenBounds.xMax;
      y2 = y1;
      
      return [[x1, y1], [x2, y2]];
    }
    
    var pointArr;
    
    x1 = screenBounds.xMin;
    y1 = m * x1 + c;
    pointArr = this.getLinePointWithinLogicalBounds([x1, y1], m, c, screenBounds);
    x1 = pointArr[0];
    y1 = pointArr[1];
    
    y2 = m > 0 ? screenBounds.yMax : screenBounds.yMin;
    x2 = (y2 - c) / m;
    pointArr = this.getLinePointWithinLogicalBounds([x2, y2], m, c, screenBounds);
    x2 = pointArr[0];
    y2 = pointArr[1];
    
    return [[x1, y1], [x2, y2]];
  },

  checkInputAreaScreenBounds: function (x, y, state) {
    var graphView = this.graphViewForPane(this.paneForState(state));
    return graphView.graphCanvasView._checkInputAreaScreenBounds(x, y);
  },
  
  pointForCoordinates: function (x, y, state) {
    var graphView = this.graphViewForPane(this.paneForState(state));
    var coords = graphView.graphCanvasView.axesView.inputAreaView.coordsForEvent({ pageX: x, pageY: y });
    var logicalPoint = graphView.pointForCoordinates(coords.x, coords.y);
    return graphView.graphCanvasView._checkInputAreaScreenBounds(x, y);
  }
});
