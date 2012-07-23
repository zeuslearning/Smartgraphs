(function() {

  defineJasmineHelpers();

  $(function() {
    return $("body").css("overflow", "auto");
  });

  describe("Smartgraphs.graphingTool with 'singleLine' shape option", function() {
    var controller, store, toolState;
    store = controller = toolState = null;
    beforeEach(function() {
      var statechart,
        _this = this;
      store = SC.Store.create().from(SC.FixturesDataSource.create());
      controller = Smartgraphs.GraphController.create();
      controller.clear();
      statechart = controller.get("statechart");
      toolState = statechart.getState("GRAPHING_TOOL");
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
    describe("GRAPHING_TOOL state", function() {
      return it("should exist", function() {
        return expect(toolState).toBeDefined();
      });
    });
    return describe("when the graphing tool is started with shape: 'SINGLE_LINE'", function() {
      var rep, sketch, startState;
      rep = sketch = startState = null;
      beforeEach(function() {
        rep = store.createRecord(Smartgraphs.UnorderedDataPoints, {
          url: "rep",
          points: []
        });
        sketch = store.createRecord(Smartgraphs.FreehandSketch, {
          url: "sketch",
          points: []
        });
        spyOn(Smartgraphs.graphingTool, "getAnnotation").andReturn(sketch);
        spyOn(Smartgraphs.graphingTool, "getDatadef").andReturn(rep);
        spyOn(Smartgraphs.graphingTool, "showGraphTitle");
        spyOn(Smartgraphs.graphingTool, "hideGraphTitle");
        controller.showCrossHairs = true;
        controller.graphingToolStartTool({
          annotationName: "freehand-sketch-1",
          shape: "singleLine",
          datadefName: "datadef-1"
        });
        return startState = toolState.getPath("ON.SINGLE_LINE.START");
      });
      describe("the graph controller's statechart", function() {
        return it("should be in the relevant start state", function() {
          return expect(startState.get("isCurrentState")).toBe(true);
        });
      });
      describe("the sketch", function() {
        it("should have been cleared (have no points)", function() {
          return expect(sketch.get("points")).toBeEmpty();
        });
        return it("should be in the graph controller's list of annotations", function() {
          return expect(controller.get("annotationList")).toContain(sketch);
        });
      });
      describe("the dataRepresentation", function() {
        it("should have been cleared (have no points)", function() {
          return expect(rep.get("points")).toBeEmpty();
        });
        return it("should be in the graph controller's list of dataRepresentations", function() {
          return expect(controller.get("datadefList")).toContain(rep);
        });
      });
      describe("the cursor style requested by the controller", function() {
        return it("should be 'crosshair'", function() {
          return expect(controller.get("requestedCursorStyle")).toEqual("crosshair");
        });
      });
      describe("when the controller's inputAreaMouseDown method is called with (0,1)", function() {
        beforeEach(function() {
          return controller.inputAreaMouseDown(0, 1);
        });
        describe("the representation", function() {
          return it("should have points [[0, 1]]", function() {
            return expect(rep.get("points")).toEqualPairs([[0, 1]]);
          });
        });
        return describe("the cursor style requested by the controller", function() {
          return it("should be 'crosshair'", function() {
            return expect(controller.get("requestedCursorStyle")).toEqual("crosshair");
          });
        });
      });
      describe("when the controller's inputAreaMouseDown method is called twice with (0, 1) and (2, 3)", function() {
        beforeEach(function() {
          spyOn(Smartgraphs.graphingTool, "getLogicalBoundsFromState").andReturn({
            xMin: 0,
            yMin: 0,
            xMax: 10,
            yMax: 10
          });
          controller.inputAreaMouseDown(0, 1);
          return controller.inputAreaMouseDown(2, 3);
        });
        describe("the sketch", function() {
          return it("line should be drawn with points [[0,1], [9,10]]", function() {
            return expect(sketch.get("points")).toEqualPairs([[0, 1], [9, 10]]);
          });
        });
        describe("the representation", function() {
          return it("should have points [[0,1], [2, 3]]", function() {
            return expect(rep.get("points")).toEqualPairs([[0, 1], [2, 3]]);
          });
        });
        return describe("the cursor style requested by the controller", function() {
          return it("should be back to 'default'", function() {
            return expect(controller.get("requestedCursorStyle")).toEqual("default");
          });
        });
      });
      return describe("when the controller's dataPointDragged method is called with (1, 2)", function() {
        beforeEach(function() {
          spyOn(Smartgraphs.graphingTool, "getLogicalBoundsFromState").andReturn({
            xMin: 0,
            yMin: 0,
            xMax: 10,
            yMax: 10
          });
          spyOn(Smartgraphs.graphingTool, "checkInputAreaScreenBounds").andReturn(true);
          spyOn(Smartgraphs.graphingTool, "pointForCoordinates").andReturn({
            x: 9,
            y: 9
          });
          controller.inputAreaMouseDown(0, 1);
          controller.inputAreaMouseDown(2, 3);
          controller.dataPointSelected(rep, 0, 1);
          controller.dataPointDragged(rep, 1, 2);
          return controller.dataScreenPointUp(rep, 1, 2);
        });
        describe("the sketch", function() {
          return it("line should be drawn with points [[0, 1], [9, 10]]", function() {
            return expect(sketch.get("points")).toEqualPairs([[0, 1], [9, 10]]);
          });
        });
        describe("the representation", function() {
          return it("should have points [[1, 2], [2, 3]]", function() {
            return expect(rep.get("points")).toEqualPairs([[1, 2], [2, 3]]);
          });
        });
        return describe("the cursor style requested by the controller", function() {
          return it("should be back to 'default'", function() {
            return expect(controller.get("requestedCursorStyle")).toEqual("default");
          });
        });
      });
    });
  });

}).call(this);
