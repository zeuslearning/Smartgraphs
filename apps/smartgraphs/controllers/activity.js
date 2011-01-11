// ==========================================================================
// Project:   Smartgraphs.activityController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
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
  
  activityRecordInCurrentStore: function () {
    var id = this.get('id');
    return id ? Smartgraphs.store.find(Smartgraphs.Activity, id) : null;
  }.property(),
  
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
  }.observes('isReady')
    
}) ;
