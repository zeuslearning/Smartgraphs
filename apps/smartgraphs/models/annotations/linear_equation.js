/*globals Smartgraphs */

sc_require('models/annotations/equation');
sc_require('views/linear_equation');

/** @class

  A 'linear equation' annotation drawn on top of the graph.

  A sketch consists of an *ordered* list of x, y pairs.

  @extends Smartgraphs.Equation
*/

Smartgraphs.LinearEquation = Smartgraphs.Equation.extend(
/** @scope Smartgraphs.LinearEquation.prototype */ {

  initialise: function (args) {
    this.set('stepInterval', this.get('xInterval'));
    sc_super();
  },

  plotEquation: function () {
    var expressionForm = this.get('expressionForm');
    switch (expressionForm) {
    case 'slope-intercept':
      this.set('points', []); 
      this.computePoints();
      break;
    case 'general':
      break;
    }
  },

  getExpressionFunction: function () {
    var expressionForm = this.get('expressionForm');
    var params = this.get('params');
    switch (expressionForm) {
    case 'slope-intercept':
      return function (x) {
        return params.slope * x + params.yIntercept;
      };
    case 'general':
      return null;    // Not implemented yet
    default:
      return null;
    }
  },

  computeGraphEndPoint: function (m, b, point) {
    var graphBounds = this.get('graphLogicalBounds');
    point.y = m * point.x + b;
    if (m !== 0) {
      if (point.y < graphBounds.yMin) {
        point.y = graphBounds.yMin;
        point.x = (point.y - b) / m;
      }
      else if (point.y > graphBounds.yMax) {
        point.y = graphBounds.yMax;
        point.x = (point.y - b) / m;
      }
    }
  },

  computePoints: function () {
    var graphBounds = this.get('graphLogicalBounds');
    var points = this.get('points');
    var params = this.get('params');
    var m = params.slope;
    var b = params.yIntercept;
    var point = {x: graphBounds.xMin, y: null};
    this.computeGraphEndPoint(m, b, point);
    points.pushObject([point.x, point.y]);
    point = {x: graphBounds.xMax, y: null};
    this.computeGraphEndPoint(m, b, point);
    points.pushObject([point.x, point.y]);
  }
});

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.LinearEquation.viewClass = Smartgraphs.LinearEquationView;