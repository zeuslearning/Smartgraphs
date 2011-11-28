// ==========================================================================
// Project:   Smartgraphs.CreditsController
// Copyright: ©2011 The Concord Consortoum
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.aboutController = SC.ObjectController.create(
/** @scope Smartgraphs.creditsController.prototype */ {

  showAbout: function() {
    Smartgraphs.AboutPane.show();
  }

}) ;
