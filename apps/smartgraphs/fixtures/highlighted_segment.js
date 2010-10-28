// ==========================================================================
// Project:   Smartgraphs.HighlightedPoint Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/highlighted_segment');

Smartgraphs.HighlightedSegment.FIXTURES = [

  // need to have some fixtures or fixturesDataSource's updateRecords() thinks it can't handle the record.
  // http://github.com/sproutcore/sproutcore/issues/#issue/36
  { url: '/shared/marias-run/annotations/maria-running-interval-1',
    name: 'maria-running-interval-1',
    activity: '/shared/marias-run',    
    isExample: YES,
    session: null,
    points: [400, 401, 402, 403]
  },

  { url: '/shared/marias-run/annotations/maria-running-interval-2',
    name: 'maria-running-interval-2',
    activity: '/shared/marias-run',     
    isExample: YES,
    session: null,
    points: [405, 406, 407, 408, 409]
  },
  
  { url: '/shared/marias-run/annotations/maria-stationary-interval',
    name: 'maria-stationary-interval',
    activity: '/shared/marias-run',     
    isExample: YES,
    session: null,
    points: [403, 404, 405]
  }

];
