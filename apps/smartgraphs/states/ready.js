// ==========================================================================
// Project:   Smartgraphs.READY
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Superstate indicating that the Smartgraphs application is loaded and ready for user interaction.  

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.READY = SC.Responder.create(
/** @scope Smartgraphs.READY.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  openGuide: function (context, args) {
    // the default action, unless overridden in some later state, is just to set the current guide in the guide
    // controller and go into the GUIDE state

    Smartgraphs.makeFirstResponder(Smartgraphs.GUIDE);
    Smartgraphs.guideController.set('content', Smartgraphs.store.find(Smartgraphs.Guide, args.id));
    return YES;
  }
  
  // consider this: lEARNER_HOME might override the openAuthorGuide action, either to disallow it (because a learner
  // is not an author), or to require verification as an author, or to open a special author guide mode designed
  // for 'peer learning' type situations where learners write guides for other learners.
  
}) ;
