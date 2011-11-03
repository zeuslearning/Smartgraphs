(function() {
  defineJasmineHelpers();
  describe("authored features", function() {
    beforeEach(function() {
      return this.addMatchers({
        toHaveTheText: function(text) {
          var elements;
          elements = SC.CoreQuery(this.actual + ":contains('" + text + "'):visible");
          return elements.length > 0;
        },
        toBeEmpty2: function() {
          return this.actual.length === 0;
        },
        toHaveTheImage: function(url) {
          var allImages, correctImages;
          allImages = SC.CoreQuery(this.actual + " img");
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
    it("should have two pages with text", function() {
      var authoredContent, converter, nextButton, theSmartGraphPane;
      authoredContent = {
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
      };
      converter = require('./converter.js');
      window.authoredActivityJSON = converter.convert(authoredContent);
      theSmartGraphPane = '.smartgraph-pane';
      expect(theSmartGraphPane).toHaveTheText('in this activity....');
      helper.clickButton('Next');
      expect(theSmartGraphPane).toHaveTheText('look at the graph...');
      nextButton = SC.CoreQuery(".sc-button-view:contains('Next'):visible");
      expect(nextButton).toBeEmpty2();
      return helper.teardownApp();
    });
    return it("should have a page with an image", function() {
      var authoredContent, converter, helper, theSmartGraphPane;
      authoredContent = {
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
      };
      converter = require('./converter.js');
      window.authoredActivityJSON = converter.convert(authoredContent);
      helper = IntegrationTestHelper.create();
      helper.setupApp();
      theSmartGraphPane = '.sc-view';
      expect(theSmartGraphPane).toHaveTheImage('/example.jpg');
      return helper.teardownApp();
    });
  });
}).call(this);
