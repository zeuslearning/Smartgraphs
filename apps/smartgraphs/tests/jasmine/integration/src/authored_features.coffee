defineJasmineHelpers()

describe "authored features", ->
  beforeEach ->
    this.addMatchers({
      toHaveTheText: (text) ->
        elements = SC.CoreQuery(this.actual + ":contains('" + text + "'):visible")
        elements.length > 0
      toBeEmpty2: ->
        this.actual.length == 0
      toHaveTheImage: (url) ->
        allImages = SC.CoreQuery(this.actual + " img")
        correctImages = allImages.filter (i, img) ->
          if img.id
            scView = SC.View.views[img.id]
            scView.get('value') == url
        correctImages.length > 0
    })

  it "should have two pages with text", ->
    authoredContent =
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
    converter = require('./converter.js')
    window.authoredActivityJSON = converter.convert(authoredContent)

    # load in the smartgraphs main pane
    # helper = IntegrationTestHelper.create()
    # helper.setupApp()
    theSmartGraphPane = '.smartgraph-pane'

    expect(theSmartGraphPane).toHaveTheText('in this activity....')
    helper.clickButton('Next')
    expect(theSmartGraphPane).toHaveTheText('look at the graph...')
    nextButton = SC.CoreQuery(".sc-button-view:contains('Next'):visible")
    expect(nextButton).toBeEmpty2()

    # remove smartgraphs main pane
    helper.teardownApp()

  it "should have a page with an image", ->
    authoredContent =
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
    converter = require('./converter.js')
    window.authoredActivityJSON = converter.convert(authoredContent)
    # load in the smartgraphs main pane
    helper = IntegrationTestHelper.create()
    helper.setupApp()
    theSmartGraphPane = '.sc-view'

    expect(theSmartGraphPane).toHaveTheImage('/example.jpg')

    # remove smartgraphs main pane
    helper.teardownApp()