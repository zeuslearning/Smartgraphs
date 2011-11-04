defineJasmineHelpers()
$ -> $('body').css('overflow', 'auto')

describe "The Smartgraphs runtime, when loading content converted from the authored format", ->

  aSmartgraphPane = '.smartgraph-pane'

  beforeEach ->
    this.addMatchers
      toHaveTheText: (text) ->
        elements = $("#{this.actual}:contains('#{text}'):visible")
        elements.length > 0
      toBeEmpty2: ->
        this.actual.length == 0
      toHaveTheImageUrl: (url) ->
        for img in $("#{this.actual} img")
          return true if SC.View.views[img.id]?.get('value') == url
        false

  afterEach ->
    integrationTestHelper.teardownApp()

  describe "when the authored content specifies two pages", ->
    beforeEach ->
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

    it "should have the specified first page text initially", ->
      expect(aSmartgraphPane).toHaveTheText 'in this activity....'

    describe "after you click on the 'Next' button", ->
      beforeEach ->
        integrationTestHelper.clickButton 'Next'

      it "should have the specified second page text", ->
        expect(aSmartgraphPane).toHaveTheText 'look at the graph...'

      it "should have not have a visible 'Next' button", ->
        nextButton = $(".sc-button-view:contains('Next'):visible")
        expect(nextButton).toBeEmpty2()


  describe "when the authored content specifies a page with an image pane", ->
    beforeEach ->
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

    it "should have a pane with the specified image url", ->
      expect(aSmartgraphPane).toHaveTheImageUrl '/example.jpg'
