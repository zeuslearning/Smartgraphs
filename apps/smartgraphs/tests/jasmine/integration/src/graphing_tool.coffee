__bind_ = (fn, me) ->
  ->
    fn.apply me, arguments
defineJasmineHelpers()
$ ->
  $("body").css "overflow", "auto"

describe "Smartgraphs.graphingTool with 'singleLine' shape option", ->
  controller = undefined
  sketch = undefined
  statechart = undefined
  store = undefined
  toolState = undefined
  store = controller = statechart = toolState = rep = sketch = null
  beforeEach ->
    store = SC.Store.create().from(SC.FixturesDataSource.create())
    controller = Smartgraphs.GraphController.create()
    controller.clear()
    statechart = controller.get("statechart")
    toolState = statechart.getState("GRAPHING_TOOL")
    __bind_(->
      matchArraysUsing = undefined
      matchArraysUsing = (matcher) ->
        (pairs) ->
          a = undefined
          i = undefined
          _len = undefined
          _ref = undefined
          _ref2 = undefined
          return false  if (if (_ref = @actual)? then _ref.length else undefined) isnt pairs.length or typeof @actual isnt "object"
          _ref2 = @actual
          i = 0
          _len = _ref2.length

          while i < _len
            a = _ref2[i]
            return false  unless matcher(a, pairs[i])
            i++
          true

      @addMatchers toEqualPairs: matchArraysUsing((a, _arg) ->
        x = undefined
        y = undefined
        x = _arg[0]
        y = _arg[1]

        a[0] is x and a[1] is y
      )
    , this)()

  describe "GRAPHING_TOOL state", ->
    it "should exist", ->
      expect(toolState).toBeDefined()

  describe "when the graphing tool is started with shape: 'SINGLE_LINE'", ->
    startState = undefined
    sketch = startState = null
    beforeEach ->
      rep = store.createRecord(Smartgraphs.UnorderedDataPoints,
        url: "rep"
        points: []
      )
      sketch = store.createRecord(Smartgraphs.FreehandSketch,
        url: "sketch"
        points: []
      )
      spyOn(Smartgraphs.graphingTool, "getAnnotation").andReturn sketch
      spyOn(Smartgraphs.graphingTool, "getDatadef").andReturn rep
      controller.showCrossHairs = true
      controller.graphingToolStartTool
        annotationName: "freehand-sketch-1"
        shape: "singleLine"
        datadefName: "datadef-1"

      startState = toolState.getPath("ON.SINGLE_LINE.START")

    describe "the graph controller's statechart", ->
      it "should be in the relevant start state", ->
        expect(startState.get("isCurrentState")).toBe true

    describe "the sketch", ->
      it "should have been cleared (have no points)", ->
        expect(sketch.get("points")).toBeEmpty()

      it "should be in the graph controller's list of annotations", ->
        expect(controller.get("annotationList")).toContain sketch

    describe "the dataRepresentation", ->
      it "should have been cleared (have no points)", ->
        expect(rep.get("points")).toBeEmpty()

      it "should be in the graph controller's list of dataRepresentations", ->
        expect(controller.get("datadefList")).toContain rep

    describe "the cursor style requested by the controller", ->
      it "should be 'crosshair'", ->
        expect(controller.get("requestedCursorStyle")).toEqual "crosshair"

    describe "when the controller's inputAreaMouseDown method is called with (0,1)", ->
      beforeEach ->
        controller.inputAreaMouseDown 0, 1

      describe "the representation", ->
        it "should have points [ [0,1] ]", ->
          expect(rep.get("points")).toEqualPairs [ [ 0, 1 ] ]

      describe "the cursor style requested by the controller", ->
        it "should be 'crosshair'", ->
          expect(controller.get("requestedCursorStyle")).toEqual "crosshair"

    describe "when the controller's inputAreaMouseDown method is called with (0,1)", ->
      beforeEach ->
        controller.inputAreaMouseDown 0, 1
        spyOn(Smartgraphs.graphingTool, "getLogicalBoundsFromState").andReturn
          xMin: 0
          yMin: 0
          xMax: 10
          yMax: 10

        controller.inputAreaMouseDown 2, 3

      describe "the sketch", ->
        it "line should be drawn with points [ [0,1], [9,10] ]", ->
          expect(sketch.get("points")).toEqualPairs [ [ 0, 1 ], [ 9, 10 ] ]

      describe "the representation", ->
        it "should have points [ [0,1], [2,3] ]", ->
          expect(rep.get("points")).toEqualPairs [ [ 0, 1 ], [ 2, 3 ] ]

      describe "the cursor style requested by the controller", ->
        it "should be back to 'default'", ->
          expect(controller.get("requestedCursorStyle")).toEqual "default"