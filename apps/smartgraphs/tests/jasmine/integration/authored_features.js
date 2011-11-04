(function() {
  defineJasmineHelpers();
  describe("authored features", function() {
    beforeEach(function() {
      return this.addMatchers({
        toHaveTheText: function(text) {
          var elements;
          elements = $(this.actual + ":contains('" + text + "'):visible");
          return elements.length > 0;
        },
        toBeEmpty2: function() {
          return this.actual.length === 0;
        },
        toHaveTheImage: function(url) {
          var allImages, correctImages;
          allImages = $(this.actual + " img");
          correctImages = allImages.filter(function(i, img) {
            var scView;
            if (img.id) {
              scView = SC.View.views[img.id];
              return scView.get('value') === url;
            }
          });
          return correctImages.length > 0;
        }
      });
    });
    afterEach(function() {
      return integrationTestHelper.teardownApp();
    });
    it("should have two pages with text", function() {
      var nextButton, theSmartGraphPane;
      integrationTestHelper.startAppWithContent({
        "type": "Activity",
        "name": "Maria’s Run",
        "pages": [
          {
            "type": "Page",
            "name": "Introduction",
            "text": "in this activity...."
          }, {
            "type": "Page",
            "name": "Where did she stop",
            "text": "look at the graph..."
          }
        ]
      });
      theSmartGraphPane = '.smartgraph-pane';
      expect(theSmartGraphPane).toHaveTheText('in this activity....');
      integrationTestHelper.clickButton('Next');
      expect(theSmartGraphPane).toHaveTheText('look at the graph...');
      nextButton = $(".sc-button-view:contains('Next'):visible");
      return expect(nextButton).toBeEmpty2();
    });
    return it("should have a page with an image", function() {
      var theSmartGraphPane;
      integrationTestHelper.startAppWithContent({
        "type": "Activity",
        "name": "Maria’s Run",
        "pages": [
          {
            "type": "Page",
            "name": "Introduction",
            "text": "in this activity....",
            "panes": [
              {
                "type": "ImagePane",
                "name": "Shoes",
                "url": "/example.jpg",
                "license": "Creative Commons BY-NC-ND 2.0",
                "attribution": "image courtesy flickr user altopower"
              }
            ]
          }
        ]
      });
      theSmartGraphPane = '.sc-view';
      return expect(theSmartGraphPane).toHaveTheImage('/example.jpg');
    });
  });
}).call(this);
