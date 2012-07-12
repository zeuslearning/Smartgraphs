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

      Smartgraphs.graphingTool.graphingStarting(this);

      toolRoot.set('annotation', annotation);
      toolRoot.set('datadef', datadef);
    },

    exitState: function () {
      var toolRoot = this.get('toolRoot');

      this.get('owner').hideControls();
      Smartgraphs.graphingTool.graphingFinished(this);
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

      initialSubstate: 'START',

      START: SC.State.design({

        toolRoot: SC.outlet('parentState.toolRoot'),
        owner:    SC.outlet('statechart.owner'),

        enterState: function () {
          this.get('owner').disableAllControls();
        },

        mouseDownAtPoint: function (context, args) {
					var datadef = this.getPath('toolRoot.datadef');   
					if (datadef.get("points").length < 2)
					{
						datadef.addPoint(args.x, args.y);
						Smartgraphs.taggingTool.setPoint(args.x, args.y);
						if (datadef.get("points").length == 2)
						{
							this.getPath('toolRoot.ON').drawLineThroughPoints(datadef.get("points")[0], [args.x, args.y]);
							Smartgraphs.graphingTool.set('lineCount', 1);
						}
					}
        },
        
        mouseMoveToPoint: function (context, args) {
					var i = 0;
        },
        
        mouseDraggedToPoint: function (context, args) {
					var points = this.getPath('toolRoot.annotation').get('points');
					for (var i = 0; i < points.length; i++)
					{
						if (Math.round(args.x) == Math.round(points[i][0]) && Math.round(args.y) == Math.round(points[i][1], 2))
						{
							break;
						}
					}          
        },

        mouseUpAtPoint: function (context, args) {
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
    }),
    
    drawLineThroughPoints: function (point1, point2) {
      var m, c, ptPlotted1, ptPlotted2, screenBounds, pointLogical1, pointLogical2;
      
      if (point1[0] > point2[0]) {
				var point3 = point2;
				point2 = point1;
				point1 = point3;
      }
      
      screenBounds = Smartgraphs.graphingTool.graphViewFromState(this).graphCanvasView._getLogicalBounds();
      
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
					
					pointLogical1 = this.getLinePointWithinLogicalBounds(pointLogical1, m, c);
					
					pointLogical2[1] = m > 0 ? screenBounds.yMax : screenBounds.yMin;
					pointLogical2[0] = (pointLogical2[1] - c) / m;
										
					pointLogical2 = this.getLinePointWithinLogicalBounds(pointLogical2, m, c);
				}
      }
			
			this.getPath('toolRoot.annotation').addPoint(pointLogical1[0], pointLogical1[1]);
			this.getPath('toolRoot.annotation').addPoint(pointLogical2[0], pointLogical2[1]);
    },
    
    getLinePointWithinLogicalBounds: function (point, m, c) {
			var pointCalculated, screenBounds;
			
			pointCalculated = [point[0], point[1]];
			screenBounds = Smartgraphs.graphingTool.graphViewFromState(this).graphCanvasView._getLogicalBounds();
			
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
  })
});
