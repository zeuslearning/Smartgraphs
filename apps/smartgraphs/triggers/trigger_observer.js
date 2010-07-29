// ==========================================================================
// Project:   Smartgraphs.TriggerObserver
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

// Base TriggerObserver class. Subclasses can implement custom trigger behavior by implementing registerObservers.
// registerObservers should either just add eventWasObserved as an observer to the property they are interested in,
// or, if the custom trigger needs to examine the observed properties before firing, registerObservers should
// register some custom method or methods as observer(s), and call eventWasObserved if the trigger criteria are met.

Smartgraphs.TriggerObserver = SC.Object.extend({
  isRegistered: NO,
  commands: null,
  
  register: function (args, commands) {
    console.log('registering...'); 
    this.set('isRegistered', YES);
    this.set('commands', commands);
    if (this.registerObservers) this.registerObservers(args);
  },

  unregister: function () {
    console.log('UNregistering...');
    this.set('isRegistered', NO);
    this.set('commands', null);
    if (this.unregisterObservers) this.unregisterObservers();    
  },
  
  eventWasObserved: function () {
    if (this.get('isRegistered')) {
      console.log('EVENT WAS OBSERVED');
      Smartgraphs.guideStepController.executeCommands(this.get('commands'));
    }
  }
});