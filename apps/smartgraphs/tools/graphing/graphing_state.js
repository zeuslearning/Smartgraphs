/*globals Smartgraphs */

/** @class

  In this graph controller state, the user can "draw" shapes on the graph by plotting the points.

  @extends SC.State
  @version 0.1
*/
Smartgraphs.GRAPHING_TOOL = SC.State.extend(
/** @scope Smartgraphs.GRAPHING_TOOL.prototype */ {
  
  initialSubstate: 'OFF',

  OFF: SC.State.design({
    toolRoot: SC.outlet('parentState'),

    graphingToolStartTool: function (context, args) {
      var toolRoot = this.get('toolRoot');
      toolRoot.set('annotationName', args.annotationName);
      toolRoot.set('datadefName', args.datadefName);
      
      if (args.shape === 'singleLine') {
        toolRoot.set('shape', args.shape);
      }
      this.gotoState(this.getPath('parentState.ON'));
    }
  }),

  ON: SC.State.design({

    toolRoot: SC.outlet('parentState'),
    owner:    SC.outlet('statechart.owner'),

    initialSubstate: 'CHOOSE_SHAPE',

    enterState: function () {
      var toolRoot = this.get('toolRoot'),
          annotationName = toolRoot.get('annotationName'),
          annotation = Smartgraphs.graphingTool.getAnnotation(annotationName),
          datadefName = toolRoot.get('datadefName'),
          datadef = Smartgraphs.graphingTool.getDatadef(datadefName);

      if (!annotation) {
        throw SC.Error.desc("Graphing tool was started with a bogus annotation name '%@'".fmt(annotationName));
      }
      if (!SC.kindOf(annotation, Smartgraphs.FreehandSketch)) {
        throw SC.Error.desc("Graphing tool was started with a non-FreehandSketch annotation name '%@'".fmt(annotationName));
      }
      if (!datadef) {
        throw SC.Error.desc("Graphing tool was started with a bogus datadef name '%@'".fmt(datadefName));
      }

      Smartgraphs.graphingTool.hideGraphTitle(this);
      Smartgraphs.graphingTool.graphingStarting(this);

      toolRoot.set('annotation', annotation);
      toolRoot.set('datadef', datadef);
      Smartgraphs.graphingTool.appendSketch(this, annotation);
      Smartgraphs.graphingTool.appendRepresentation(this, datadef);
    },

    exitState: function () {
      this.get('owner').hideControls();
      
      Smartgraphs.graphingTool.set('pointSelectedInArray', null);
      Smartgraphs.graphingTool.graphingFinished(this);
      Smartgraphs.graphingTool.set('lineCount', 0);
      
      var toolRoot = this.get('toolRoot');
      toolRoot.set('annotation', null);
      toolRoot.set('annotationName', null);
      toolRoot.set('datadef', null);
      toolRoot.set('datadefName', null);
    },

    stopTool: function () {
      this.gotoState(this.getPath('toolRoot.OFF'));
    },

    CHOOSE_SHAPE: SC.State.design({
      toolRoot: SC.outlet('parentState.toolRoot'),

      enterState: function () {
        var shape = this.getPath('toolRoot.shape');

        if (shape === 'singleLine') {
          this.gotoState(this.getPath('parentState.SINGLE_LINE'));
        }
        else
        {
          throw SC.Error.desc("Graphing tool was started with unknown 'shape' argument '%@'".fmt(shape));
        }
      }
    }),

    // "SINGLE_LINE" option -- draw a single line from mousedown to mousedown

    SINGLE_LINE: SC.State.design({

      toolRoot: SC.outlet('parentState.toolRoot'),
      // Adding this variable to avoid indirect fetching of datadefPoints and annotationPoints.
      // Also adding two more values required while dragging.
      pointDraggedInfo: {
        datadefPoints: null,
        annotationPoints: null,
        initialPointSelected: null
      },
      initialSubstate: 'START',

      START: SC.State.design({

        toolRoot: SC.outlet('parentState.toolRoot'),
        owner:    SC.outlet('statechart.owner'),

        enterState: function () {
          this.get('owner').disableAllControls();
        },

        mouseDownAtPoint: function (context, args) {
          var datadef = this.getPath('toolRoot.datadef');
          var datadefPoints = datadef.get("points");
          if (datadefPoints.length < 2) {
            Smartgraphs.graphingTool.plotPoint(args.x, args.y);
            if (datadefPoints.length === 2) {
              Smartgraphs.graphingTool.drawLineThroughPoints(datadefPoints[0], datadefPoints[1], this);
              Smartgraphs.graphingTool.graphingFinished(this);
            }
          }
        },

        dataPointSelected: function (context, args) {
          var pointSelected = args;
          var datadefPoints = this.getPath('toolRoot.datadef').get('points');
          var annotationPoints = this.getPath('toolRoot.annotation').get('points');
          for (var i = 0 ; i < datadefPoints.length; i++) {
            if ((pointSelected.x == datadefPoints[i][0]) && (pointSelected.y == datadefPoints[i][1])) {
              Smartgraphs.graphingTool.set('pointSelectedInArray', i);
              break;
            }
          }
          Smartgraphs.graphingTool.set('showTooltip', true);
          this.pointDraggedInfo = {
            datadefPoints: datadefPoints,
            annotationPoints: annotationPoints,
            initialPointSelected: pointSelected
          };
          return;
        },

        isPointInDatadef: function (xCur, yCur) {
          var info = this.pointDraggedInfo;
          var pointSelected = Smartgraphs.graphingTool.get('pointSelectedInArray');
          for (var i = 0 ; i < info.datadefPoints.length; i ++) {
            if (i === pointSelected) {
              continue;
            }
            var point = info.datadefPoints[i];
            if (point[0] == xCur && point[1] == yCur) {
              Smartgraphs.graphingTool.set('showTooltip', false);
              return true;
            }
            return false;
          }
        },

        dataPointDragged: function (context, args) {
          var graphingTool = Smartgraphs.graphingTool;
          if (this.isPointInDatadef(args.x, args.y)) {
            graphingTool.set('showTooltip', false);
          }
          else {
            graphingTool.set('showTooltip', true);
          }
          var info = this.pointDraggedInfo;
          var pointSelected = graphingTool.get('pointSelectedInArray');
          info.datadefPoints.replace(pointSelected, 1, [[args.x, args.y]]);
          if (info.datadefPoints.length >= 2) {
            var pointLogicalArray = graphingTool.getLineEndPointsArray(info.datadefPoints[0], info.datadefPoints[1], this);
            info.annotationPoints.replace(0, 2, pointLogicalArray);
          }
          return;
        },

        rollbackPointDragged: function () {
          var graphingTool = Smartgraphs.graphingTool;
          var info = this.pointDraggedInfo;
          var pointSelected = graphingTool.get('pointSelectedInArray');
          info.datadefPoints.replace(pointSelected, 1, [[info.initialPointSelected.x, info.initialPointSelected.y]]);
          if (info.datadefPoints.length >= 2) {
            var pointLogicalArray = graphingTool.getLineEndPointsArray(info.datadefPoints[0], info.datadefPoints[1], this);
            info.annotationPoints.replace(0, 2, pointLogicalArray);
          }
        },

        //This event occurs with screen bounds in args as an argument.
        dataScreenPointUp: function (context, args) {
          var graphView = Smartgraphs.graphingTool.graphViewForPane(Smartgraphs.graphingTool.paneForState(this));
          var coords = graphView.graphCanvasView.axesView.inputAreaView.coordsForEvent({ pageX: args.x, pageY: args.y });
          var logicalPoint = graphView.pointForCoordinates(coords.x, coords.y);
          var graphingTool = Smartgraphs.graphingTool;
          var bPointInGraph = graphingTool.checkInputAreaScreenBounds(args.x, args.y, this);
          var bPointInDatadef = this.isPointInDatadef(logicalPoint.x, logicalPoint.y);
          if (!bPointInGraph || bPointInDatadef) {
            this.rollbackPointDragged();
          }
          graphingTool.set('showTooltip', false);
          return;
        }
      })
    })
  })
});
