// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @namespace

  Smaht Graphs. Wicked Smaht Graphs!
  
  @extends SC.Application
*/
Smartgraphs = SC.Application.create(
  /** @scope Smartgraphs.prototype */ {

  NAMESPACE: 'Smartgraphs',
  VERSION: '0.1.0',
  
  // Only attempt to read data from JSON documents with doc.data_format_version that matches the version below
  DATA_FORMAT_VERSION: 5,
  
  rootStore: function () {
    var ret = Smartgraphs.store;
    while (ret.get('parentStore')) {
      ret = ret.get('parentStore');
    }
    return ret;
  }.property(),

  // Add global constants or singleton objects here
  _nextGuid: 1000,
  getNextGuid: function () {
    return this._nextGuid++;
  },
  
  couchIdForStoreKey: function(storeKey) {
    return Smartgraphs.dataSource.couch._ids[storeKey];
  },
  
  couchRevForStoreKey: function(storeKey) {
    return Smartgraphs.dataSource.couch._revs[storeKey];
  },
  
  ensureCouchDatabase: function(databaseName) {
    var url = '/db/'+databaseName;
    response = SC.Request.getUrl(url).async(NO).json().send();

    if (SC.ok(response)) {
      var body = response.get('body');
      if (body.db_name) {
        this.set('couchDatabase', databaseName);
        return true;
      } else {
        SC.Logger.info("no db_name key in the response");
      }
    } else {
      SC.Logger.info("Non-ok response");
    }
    return this.createCouchDatabase(url);
  },

  createCouchDatabase: function(url) {
    response = SC.Request.putUrl(url).async(NO).json().send();

    if (SC.ok(response)) {
      var body = response.get('body');
      if (body.db_name) {
        console.log("Created the '%@' database in CouchDB.".fmt(databaseName));

        // create the views
        response = SC.Request.postUrl(url).async(NO).json().send({
          "_id": "_design/by_url",
          "language": "javascript",
          "views": {
            "url": {
              "map": "function(doc) { if (doc.url) emit(doc.url, doc);  }"
            }
          }
        });
        if (SC.ok(response)) {
          console.log("Created the 'url' view in CouchDB.");
          this.set('couchDatabase', databaseName);
          return true;
        } else {
          body = response.get('body');
          console.log("Got a "+body.error+" error when trying to create the 'url' view. Reason: "+body.reason);
          // alert("Could not create a required CouchDB view.");
        }
      }
    }
    return false;
  },
  
  // DEBUG SETTINGS
  trace: YES,                   // whether to trace firstResponder changes and app actions      
  logDataSource: YES,           // whether the data source should log
  showOutline: NO,             // whether to show the outline on the left by default
  allowAuthoring: NO           // whether to enable the "Edit" button
  
}) ;

SC.CONTEXT_MENU_ENABLED = YES;
