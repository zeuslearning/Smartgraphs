// ==========================================================================
// Project:   Smartgraphs.DataRepresentation
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Base class of DataRepresentation hierarchy.
  
  DataRepresentations manage lists of Mark objects, which are updated from a Sampleset

  @extends SC.Object
  @version 0.1
*/
Smartgraphs.DataRepresentation = SC.Object.extend(
/** @scope Smartgraphs.DataRepresentation.prototype */ {
  
  init: function () {
    this.set('lines', []);
    this.set('points', []);
  },
  
  sampleset: (function () {
    var sampleset;
    return function (key, value) {
      if (value !== undefined) {
        if (sampleset !== undefined) throw "Attempt to redefine a DataRepresentations's sampleset";
        sampleset = value;
        if (this.didSetSampleset) this.didSetSampleset();
      }
      return sampleset;
    }.property();
  }()),
  
  xUnits: SC.outlet('sampleset.datadef.xUnits'),
  yUnits: SC.outlet('sampleset.datadef.yUnits'),
  name:   SC.outlet('sampleset.datadef.name'),
  
  // some representative options
  color: null,
  
  pointStyle: null,
  points: null,
  
  lineStyle: null,
  lines: null,
  
  didSetSampleset: function () {
    var sampleset = this.get('sampleset');
    sampleset.addObserver('points.[]', this, this._pointsDidChange);
    this._pointsDidChange();
  },
  
  _pointsDidChange: function () {
    var samplePoints = this.getPath('sampleset.points') || [];
    this.set('points', samplePoints.map( function (pair) { 
      return Smartgraphs.Point.create( { x: pair[0], y: pair[1] });
    }));
  }
  
});
