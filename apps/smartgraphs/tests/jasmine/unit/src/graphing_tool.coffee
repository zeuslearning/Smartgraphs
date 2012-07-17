defineJasmineHelpers()
describe "smartgraphs.graphingTool", ->
  graphingTool = undefined
  beforeEach ->
    graphingTool = Smartgraphs.graphingTool

  it "should be defined", ->
    expect(graphingTool).toBeDefined()

  it "should be registered under the name 'graphing'", ->
    expect(Smartgraphs.Tool.tools["graphing"].context).toBe graphingTool

  describe "setup method", ->
    controller = undefined
    beforeEach ->
      controller = Smartgraphs.GraphController.create()
      spyOn(graphingTool, "graphControllerForPane").andReturn controller
      spyOn controller, "graphingToolStartTool"
      graphingTool.setup
        annotationName: "freehand-sketch-1"
        shape: "SingleLine"
        data: "datadef-1"
        pane: "top"

    it "should translate the 'pane' parameter to a controller ", ->
      expect(graphingTool.graphControllerForPane).toHaveBeenCalledWith "top"

    it "should ask the relevant graph controller to start the graphing tool", ->
      expect(controller.graphingToolStartTool).toHaveBeenCalledWith
        annotationName: "freehand-sketch-1"
        shape: "SingleLine"
        datadefName: "datadef-1"

  describe "appendSketch method", ->
    state = undefined
    sketch = undefined
    controller = undefined
    beforeEach ->
      state = SC.Object.create()
      controller = SC.Object.create(addAnnotation: ->
      )
      state = SC.Object.create(statechart: SC.Object.create(owner: controller))
      spyOn controller, "addAnnotation"
      graphingTool.appendSketch state, sketch

    it "should call the addAnnotation method of the state's owning controller", ->
      expect(controller.get("addAnnotation")).toHaveBeenCalledWith sketch

  describe "graphViewForPane", ->
    it "should return proper graphview for the graphing tool", ->
      expect(graphingTool.graphViewForPane("top")).toEqual Smartgraphs.activityPage.getPath("FirstGraphPane.graphView")

  describe "getLinePointWithinLogicalBounds ", ->
    screenBounds =
      xMin: 0
      xMax: 10
      yMin: 0
      yMax: 10

    m = 0.5
    c = 3
    it "should get line points within logical bounds", ->
      expect(graphingTool.getLinePointWithinLogicalBounds([ 2, -1 ], m, c, screenBounds)).toEqual [ -6, 0 ]
      expect(graphingTool.getLinePointWithinLogicalBounds([ 15, 12 ], m, c, screenBounds)).toEqual [ 14, 10 ]
      expect(graphingTool.getLinePointWithinLogicalBounds([ 6, 3 ], m, c, screenBounds)).toEqual [ 6, 3 ]