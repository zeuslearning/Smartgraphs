// ==========================================================================
// Project:   Smartgraphs.activityController
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  The Activity controller represents the currently open Activity.

  @extends SC.Object
*/
Smartgraphs.activityController = SC.ObjectController.create(
/** @scope Smartgraphs.activityController.prototype */ {

  canGotoNextPage: NO,
  isSaving: NO,

  /**
    Whatever needs to be done to clean up state when leaving an activity
  */
  cleanup: function () {
    Smartgraphs.activityPageController.cleanup();
    Smartgraphs.activityStepController.cleanup();
  },

  /**
    YES if the activity record itself (which including its dependent child records) needs to be saved
  */
  isDirty: function () {
    return !!(this.get('status') & SC.Record.DIRTY);
  }.property('status'),

  /**
    YES if there was an error reading or writing the activity record
  */
  isError: function () {
    return !!(this.get('status') & SC.Record.ERROR);
  }.property('status'),

  isReady: function () {
    return !!(this.get('status') & SC.Record.READY);
  }.property('status'),

  save: function () {
    this.get('content').commitRecord();
    this.set('isSaving', YES);
  },

  _clearIsSaving: function () {
    if (this.get('isReady')) this.set('isSaving', NO);
  }.observes('isReady'),

  _sendErrorSavingActivity: function () {
    if (this.get('isSaving') && this.get('isError')) {
      Smartgraphs.statechart.sendAction('errorSavingActivity');
    }
  }.observes('isSaving', 'isError'),

  // For google analytics, track activity launching.
  _sendAnalytics: function() {
    var activityName = this.getPath('title');
    if (!!_gaq) {
      _gaq.push(["_trackEvent", "SmartGraphs Activities", "Launch", activityName]);
      console.log("sent analytics request for %s", activityName);
    }
    else {
      console.log("couldn't send analytics request for %s", activityName);
    }
  }.observes('title')
    
}) ;
