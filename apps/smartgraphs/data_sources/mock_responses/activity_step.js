// ==========================================================================
// Project:   Smartgraphs.ActivityStep mock server responses
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// @author    Dewi Win <dwin@concord.org> (activity text)
// ==========================================================================
/*globals Smartgraphs */

sc_require('data_sources/mock_responses/mock_responses');

var step, steps = [];


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 1
****************************************************************************/

step = Smartgraphs.mockResponses["/backend/activity/1/page/1/step/1"] = 
{
  "url": "/backend/activity/1/page/1/step/1",
  "activityPage": "/backend/activity/1/page/1",
  "initialPaneConfig": 'single',
  "singleGraph": null,
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": sc_static("resources/arrow.jpg"),
  "topImage": null,
  "bottomImage": null,
  "beforeText": "",
   "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": true,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": false
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/1/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 2
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/1/page/2/step/1"] =
{
  "url": "/backend/activity/1/page/2/step/1",
  "activityPage": "/backend/activity/1/page/2",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/1/prediction-away",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>In the top-right area, draw a graph of someone walking at a slow, steady pace from point A to point B "+
    "between 0 and 15 seconds.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
    { "action": "startFreehandInput",
      "literalArgs": {
        "pane": "top",
        "annotationName": "prediction-away"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/2/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};

steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/2/step/2"] =
{
  "url": "/backend/activity/1/page/2/step/2",
  "activityPage": "/backend/activity/1/page/2",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/1/prediction-away",
  "bottomGraph": "/backend/activity/1/graph/2/prediction-toward",
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
     "<p>In the bottom-right area, draw a graph of someone walking at a slow, steady pace from point B to point A "+
     "between 0 and 15 seconds. Click Next when you are done.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
    { "action": "startFreehandInput",
      "literalArgs": {
        "pane": "bottom",
        "annotationName": "prediction-toward"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/2/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 3
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/1/page/3/step/1"] = 
{
  "url": "/backend/activity/1/page/3/step/1",
  "activityPage": "/backend/activity/1/page/3",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/3/sensor-playing",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText":
     "<p><b>Place</b> the sensor at the 0-meter mark. <b>Stand</b> near the sensor. When you are ready, have your partner <b>click "+
     "Start</b> to record the position and time data for your movements. </p>"+
     "<p><b>Walk</b> on the path for 15 seconds. <b>Try</b> "+
     "different kinds of motions (walking fast, slow, forward, backward\u2026) <b>Click Stop</b> after 15 seconds are "+
     "up. <b>Click Reset</b> if you want to try again.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
    { "action": "startSensorInput",  
      "literalArgs": {
        "pane": "top",
        "seriesName": "sensor-play"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/3/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/3/step/2"] = 
{
  "url": "/backend/activity/1/page/3/step/2",
  "activityPage": "/backend/activity/1/page/3",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/3/sensor-playing",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
     "<p>How are different motions represented on a position-time graph? (For example, what does the graph look "+
     "like when you are standing still, walking forward ...?)</p>"+
     "<p>Try to use some of the following words: slope, flat, upward, downward, curved, straight, steep, gradual, "+
     "line, curve.",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/3/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 4
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/1/page/4/step/1"] = 
{
  "url": "/backend/activity/1/page/4/step/1",
  "activityPage": "/backend/activity/1/page/4",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/4/graph-with-away-prediction',
  "bottomGraph": '/backend/activity/1/graph/5/graph-with-toward-prediction',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>First, <b>stand</b> close to the sensor, near the 0-meter mark. "+
    "When you are ready, have your partner <b>click Start</b> to record the position and time data for your "+
    "movements. "+
    "<p><b>Walk</b> on the path at a slow, steady pace, away from the sensor, for 15 seconds. <b>Click "+
    "Stop</b> after 15 seconds are up.",
  "responseTemplate": "",
  "afterText": "",
  "startCommands": [
    { "action": "startSensorInput",  
      "literalArgs": {
        "pane": "top",
        "seriesName": "sensor-away"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/4/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/4/step/2"] = 
{
  "url": "/backend/activity/1/page/4/step/2",
  "activityPage": "/backend/activity/1/page/4",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/4/graph-with-away-prediction',
  "bottomGraph": '/backend/activity/1/graph/5/graph-with-toward-prediction',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>To make the second graph, <b>stand</b> approximately 4 meters away from the sensor on the path. When you "+
    "are ready, have your partner <b>click Start</b> to record the position and time data for your movements. "+
    "<p><b>Walk</b> on the path at the same slow, steady pace, toward the sensor, for 15 seconds. <b>Click Stop</b> "+
    "after 15 seconds are up.",
  "responseTemplate": "",
  "afterText": "",
  "startCommands": [
    { "action": "startSensorInput",  
      "literalArgs": {
        "pane": "bottom",
        "seriesName": "sensor-toward"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/4/step/3",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/4/step/3"] = 
{
  "url": "/backend/activity/1/page/4/step/3",
  "activityPage": "/backend/activity/1/page/4",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/4/graph-with-away-prediction',
  "bottomGraph": '/backend/activity/1/graph/5/graph-with-toward-prediction',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>How closely do the graphs of your data match your original sketches?</p>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);
Smartgraphs.mockResponses["/backend/activity/1/page/4/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 5
****************************************************************************/

steps = [];
step = Smartgraphs.mockResponses["/backend/activity/1/page/5/step/1"] = 
{
  "url": "/backend/activity/1/page/5/step/1",
  "activityPage": "/backend/activity/1/page/5",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/6/sensor-away',
  "bottomGraph": '/backend/activity/1/graph/7/sensor-toward',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>How are the two position-time graphs <b>similar</b> to each other?</p>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/5/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/5/step/2"] = 
{
  "url": "/backend/activity/1/page/5/step/2",
  "activityPage": "/backend/activity/1/page/5",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/6/sensor-away',
  "bottomGraph": '/backend/activity/1/graph/7/sensor-toward',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>How does motion away from the sensor <b>differ</b> from motion toward the sensor on a position-time "+
    "graph?</b>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/5/steps"] = steps;

/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 6
****************************************************************************/
steps = [];
step = Smartgraphs.mockResponses["/backend/activity/1/page/6/step/1"] = 
{
  "url": "/backend/activity/1/page/6/step/1",
  "activityPage": "/backend/activity/1/page/6",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/8/walking-example-1',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>What happened at the red point?</p>",
  "responseTemplate": "/backend/response-template/3/multiplechoice",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": ["value", 1]
      },
      "step": "/backend/activity/1/page/6/step/5"
    },
    { "criterion": { 
        "equals": ["value", 2]
      },
      "step": "/backend/activity/1/page/6/step/2"
    },
    { "criterion": { 
        "equals": ["value", 3]
      },
      "step": "/backend/activity/1/page/6/step/3"
    },
    { "criterion": { 
        "equals": ["value", 4]
      },
      "step": "/backend/activity/1/page/6/step/4"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/6/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/6/step/2"] = 
{
  "url": "/backend/activity/1/page/6/step/2",
  "activityPage": "/backend/activity/1/page/6",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/8/walking-example-1',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText":
    "<p>What happened at the red point?</p>",
  "responseTemplate": "/backend/response-template/3/multiplechoice",
  "afterText":  "<p><b>Incorrect.</b> Look at the walker's position at the red point.</p>",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": ["value", 1]
      },
      "step": "/backend/activity/1/page/6/step/5"
    },
    { "criterion": { 
        "equals": ["value", 2]
      },
      "step": "/backend/activity/1/page/6/step/2"
    },
    { "criterion": { 
        "equals": ["value", 3]
      },
      "step": "/backend/activity/1/page/6/step/3"
    },
    { "criterion": { 
        "equals": ["value", 4]
      },
      "step": "/backend/activity/1/page/6/step/4"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/6/step/3",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/6/step/3"] = 
{
  "url": "/backend/activity/1/page/6/step/3",
  "activityPage": "/backend/activity/1/page/6",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/8/walking-example-1',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText":
    "<p>What happened at the red point?</p>",
  "responseTemplate": "/backend/response-template/3/multiplechoice",
  "afterText": "<p><b>Incorrect.</b> Was the walker 2 meters away at the red point?</p>", 
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": ["value", 1]
      },
      "step": "/backend/activity/1/page/6/step/5"
    },
    { "criterion": { 
        "equals": ["value", 2]
      },
      "step": "/backend/activity/1/page/6/step/2"
    },
    { "criterion": { 
        "equals": ["value", 3]
      },
      "step": "/backend/activity/1/page/6/step/3"
    },
    { "criterion": { 
        "equals": ["value", 4]
      },
      "step": "/backend/activity/1/page/6/step/4"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/6/step/4",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/6/step/4"] = 
{
  "url": "/backend/activity/1/page/6/step/4",
  "activityPage": "/backend/activity/1/page/6",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/8/walking-example-1',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText":
    "<p>What happened at the red point?</p>",
  "responseTemplate": "/backend/response-template/3/multiplechoice",
  "afterText": "<p><b>Incorrect.</b> Look at the walker's direction after the red point.</p>",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": ["value", 1]
      },
      "step": "/backend/activity/1/page/6/step/5"
    },
    { "criterion": { 
        "equals": ["value", 2]
      },
      "step": "/backend/activity/1/page/6/step/2"
    },
    { "criterion": { 
        "equals": ["value", 3]
      },
      "step": "/backend/activity/1/page/6/step/3"
    },
    { "criterion": { 
        "equals": ["value", 4]
      },
      "step": "/backend/activity/1/page/6/step/4"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/6/step/5",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/6/step/5"] = 
{
  "url": "/backend/activity/1/page/6/step/5",
  "activityPage": "/backend/activity/1/page/6",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/8/walking-example-1',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText":
    "<p><b>Correct!</b> At this point, the walker was 4 meters away, getting ready to walk toward the sensor.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": {
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/6/step/6",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/6/step/6"] = 
{
  "url": "/backend/activity/1/page/6/step/6",
  "activityPage": "/backend/activity/1/page/6",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/8/walking-example-1',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText":
  "<p>What is a good strategy for finding out what is happening at a given point in a position-time graph?</p>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "",
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/6/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 7
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/1/page/7/step/1"] = 
{
  "url": "/backend/activity/1/page/7/step/1",
  "activityPage": "/backend/activity/1/page/7",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/3/sensor-playing",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText":
    "<p><b>Stand</b> at a starting point <b>other</b> than the 0-meter mark. When you are ready, have your "+
    "partner <b>click Start</b> to record the position and time data for your movements. </p>"+
    "<p><b>Walk</b> on the path for 15 seconds, experimenting with different directions and speeds. "+
    "<b>Click Stop</b> after 15 seconds are up.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
    { "action": "startSensorInput",  
      "literalArgs": {
        "pane": "top",
        "seriesName": "sensor-play-2"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/7/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/7/step/2"] = 
{
  "url": "/backend/activity/1/page/7/step/2",
  "activityPage": "/backend/activity/1/page/7",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/3/sensor-playing",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
     "<p>What is the significance of the y-intercept (the y-value of the point where the graph crosses the "+
     "y-axis) of the position-time graph?</p>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/7/step/3",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/7/step/3"] = 
{
  "url": "/backend/activity/1/page/7/step/3",
  "activityPage": "/backend/activity/1/page/7",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/3/sensor-playing",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
     "<p>Explain how the graph conveys how fast you walked.</p>", 
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/7/step/4",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/7/step/4"] = 
{
  "url": "/backend/activity/1/page/7/step/4",
  "activityPage": "/backend/activity/1/page/7",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/3/sensor-playing",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
     "<p>How is direction represented on the graph?</p>", 
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/7/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 8
****************************************************************************/

steps = [];
step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/1"] = 
{
  "url": "/backend/activity/1/page/8/step/1",
  "activityPage": "/backend/activity/1/page/8",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/9/two-walkers',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>Which of the following motion scenarios could have resulted in this graph?</p>"+
    "<ul style=\"font-size: 0.8em\">"+
    "  <li>A. I started at the motion sensor and walked away from the sensor for 10 seconds. Then I walked toward the "+
    "      sensor for 10 seconds.</li>"+
    "  <li>B. My friend and I both started 2 meters away from the sensor. He walked away from the motion sensor for "+
    "      20 seconds. I walked toward the sensor for 20 seconds.</li>"+
    "  <li>C. I started at the sensor and walked away from the sensor for 20 seconds. My friend started 2 meters away "+
    "      from the sensor and walked away from the sensor for 20 seconds."+
    "  <li>D. I started at the sensor and walked away from the sensor for 20 seconds. My friend started 2 meters away "+
    "      from the sensor and walked toward the sensor for 20 seconds.</li>"+
    "</ul>",
  "responseTemplate": "/backend/response-template/1/numeric",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": [{ "strip":  "value" }, ["a", "b", "c", "d", "A", "B", "C", "D"]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "in": [{"strip" : "value" }, ["b", "B"]]
      },
      "step": "/backend/activity/1/page/8/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/8/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/2"] = 
{
  "url": "/backend/activity/1/page/8/step/2",
  "activityPage": "/backend/activity/1/page/8",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/9/two-walkers',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>Which of the following motion scenarios could have resulted in this graph?</p>"+
    "<ul style=\"font-size: 0.8em\">"+
    "  <li>A. I started at the motion sensor and walked away from the sensor for 10 seconds. Then I walked toward the "+
    "      sensor for 10 seconds.</li>"+
    "  <li>B. My friend and I both started 2 meters away from the sensor. He walked away from the motion sensor for "+
    "      20 seconds. I walked toward the sensor for 20 seconds.</li>"+
    "  <li>C. I started at the sensor and walked away from the sensor for 20 seconds. My friend started 2 meters away "+
    "      from the sensor and walked away from the sensor for 20 seconds."+
    "  <li>D. I started at the sensor and walked away from the sensor for 20 seconds. My friend started 2 meters away "+
    "      from the sensor and walked toward the sensor for 20 seconds.</li>"+
    "</ul>"+
    "<p><b>Incorrect.</b> Two data sets are represented on one graph. Analyze each set of data.</p>",
  "responseTemplate": "/backend/response-template/1/numeric",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": [{ "strip":  "value" }, ["a", "b", "c", "d", "A", "B", "C", "D"]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "in": [{"strip" : "value" }, ["b", "B"]]
      },
      "step": "/backend/activity/1/page/8/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/8/step/3",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/3"] = 
{
  "url": "/backend/activity/1/page/8/step/3",
  "activityPage": "/backend/activity/1/page/8",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/9/two-walkers',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>Which of the following motion scenarios could have resulted in this graph?</p>"+
    "<ul style=\"font-size: 0.8em\">"+
    "  <li>A. I started at the motion sensor and walked away from the sensor for 10 seconds. Then I walked toward the "+
    "      sensor for 10 seconds.</li>"+
    "  <li>B. My friend and I both started 2 meters away from the sensor. He walked away from the motion sensor for "+
    "      20 seconds. I walked toward the sensor for 20 seconds.</li>"+
    "  <li>C. I started at the sensor and walked away from the sensor for 20 seconds. My friend started 2 meters away "+
    "      from the sensor and walked away from the sensor for 20 seconds."+
    "  <li>D. I started at the sensor and walked away from the sensor for 20 seconds. My friend started 2 meters away "+
    "      from the sensor and walked toward the sensor for 20 seconds.</li>"+
    "</ul>"+
    "<p><b>Incorrect.</b> Figure out where each person started and ended.</p>",
  "responseTemplate": "/backend/response-template/1/numeric",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": [{ "strip":  "value" }, ["a", "b", "c", "d", "A", "B", "C", "D"]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "in": [{"strip" : "value" }, ["b", "B"]]
      },
      "step": "/backend/activity/1/page/8/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/8/step/4",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/4"] = 
{
  "url": "/backend/activity/1/page/8/step/4",
  "activityPage": "/backend/activity/1/page/8",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/9/two-walkers',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>Which of the following motion scenarios could have resulted in this graph?</p>"+
    "<ul style=\"font-size: 0.8em\">"+
    "  <li>A. I started at the motion sensor and walked away from the sensor for 10 seconds. Then I walked toward the "+
    "      sensor for 10 seconds.</li>"+
    "  <li>B. My friend and I both started 2 meters away from the sensor. He walked away from the motion sensor for "+
    "      20 seconds. I walked toward the sensor for 20 seconds.</li>"+
    "  <li>C. I started at the sensor and walked away from the sensor for 20 seconds. My friend started 2 meters away "+
    "      from the sensor and walked away from the sensor for 20 seconds."+
    "  <li>D. I started at the sensor and walked away from the sensor for 20 seconds. My friend started 2 meters away "+
    "      from the sensor and walked toward the sensor for 20 seconds.</li>"+
    "</ul>"+
    "<p><b>Incorrect.</b> Think about the direction each walker moved from the starting point.</p>",
  "responseTemplate": "/backend/response-template/1/numeric",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": [{ "strip":  "value" }, ["a", "b", "c", "d", "A", "B", "C", "D"]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "in": [{"strip" : "value" }, ["b", "B"]]
      },
      "step": "/backend/activity/1/page/8/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/8/step/5",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/5"] = 
{
  "url": "/backend/activity/1/page/8/step/5",
  "activityPage": "/backend/activity/1/page/8",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/9/two-walkers',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p><b>Still incorrect.</b> Both walkers started 2 meters away. Then, one walked toward the sensor for 20 seconds, "+
    "while the other walked away from the sensor during the same 20 seconds.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": null,
  "submissibilityCriterion": {
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
  },
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/6"] = 
{
  "url": "/backend/activity/1/page/8/step/6",
  "activityPage": "/backend/activity/1/page/8",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/9/two-walkers',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p><b>Correct!</b> Both walkers started 2 meters away. Then, one walked toward the sensor for 20 seconds, "+
    "while the other walked away from the sensor during the same 20 seconds.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": null,
  "submissibilityCriterion": {
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
  },
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/8/steps"] = steps;

steps = [];

/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 9
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/1/page/9/step/1"] = 
{
  "url": "/backend/activity/1/page/9/step/1",
  "activityPage": "/backend/activity/1/page/9",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/10/graph-to-match",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText":
     "<p><b>Move</b> to your starting point and, when you are ready, have your partner <b>click Start</b> to record "+
     "the data for your movements. "+
     "<p><b>Walk</b> on the path for 15 seconds while trying to match the given graph. "+
     "<b>Click stop</b> after 15 seconds are up.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
    { "action": "startSensorInput",  
      "literalArgs": {
        "pane": "top",
        "seriesName": "sensor-match"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/9/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/9/step/2"] = 
{
  "url": "/backend/activity/1/page/9/step/2",
  "activityPage": "/backend/activity/1/page/9",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/10/graph-to-match",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
     "<p>How closely does your graph match the given graph? What could you have done to match the given graph "+
     "more closely?",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/9/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 10
****************************************************************************/

steps = [];
step = Smartgraphs.mockResponses["/backend/activity/1/page/10/step/1"] = 
{
  "url": "/backend/activity/1/page/10/step/1",
  "activityPage": "/backend/activity/1/page/10",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/4/graph-with-away-prediction',
  "bottomGraph": '/backend/activity/1/graph/5/graph-with-toward-prediction',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>Write down <b>3</b> things you have learned about motion since you started this activity.</p>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/10/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/10/step/2"] = 
{
  "url": "/backend/activity/1/page/10/step/2",
  "activityPage": "/backend/activity/1/page/10",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/4/graph-with-away-prediction',
  "bottomGraph": '/backend/activity/1/graph/5/graph-with-toward-prediction',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>Describe <b>2</b> segments of the graphs and describe what is happening in each.</p>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/10/step/3",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/10/step/3"] = 
{
  "url": "/backend/activity/1/page/10/step/3",
  "activityPage": "/backend/activity/1/page/10",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/4/graph-with-away-prediction',
  "bottomGraph": '/backend/activity/1/graph/5/graph-with-toward-prediction',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>Describe <b>1</b> type of motion you would like to try with the motion sensor.</p>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);
Smartgraphs.mockResponses["/backend/activity/1/page/10/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 11 (end page)
****************************************************************************/

steps = [];
step = Smartgraphs.mockResponses["/backend/activity/1/page/11/step/1"] = 
{
  "url": "/backend/activity/1/page/11/step/1",
  "activityPage": "/backend/activity/1/page/11",
  "initialPaneConfig": 'single',
  "singleGraph": null,
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": sc_static("resources/arrow.jpg"),
  "topImage": null,
  "bottomImage": null,
  "beforeText": "",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": false
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/11/steps"] = steps;


/****************************************************************************
*    Activity 2 (Demo of Activity Switching)
*    Page 1
****************************************************************************/


steps = [];
step = Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1"] = 
{
  "url": "/backend/activity/2/page/1/step/1",
  "activityPage": "/backend/activity/2/page/1",
  "initialPaneConfig": 'single',
  "singleGraph": "/backend/activity/1/graph/1/prediction-away",
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>Try visiting the first activity by changing just the last digit of the URL from '2' to '1' and hitting "+
    "Enter.<p>"+
    "<p>Also, you can now resize the browser window without scrambling the prediction graph on the right.</p>",
  "responseTemplate": "",
  "afterText": "",
  "startCommands": [
    { "action": "startFreehandInput",
      "literalArgs": {
        "pane": "top",
        "annotationName": "prediction-away"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": false
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/2/page/1/steps"] = steps;


/****************************************************************************
*    Activity 'new-step' (Testbed for activity step refactoring)
*    Page 1
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/new-step/page/1/step/1"] = 
{
  "url": "/backend/activity/new-step/page/1/step/1",
  "activityPage": "/backend/activity/new-step/page/1",
  "initialPaneConfig": 'single',
  "singleGraph": null,
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": sc_static("resources/arrow.jpg"),
  "topImage": null,
  "bottomImage": null,
  "beforeText": "<p>How many panes would you like to see on the next page? Enter 'one' or 'two': ",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": [{ "strip":  "value" }, ["one", "two"]] 
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.ResponseFieldsInspector",
    "config": {
      "fieldIndex": 0
    }
  },
  "responseBranches": [
    { "criterion": { 
        "equals": [ {"strip" : "value" }, "one" ] 
      },
      "step": "/backend/activity/new-step/page/1/step/2"
    },
    { "criterion": { 
        "equals": [ {"strip" : "value" }, "two" ] 
      },
      "step": "/backend/activity/new-step/page/1/step/3"
    }
  ],
  "defaultBranch": null,
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "Show me!",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/new-step/page/1/step/2"] = 
{
  "url": "/backend/activity/new-step/page/1/step/2",
  "activityPage": "/backend/activity/new-step/page/1",
  "initialPaneConfig": 'single',
  "singleGraph": "/backend/activity/1/graph/1/prediction-away",
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": "<p>Enjoy the single pane on the right!<p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "I saw it!",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/new-step/page/1/step/3"] = 
{
  "url": "/backend/activity/new-step/page/1/step/3",
  "activityPage": "/backend/activity/new-step/page/1",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/1/prediction-away",
  "bottomGraph": "/backend/activity/1/graph/2/prediction-toward",
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": "<p>Enjoy the split pane on the right!<p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "I saw it!",
  "nextButtonShouldSubmit": false
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/new-step/page/1/steps"] = steps;