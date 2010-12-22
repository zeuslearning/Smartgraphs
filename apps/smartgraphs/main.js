// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.main = function main() {
  
  Smartgraphs.dataSource = Smartgraphs.CouchDataSource.create();
  Smartgraphs.store = SC.Store.create().from(Smartgraphs.dataSource);
  
  // make the mainPane visible on screen.
  Smartgraphs.getPath('mainPage.mainPane').append() ;

  // We're letting SC.route handle navigating to a particular Activity. It needs a runloop to sync up, so 
  // just reach in and set default window.location.hash for now.
  if (!window.location.hash) {
    window.location.hash = '/shared/marias-run';      // default activity for now
  }
  
  // prevent unintended reload or back button; use 'onbeforeunload' syntax rather than $.bind just to be sure
  // there's only one handler (and $.bind doesn't really try to normalize this handler anyway)
  window.onbeforeunload = function () {
    return "You will lose your place in the activity if you leave this page.";
  };
  
  // create the list of annotation types
  for (var prop in Smartgraphs) { 
    if (Smartgraphs.hasOwnProperty(prop) && Smartgraphs[prop] && Smartgraphs[prop].isClass && prop !== 'Annotation' && SC.kindOf(Smartgraphs[prop], Smartgraphs.Annotation)) {
      Smartgraphs.Annotation.types.push(Smartgraphs[prop]);
    }
  }
  
  // and kick things off
  Smartgraphs.statechart.initStatechart();
} ;

function main() { Smartgraphs.main(); }
