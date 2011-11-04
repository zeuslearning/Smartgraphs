defineJasmineHelpers()

describe "authored features", ->

  beforeEach ->
    this.addMatchers
      toHaveTheText: (text) ->
        elements = $(this.actual + ":contains('" + text + "'):visible")
        elements.length > 0
      toBeEmpty2: ->
        this.actual.length == 0
      toHaveTheImage: (url) ->
        allImages = $(this.actual + " img")
        correctImages = allImages.filter (i, img) ->
          if img.id
            scView = SC.View.views[img.id]
            scView.get('value') == url
        correctImages.length > 0

  afterEach ->
    integrationTestHelper.teardownApp()


  it "should have two pages with text", ->

    integrationTestHelper.startAppWithContent
      "type": "Activity",
      "name": "Maria’s Run",
      "pages": [
        {
          "type": "Page",
          "name": "Introduction",
          "text": "in this activity...."
        },
        {
          "type": "Page",
          "name": "Where did she stop",
          "text": "look at the graph..."
        }
      ]

    theSmartGraphPane = '.smartgraph-pane'
    expect(theSmartGraphPane).toHaveTheText 'in this activity....'

    integrationTestHelper.clickButton 'Next'
    expect(theSmartGraphPane).toHaveTheText 'look at the graph...'

    nextButton = $(".sc-button-view:contains('Next'):visible")
    expect(nextButton).toBeEmpty2()


  it "should have a page with an image", ->

    integrationTestHelper.startAppWithContent
      "type": "Activity"
      "name": "Maria’s Run"
      "pages": [
        {
          "type": "Page"
          "name": "Introduction"
          "text": "in this activity...."
          "panes": [
            {
              "type": "ImagePane"
              "name": "Shoes"
              "url": "/example.jpg"
              "license": "Creative Commons BY-NC-ND 2.0"
              "attribution": "image courtesy flickr user altopower"
            }
          ]
        }
      ]

    theSmartGraphPane = '.sc-view'
    expect(theSmartGraphPane).toHaveTheImage '/example.jpg'