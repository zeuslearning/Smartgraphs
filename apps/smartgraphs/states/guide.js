// ==========================================================================
// Project:   Smartgraphs.GUIDE
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Superstate representing that the application is running a Guide.
  
  Substates are GUIDE_START, GUIDE_STEP_START, GUIDE_STEP_WAITING, GUIDE_STEP_SUBMIT, GUIDE_PAGE_FINISHED, 
  GUIDE_FINISHED, (and SENSOR and PREDICTING?)

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.GUIDE = SC.Responder.create(
/** @scope Smartgraphs.GUIDE_START.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  
  // TODO make this something like 'Smartgraphs.LOADED'
  nextResponder: Smartgraphs.START,       // the default; if some other app state implements openGuide() in its own
                                          // special way, presumably that state should set itself as our nextResponder
  
  didBecomeFirstResponder: function() {
    // Called when that application's firstResponder is set to this (Smartgraphs.GUIDE).
    // Opens the guide view and immediately switches to the appropriate substate
    console.log('GUIDE.didBecomeFirstResponder');
    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE_START);
  },
  
  willLoseFirstResponder: function() {
    console.log('GUIDE.willLoseFirstResponder');
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  openGuidePage: function (context, args) {
    Smartgraphs.guidePagesController.selectPageAtIndex(args.index);
  },
  
  showSinglePane: function () {
    return Smartgraphs.guideViewController.showSinglePane();
  },
  
  showImage: function (context, args) {
    return Smartgraphs.guideViewController.showImage(args.pane, args.path);
  }
  
}) ;
