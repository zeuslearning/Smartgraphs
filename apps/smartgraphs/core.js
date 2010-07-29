// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @namespace

  Smaht Graphs. Wicked Smaht Graphs!
  
  @extends SC.Object
*/
Smartgraphs = SC.Application.create(
  /** @scope Smartgraphs.prototype */ {

  NAMESPACE: 'Smartgraphs',
  VERSION: '0.1.0',

  store: SC.Store.create().from(SC.Record.fixtures),
  
  // Add global constants or singleton objects here
  triggers: [],
  
  // DEBUG SETTING: traces firstResponder changes and app actions
  trace: YES
}) ;
