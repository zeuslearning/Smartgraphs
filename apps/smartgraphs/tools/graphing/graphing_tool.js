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

  setup: function (args) {
    var controller = this.graphControllerForPane(args.pane);
    controller.graphingToolStartTool({ annotationName: args.annotationName, shape: args.shape, datadefName: args.data});
  },

  appendSketch: function (state, sketch) {
    this.graphControllerForState(state).addAnnotation(sketch);
  },

  graphingStarting: function (state) {
    var controller = this.graphControllerForState(state);
    if (controller.showCrossHairs === true) {
			if (controller && controller.graphingToolGraphingStarting)
			{ 
				controller.graphingToolGraphingStarting();
			}
    }
  },

  graphingFinished: function (state) {
		var controller = this.graphControllerForState(state);
		if (controller && controller.graphingToolGraphingFinished)
		{
			this.lineCount = 0;
			controller.graphingToolGraphingFinished();
		}
  }

});
