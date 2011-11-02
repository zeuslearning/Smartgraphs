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
        }
      });
    });
    return it("should have two pages with text", function() {
      var authoredContent, converter, helper, nextButton, theSmartGraphPane;
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
      helper = IntegrationTestHelper.create();
      helper.setupApp();
      theSmartGraphPane = '.smartgraph-pane';
      expect(theSmartGraphPane).toHaveTheText('in this activity....');
      helper.clickButton('Next');
      expect(theSmartGraphPane).toHaveTheText('look at the graph...');
      nextButton = SC.CoreQuery(".sc-button-view:contains('Next'):visible");
      expect(nextButton).toBeEmpty2();
      return helper.teardownApp();
    });
  });
}).call(this);
