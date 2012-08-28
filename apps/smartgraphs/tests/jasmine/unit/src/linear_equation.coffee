defineJasmineHelpers()

describe "Smartgraphs.LinearEquation with slope-intercept expression form", ->
  linearEquation = Smartgraphs.LinearEquation.create()
  linearEquation.expressionForm = 'slope-intercept'
  linearEquation.graphLogicalBounds = { xMin: 0, yMin: 0, xMax: 2, yMax: 10 }

  beforeEach ->
    do =>
      matchArraysUsing = (matcher) ->
        (pairs) ->
          return false if @actual?.length isnt pairs.length or typeof @actual isnt 'object'
          return false for a, i in @actual when not matcher( a, pairs[i] )
          true

      @addMatchers(
        toEqualPairs: matchArraysUsing (a, [x, y]) -> a[0] is x and a[1] is y
      )

  describe "with slope of 2, yIntercept of 5 and xPrecision of 0.5", ->

    beforeEach ->
      linearEquation.datasetPoints = []
      linearEquation.stepInterval = 0.5
      linearEquation.params = { slope: 2, yIntercept: 5 }
      linearEquation.populateDatasetPoints()

    it "should generate proper dataset points", ->
      datasetPoints = linearEquation.datasetPoints
      expect(datasetPoints).toEqualPairs [[0, 5], [0.5, 6], [1, 7], [1.5, 8], [2, 9]]

  describe "with slope of 1 and yIntercept of 2 and xPrecision of 0.5", ->

    beforeEach ->
      linearEquation.datasetPoints = []
      linearEquation.stepInterval = 0.5
      linearEquation.params = { slope: 1, yIntercept: 2 }
      linearEquation.populateDatasetPoints()

    it "should generate proper dataset points", ->
      datasetPoints = linearEquation.datasetPoints
      expect(datasetPoints).toEqualPairs [[0, 2], [0.5, 2.5], [1, 3], [1.5, 3.5], [2, 4]]
