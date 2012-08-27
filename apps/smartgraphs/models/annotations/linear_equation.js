/*globals Smartgraphs */

sc_require('models/equation');
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

  getExpresstion: function () {
    var expressionForm = this.get('expressionForm');
    var expression = null;
    var params = this.get('params');
    switch (expressionForm) {
    case 'slope-intercept':
      expression = 'y = ' + params.slope + ' * x + ' + params.yIntercept;
      break;
    case 'general':
      break;
    }
    return expression;
  },

  computePoints: function () {
    var bounds = this.get('logicalScreenBounds');
    var points = this.get('points');
    var params = this.get('params');
    var m = params.slope;
    var b = params.yIntercept;
    var x = bounds.xMin;
    var y = m * x + b;
    if (y < bounds.yMin) {
      y = bounds.yMin;
      x = (y - b) / m;
    }
    points.pushObject([x, y]);
    x = bounds.xMax;
    y = m * x + b;
    if (y > bounds.yMax) {
      y = bounds.yMax;
      x = (y - b) / m;
    }
    points.pushObject([x, y]);
  }
});

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.LinearEquation.viewClass = Smartgraphs.LinearEquationView;