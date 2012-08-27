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
  logicalScreenBounds: {
    xMin: SC.Record.attr(Number),
    xMax: SC.Record.attr(Number),
    yMin: SC.Record.attr(Number),
    yMax: SC.Record.attr(Number)
  },

  /**
    Ordered array of [x, y] pairs that make up the sketch.

    @property {Array[]}
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
    this.set('logicalScreenBounds', args.logicalScreenBounds);
    this.populateDatasetPoints();
  },

  clear: function () {
    this.set('points', []);
  },

  populateDatasetPoints: function () {
    var expression = this.getExpresstion();
    var bounds = this.get('logicalScreenBounds');
    var stepInterval = this.get('stepInterval');
    var x, y;
    this.set('datasetPoints', []);
    for (var i = bounds.xMin; i <= bounds.xMax; i += stepInterval) {
      x = i;
      eval(expression);
      if (y < bounds.yMax && y > bounds.yMin) {
        this.get('datasetPoints').pushObject([x, y]);
      }
    }
  }

});