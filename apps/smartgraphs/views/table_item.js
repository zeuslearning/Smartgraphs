// ==========================================================================
// Project:   Smartgraphs.TableItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  This is a custom ListItemView for display in Smartgraphs tables. 
  
  The addition here is support for background highlighting based on annotations.

  @extends SC.View
*/
Smartgraphs.TableItemView = SC.ListItemView.extend(
/** @scope Smartgraphs.TableItemView.prototype */ {

  displayProperties: ['backgroundColor'],
  
  classNames: "table-item-view",
  backgroundColorBinding: '.content.backgroundColor'
  
});