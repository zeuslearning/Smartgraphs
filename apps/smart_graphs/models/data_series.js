// ==========================================================================
// Project:   SmartGraphs.DataSeries
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SmartGraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
SmartGraphs.DataSeries = SC.Record.extend(
/** @scope SmartGraphs.DataSeries.prototype */ {

  // TODO: Add your own code here.
  
  points: SC.Record.toMany('SmartGraphs.DataPoint', {
    inverse: 'series'})
}) ;
