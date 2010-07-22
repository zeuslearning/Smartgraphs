// ==========================================================================
// Project:   Smartgraphs.Command Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/command');

Smartgraphs.Command.FIXTURES = [
  
  { guid: 
      'show-single-pane',
    
    name: 
      'showSinglePane',
    
    description:
      'Set the right-side display to show a single pane.',
    
    actionName:
      'showSinglePane',
      
    literalArgs:
      {},
      
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'show-split-pane',
    
    name: 
      'showSplitPane',
    
    description:
      'Set the right-side display to show two panes.',
    
    actionName:
      'showSplitPane',
      
    literalArgs:
      {},
      
    substitutedArgs:
      {}
  },


  { guid: 
      'show-image',
    
    name: 
      'showFirstPaneImage',
    
    description:
      'Set the right-side display to show an image in the first (or top) pane.',
    
    actionName:
      'showImage',
      
    literalArgs: {
      pane: 'first'
    },
      
    substitutedArgs:
      {}
  },

  
  { guid: 
      'show-graph',
    
    name: 
      'showGraph',
    
    description:
      'Set the right-side display to show a graph.',
    
    actionName:
      'showGraph',
      
    literalArgs:
      {},
      
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'enable-submission',
    
    name: 
      'enableSubmission',
    
    description:
      'Allows the user to submit his or her work on this step',
    
    actionName:
      'enableSubmission',
      
    literalArgs: 
      {},
      
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'finish-step',
    
    name: 
      'finishGuideStep',
    
    description:
      'Finishes this Guide step.',
    
    actionName:
      'finishGuideStep',
      
    literalArgs: 
      {},
      
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'start-prediction-graph-input',
    
    name: 
      'startPredictionGraphInput',
    
    description:
      'Open up the predition graph.',
    
    actionName:
      'startPredictionGraphInput',
      
    literalArgs: 
      {},
      
    substitutedArgs:
      {}
  },
  
  
  { guid: 
      'goto-step',
    
    name: 
      'openGuideStep',
    
    description:
      'Open a new guide step.',
    
    actionName:
      'openGuideStep',
      
    literalArgs: 
      {},
      
    substitutedArgs:
      {}
  }
  
  
];
