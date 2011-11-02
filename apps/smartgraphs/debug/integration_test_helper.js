/*globals IntegrationTestHelper SC Smartgraphs DiagramBuilder simulateClickOnSelector jasmine*/

IntegrationTestHelper = SC.Object.extend({
  setupApp: function (){
    // Run the full app main method which would normally happen on page load
    SC.RunLoop.begin();
    Smartgraphs.main();
    SC.RunLoop.end();
  },

  teardownApp: function() {
    // Remove the full app ui so we can see the test results
    SC.RunLoop.begin();
    Smartgraphs.getPath('mainPage.mainPane').remove();
    SC.RunLoop.end();
  },

  // This is a modified version of what is in jasmin-sproutcore
  // that version uses jasmine's asynchronous api but doing that appears unnecessary and 
  // would complicate the use of this function
  simulateClickOnSelector: function (selector) {
    var target = SC.CoreQuery(selector);
    if(target.length === 0) throw new Error('Could not find ' + selector + ' on the page');

    SC.Event.trigger(target, 'mouseover');
    SC.Event.trigger(target, 'mousedown');
    SC.Event.trigger(target, 'focus');
    SC.Event.trigger(target, 'mouseup');
  },

  clickButton: function (text) {
    this.simulateClickOnSelector(".sc-button-view:visible:contains('" + text + "')");
  }

});
  