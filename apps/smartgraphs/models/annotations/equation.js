/*globals Smartgraphs */

sc_require('models/annotation');

/** @class

  An 'equation' annotation which is an abstract class.

  A sketch consists of an *ordered* list of x, y pairs.

  @extends Smartgraphs.Annotation
*/

Smartgraphs.Equation = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.LinearEquation.prototype */ {

  /**
    @property {String}
  */
  expressionForm: SC.Record.attr(String),

  /**
    @property {Object}
  */
  graphLogicalBounds: {
    xMin: SC.Record.attr(Number),
    xMax: SC.Record.attr(Number),
    yMin: SC.Record.attr(Number),
    yMax: SC.Record.attr(Number)
  },

  /**
    Ordered array of [x, y] pairs that make up the sketch.

    @property {Object}
  */
  points: SC.Record.attr(Array),

  /**
    Ordered array of [x, y] pairs used for point selection.

    @property {Array[]}
  */
  datasetPoints: SC.Record.attr(Array),

  /**
    Step Interval used to calculate dataset points.

    @property {Number}
  */
  stepInterval: SC.Record.attr(Number),

  /**
    Color with which the sketch should be drawn.

    @property {String}
  */
  color: SC.Record.attr(String),

  initialise: function (args) {
    this.set('graphLogicalBounds', args.graphLogicalBounds);
    this.populateDatasetPoints();
  },

  clear: function () {
    this.set('points', []);
  },

  getExpressionFunction: function () {
    //This is an abstract method.
  },

  populateDatasetPoints: function () {
    var fn = this.getExpressionFunction();
    if (fn) {
      var graphBounds = this.get('graphLogicalBounds');
      var stepInterval = this.get('stepInterval');
      this.set('datasetPoints', []);
      for (var x = graphBounds.xMin; x <= graphBounds.xMax; x += stepInterval) {
        var y = fn(x);
        if (y < graphBounds.yMax && y > graphBounds.yMin) {
          this.get('datasetPoints').pushObject([x, y]);
        }
      }
    }
  }

});