// ==========================================================================
// Project:   Smartgraphs.UnorderedDataPoints
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/datadef');

/** @class

  The UnorderedDataPoints data definition class defines a dataset that is described by an unordered set of (x,y)
  pairs.

  @extends Smartgraphs.Datadef
  @version 0.1
*/
Smartgraphs.UnorderedDataPoints = Smartgraphs.Datadef.extend(
/** @scope Smartgraphs.UnorderedDataPoints.prototype */ {

  /**
    @property {Array[]}

    Array of datapoints that make up this dataset. Each item in the array should be an array of length 2 corresponding
    in the obvious way to the (x, y) values of a single datapoint.

    The order of the points in the 'points' array is not significant.
  */
  points: SC.Record.attr(Array, { defaultValue: [] }),

  /**
    Returns a DataRepresentation to represent this data. The default behavior is to create a new TrivialSampleset and
    return a DataRepresentation requested from the TrivialSampleSet by passing the options hash to it.

    @param options {Object}
      Hash of options to be respected when returning the DataRepresentations (the options are not yet well defined.)

    @returns {Smartgraphs.DataRepresentation}
  */
  getNewRepresentation: function (options) {
    var sampleset = Smartgraphs.TrivialSampleset.create({
      xMin: !options || SC.none(options.xMin) ? -Infinity : options.xMin,
      xMax: !options || SC.none(options.xMax) ?  Infinity : options.xMax
    });
    sampleset.set('datadef', this);
    return sampleset.getNewRepresentation(options);
  },

  addPoint: function (x, y) {
    this.get('points').pushObject([x, y]);
    this.set('latestX', x);
    this.set('latestY', y);
  },

  replacePoint: function (index, x, y) {
    var datadefPoints = this.get('points');
    datadefPoints.replace(index, 1, [[x, y]]);
    this.set('latestX', x);
    this.set('latestY', y);
  },

  clearPoints: function () {
    this.set('points', []);
  },

  /**
    Returns a deviation value of this dataset from the reference Scatter Plot.

    @returns {Number}
  */
  calculateDeviationValue: function () {
    var referencePoints = [], points = [];
    var referenceDatadefName = this.get('referenceDatadefName');
    if (referenceDatadefName !== undefined) {
      if (referenceDatadefName !== "") {
        var referenceDatadef = Smartgraphs.activityObjectsController.findDatadef(referenceDatadefName);
        referencePoints = referenceDatadef.get('points');
        points = this.get('points');
      }
    }
    var len = referencePoints.length;
    var xArray = [];
    var yArray = [];
    for (var i = 0; i < len; i++) {
      xArray[i] = referencePoints[i][0];
      yArray[i] = referencePoints[i][1];
    }

    if (points.length >= 2) {
      var y2 = points[1][1];
      var y1 = points[0][1];
      var x2 = points[1][0];
      var x1 = points[0][0];
      var slope = 0;
      var avgDeviation = 0, deviation = 0;
      slope = (y2 - y1) / (x2 - x1);

      var constant = 0;
      for (var j = 0; j < len; j++)
      {
        if (slope === 0) {
          constant = y1;
          deviation = Math.abs(constant - referencePoints[j][0]);
        }
        else if (slope === Infinity || slope === (-Infinity)) {
          constant = x1;
          deviation = Math.abs(constant - referencePoints[j][1]);
        }
        else {
          constant = y2 - slope * x2;
          deviation = Math.abs((slope * referencePoints[j][0] - referencePoints[j][1] + constant)) / Math.sqrt((slope * slope) + 1);
        }
        avgDeviation += Math.pow(deviation, 2);
      }
      avgDeviation = avgDeviation / len;
      avgDeviation = (Math.round(avgDeviation * 100) / 100).toFixed(2);
      this.set('deviationValue', avgDeviation);
    }
  }.observes('*points.[]')
});
