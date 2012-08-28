(function() {

  defineJasmineHelpers();

  describe("Smartgraphs.LinearEquation with slope-intercept expression form", function() {
    var linearEquation;
    linearEquation = Smartgraphs.LinearEquation.create();
    linearEquation.expressionForm = 'slope-intercept';
    linearEquation.graphLogicalBounds = {
      xMin: 0,
      yMin: 0,
      xMax: 2,
      yMax: 10
    };
    beforeEach(function() {
      var _this = this;
      return (function() {
        var matchArraysUsing;
        matchArraysUsing = function(matcher) {
          return function(pairs) {
            var a, i, _i, _len, _ref, _ref1;
            if (((_ref = this.actual) != null ? _ref.length : void 0) !== pairs.length || typeof this.actual !== 'object') {
              return false;
            }
            _ref1 = this.actual;
            for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
              a = _ref1[i];
              if (!matcher(a, pairs[i])) {
                return false;
              }
            }
            return true;
          };
        };
        return _this.addMatchers({
          toEqualPairs: matchArraysUsing(function(a, _arg) {
            var x, y;
            x = _arg[0], y = _arg[1];
            return a[0] === x && a[1] === y;
          })
        });
      })();
    });
    describe("with slope of 2, yIntercept of 5 and xPrecision of 0.5", function() {
      beforeEach(function() {
        linearEquation.datasetPoints = [];
        linearEquation.stepInterval = 0.5;
        linearEquation.params = {
          slope: 2,
          yIntercept: 5
        };
        return linearEquation.populateDatasetPoints();
      });
      return it("should generate proper dataset points", function() {
        var datasetPoints;
        datasetPoints = linearEquation.datasetPoints;
        return expect(datasetPoints).toEqualPairs([[0, 5], [0.5, 6], [1, 7], [1.5, 8], [2, 9]]);
      });
    });
    return describe("with slope of 1 and yIntercept of 2 and xPrecision of 0.5", function() {
      beforeEach(function() {
        linearEquation.datasetPoints = [];
        linearEquation.stepInterval = 0.5;
        linearEquation.params = {
          slope: 1,
          yIntercept: 2
        };
        return linearEquation.populateDatasetPoints();
      });
      return it("should generate proper dataset points", function() {
        var datasetPoints;
        datasetPoints = linearEquation.datasetPoints;
        return expect(datasetPoints).toEqualPairs([[0, 2], [0.5, 2.5], [1, 3], [1.5, 3.5], [2, 4]]);
      });
    });
  });

}).call(this);
