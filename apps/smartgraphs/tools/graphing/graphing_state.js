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
      var toolRoot = this.get('toolRoot');
      this.get('owner').hideControls();
      Smartgraphs.graphingTool.showGraphTitle(this);
      Smartgraphs.graphingTool.graphingFinished(this);
      Smartgraphs.graphingTool.set('lineCount', 0);
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
        /*else if (shape === 'extendedLine') {
         //for future reference if required
        }*/
        else
        {
          throw SC.Error.desc("Graphing behavior was started with unknown Shape argument '%@'".fmt(shape));
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
        pointSelectedinArray: null,
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
          if (datadef.get("points").length < 2) {
            Smartgraphs.graphingTool.plotPoint(args.x, args.y);
            if (datadef.get("points").length === 2) {
              Smartgraphs.graphingTool.drawLineThroughPoints(datadef.get("points")[0], [args.x, args.y], this);
              Smartgraphs.graphingTool.graphingFinished(this);
            }
          }
        },
        
        mouseMoveAtPoint: function (context, args) {
          //Kept this event for future use for of graphing tool
        },
        
        mouseDraggedToPoint: function (context, args) {
          var points = this.getPath('toolRoot.annotation').get('points');
          for (var i = 0; i < points.length; i++) {
            if (Math.round(args.x) === Math.round(points[i][0]) && Math.round(args.y) == Math.round(points[i][1], 2))
            {
              break;
            }
          }
        },

        mouseUpAtPoint: function (context, args) {
          if (Smartgraphs.graphingTool.get("lineCount") === 2) {
            this.get('owner').set('requestedCursorStyle', 'default');
            //Smartgraphs.graphingTool.set('showRequestedCursorStyle', false);
          }
          return;
        },

        dataPointSelected: function (context, args) {
          var pointSelected = args, pointSelectedinArray = -1;
          var datadefPoints = this.getPath('toolRoot.datadef').get('points');
          var annotationPoints = this.getPath('toolRoot.annotation').get('points');
          for (var i = 0 ; i < datadefPoints.length; i++) {
            if ((pointSelected.x == datadefPoints[i][0]) && (pointSelected.y == datadefPoints[i][1])) {
              pointSelectedinArray = i;
              break;
            }
          }
          
          this.pointDraggedInfo = {
            datadefPoints: datadefPoints,
            annotationPoints: annotationPoints,
            pointSelectedinArray: pointSelectedinArray,
            initialPointSelected: pointSelected
          };
          return;
        },

        dataPointDragged: function (context, args) {
          var info = this.pointDraggedInfo;
          var graphingToolState = this;
          setTimeout(function () {
            info.datadefPoints.replace(info.pointSelectedinArray, 1, [[args.x, args.y]]);
            if (info.datadefPoints.length >= 2) {
              var pointLogicalArray = Smartgraphs.graphingTool.getAnnotationPointsArray(info.datadefPoints[0], info.datadefPoints[1], graphingToolState);
              info.annotationPoints.replace(0, 1, [pointLogicalArray[0]]);
              info.annotationPoints.replace(1, 1, [pointLogicalArray[1]]);
            }
          }, 1);
          return;
        },

        dataPointMouseUp: function (context, args) {
          var bCheckInGraph = Smartgraphs.graphingTool.checkInputAreaScreenBounds(args.x, args.y, this);
          var info = this.pointDraggedInfo;
          if (!bCheckInGraph) {
            info.datadefPoints.replace(info.pointSelectedinArray, 1, [[info.initialPointSelected.x, info.initialPointSelected.y]]);
            if (info.datadefPoints.length >= 2) {
              var pointLogicalArray = Smartgraphs.graphingTool.getAnnotationPointsArray(info.datadefPoints[0], info.datadefPoints[1], this);
              info.annotationPoints.replace(0, 1, [pointLogicalArray[0]]);
              info.annotationPoints.replace(1, 1, [pointLogicalArray[1]]);
            }
          }
          return;
        }
      }),

      CONTINUE: SC.State.design({

        toolRoot: SC.outlet('parentState.toolRoot'),
        owner: SC.outlet('statechart.owner'),

        enterState: function () {
          this.get('owner').highlightClearControl();
        },

        mouseDownAtPoint: function (context, args) {
          this.getPath('toolRoot.annotation').addPoint(args.x, args.y);
        },

        mouseDraggedToPoint: function (context, args) {
          this.getPath('toolRoot.annotation').updateLatestPoint(args.x, args.y);
        },

        mouseUpAtPoint: function (context, args) {
          this.getPath('toolRoot.annotation').updateLatestPoint(args.x, args.y);
        },

        clearControlWasClicked: function () {
          this.gotoState(this.getPath('parentState.START'));
        }
      })
    })
  })
});
