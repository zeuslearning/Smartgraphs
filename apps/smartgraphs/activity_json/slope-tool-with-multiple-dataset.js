/*globals Smartgraphs */

Smartgraphs.activityDocs = Smartgraphs.activityDocs || {};
Smartgraphs.activityDocs["/shared/slope-tool-with-multiple-dataset"] =
{
  "_id": "slope-tool-with-multiple-dataset.df6",
  "_rev": 1,
  "data_format_version": 6,
  "activity": {
    "title": "Slope Tool with multiple dataset",
    "url": "/shared/slope-tool-with-multiple-dataset",
    "owner": "shared",
    "pages": [
      "/shared/slope-tool-with-multiple-dataset/page/1-page-1"
    ],
    "axes": [
      "/shared/slope-tool-with-multiple-dataset/axes/1",
      "/shared/slope-tool-with-multiple-dataset/axes/2"
    ],
    "authorName": "Noah Paessel"
  },
  "pages": [
    {
      "name": "Page 1",
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "activity": "/shared/slope-tool-with-multiple-dataset",
      "index": 1,
      "introText": "A car is moving on a road as shown with variable speeds.",
      "steps": [
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/1",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/2",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/3",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/4",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/5",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/6",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/7",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/8",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/9",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/10",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/11",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/12",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/13",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/14",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/15",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/16",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/17",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/18",
        "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/19"
      ],
      "firstStep": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/1",
      "contextVars": [
        {
          "name": "start-y",
          "value": [
            "coord",
            "y",
            [
              "listItem",
              1,
              [
                "slopeToolOrder",
                "tag-1",
                "tag-2"
              ]
            ]
          ]
        },
        {
          "name": "start-y_str",
          "value": [
            "toFixedString",
            [
              "get",
              "start-y"
            ],
            2
          ]
        },
        {
          "name": "end-y",
          "value": [
            "coord",
            "y",
            [
              "listItem",
              2,
              [
                "slopeToolOrder",
                "tag-1",
                "tag-2"
              ]
            ]
          ]
        },
        {
          "name": "end-y_str",
          "value": [
            "toFixedString",
            [
              "get",
              "end-y"
            ],
            2
          ]
        },
        {
          "name": "change-y",
          "value": [
            "-",
            [
              "get",
              "end-y"
            ],
            [
              "get",
              "start-y"
            ]
          ]
        },
        {
          "name": "change-y_str",
          "value": [
            "toFixedString",
            [
              "get",
              "change-y"
            ],
            2
          ]
        },
        {
          "name": "start-x",
          "value": [
            "coord",
            "x",
            [
              "listItem",
              1,
              [
                "slopeToolOrder",
                "tag-1",
                "tag-2"
              ]
            ]
          ]
        },
        {
          "name": "start-x_str",
          "value": [
            "toFixedString",
            [
              "get",
              "start-x"
            ],
            2
          ]
        },
        {
          "name": "end-x",
          "value": [
            "coord",
            "x",
            [
              "listItem",
              2,
              [
                "slopeToolOrder",
                "tag-1",
                "tag-2"
              ]
            ]
          ]
        },
        {
          "name": "end-x_str",
          "value": [
            "toFixedString",
            [
              "get",
              "end-x"
            ],
            2
          ]
        },
        {
          "name": "change-x",
          "value": [
            "-",
            [
              "get",
              "end-x"
            ],
            [
              "get",
              "start-x"
            ]
          ]
        },
        {
          "name": "change-x_str",
          "value": [
            "toFixedString",
            [
              "get",
              "change-x"
            ],
            2
          ]
        },
        {
          "name": "slope",
          "value": [
            "/",
            [
              "get",
              "change-y"
            ],
            [
              "get",
              "change-x"
            ]
          ]
        },
        {
          "name": "slope_str",
          "value": [
            "toFixedString",
            [
              "get",
              "slope"
            ],
            2
          ]
        }
      ]
    }
  ],
  "steps": [
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/1",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "What is the average velocity of the car between 2 and 8 seconds? (in m / s)?",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [],
          "highlightedAnnotations": [],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/2",
      "responseTemplate": "/shared/slope-tool-with-multiple-dataset/response-templates/numeric-1",
      "submissibilityCriterion": [
        "isNumeric",
        [
          "responseField",
          1
        ]
      ],
      "responseBranches": [
        {
          "criterion": [
            "withinAbsTolerance",
            [
              "responseField",
              1
            ],
            1.1666666666666667,
            0.1
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/19"
        }
      ],
      "isFinalStep": false,
      "variableAssignments": [
        {
          "name": "student-response-field",
          "value": [
            "responseField",
            1
          ]
        }
      ],
      "substitutedExpressions": []
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/2",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p> Click on a \npoint between 2 and 8 for time. </p>\n<p>Then click \"OK\". </p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [
            "highlighted-point-1"
          ],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "tagging",
          "setup": {
            "tag": "tag-1",
            "data": "averageVelocity"
          }
        }
      ],
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/3",
      "responseBranches": [
        {
          "criterion": [
            "and",
            [
              ">=",
              [
                "coord",
                "x",
                "tag-1"
              ],
              2
            ],
            [
              "<=",
              [
                "coord",
                "x",
                "tag-1"
              ],
              8
            ]
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/4"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/3",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p>The point you have selected is not \na \npoint between 2 and 8 for time.\nTry again.</p>\n<p> Click on a \npoint between 2 and 8 for time. </p>\n<p>Then click \"OK\". </p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [
            "highlighted-point-1"
          ],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "tagging",
          "setup": {
            "tag": "tag-1",
            "data": "averageVelocity"
          }
        }
      ],
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/3",
      "responseBranches": [
        {
          "criterion": [
            "and",
            [
              ">=",
              [
                "coord",
                "x",
                "tag-1"
              ],
              2
            ],
            [
              "<=",
              [
                "coord",
                "x",
                "tag-1"
              ],
              8
            ]
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/4"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/4",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p>Now click on\na second \npoint between 2 and 8 for time.</p>\n<p>Then click \"OK\". </p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": [],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "tagging",
          "setup": {
            "tag": "tag-2",
            "data": "averageVelocity"
          }
        }
      ],
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/8",
      "responseBranches": [
        {
          "criterion": [
            "samePoint",
            "tag-1",
            "tag-2"
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/6"
        },
        {
          "criterion": [
            "or",
            [
              "<",
              [
                "coord",
                "x",
                "tag-2"
              ],
              2
            ],
            [
              ">",
              [
                "coord",
                "x",
                "tag-2"
              ],
              8
            ]
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/7"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/5",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p> Your points should be adjacent.</p>\n<p>Now click on\na second \npoint between 2 and 8 for time.</p>\n<p>Then click \"OK\". </p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": [],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "tagging",
          "setup": {
            "tag": "tag-2",
            "data": "averageVelocity"
          }
        }
      ],
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/8",
      "responseBranches": [
        {
          "criterion": [
            "samePoint",
            "tag-1",
            "tag-2"
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/6"
        },
        {
          "criterion": [
            "or",
            [
              "<",
              [
                "coord",
                "x",
                "tag-2"
              ],
              2
            ],
            [
              ">",
              [
                "coord",
                "x",
                "tag-2"
              ],
              8
            ]
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/7"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/6",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p> You have selected the same point twice.</p>\n<p>Now click on\na second \npoint between 2 and 8 for time.</p>\n<p>Then click \"OK\". </p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": [],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "tagging",
          "setup": {
            "tag": "tag-2",
            "data": "averageVelocity"
          }
        }
      ],
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/8",
      "responseBranches": [
        {
          "criterion": [
            "samePoint",
            "tag-1",
            "tag-2"
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/6"
        },
        {
          "criterion": [
            "or",
            [
              "<",
              [
                "coord",
                "x",
                "tag-2"
              ],
              2
            ],
            [
              ">",
              [
                "coord",
                "x",
                "tag-2"
              ],
              8
            ]
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/7"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/7",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p> The point you have selected is not \na \npoint between 2 and 8 for time.  \nTry again.</p>\n<p>Now click on\na second \npoint between 2 and 8 for time.</p>\n<p>Then click \"OK\". </p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": [],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "tools": [
        {
          "name": "tagging",
          "setup": {
            "tag": "tag-2",
            "data": "averageVelocity"
          }
        }
      ],
      "submitButtonTitle": "OK",
      "defaultBranch": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/8",
      "responseBranches": [
        {
          "criterion": [
            "samePoint",
            "tag-1",
            "tag-2"
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/6"
        },
        {
          "criterion": [
            "or",
            [
              "<",
              [
                "coord",
                "x",
                "tag-2"
              ],
              2
            ],
            [
              ">",
              [
                "coord",
                "x",
                "tag-2"
              ],
              8
            ]
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/7"
        }
      ],
      "isFinalStep": false
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/8",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p> Here is the line connecting the two points. </p>\n<p> What is the average velocity of the car between 2 and 8 seconds? (in m / s)? </p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/9",
      "responseTemplate": "/shared/slope-tool-with-multiple-dataset/response-templates/numeric-1",
      "submissibilityCriterion": [
        "isNumeric",
        [
          "responseField",
          1
        ]
      ],
      "responseBranches": [
        {
          "criterion": [
            "withinAbsTolerance",
            [
              "responseField",
              1
            ],
            [
              "slope",
              "tag-1",
              "tag-2"
            ],
            0.1
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/19"
        }
      ],
      "isFinalStep": false,
      "variableAssignments": [
        {
          "name": "student-response-field",
          "value": [
            "responseField",
            1
          ]
        }
      ],
      "substitutedExpressions": []
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/9",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p> What is the average velocity of the car between 2 and 8 seconds? (in m / s)? </p>\n<p>Hint: Recall that the velocity is \nthe change in  distance\ndivided by the change in time.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/10",
      "responseTemplate": "/shared/slope-tool-with-multiple-dataset/response-templates/numeric-1",
      "submissibilityCriterion": [
        "isNumeric",
        [
          "responseField",
          1
        ]
      ],
      "responseBranches": [
        {
          "criterion": [
            "withinAbsTolerance",
            [
              "responseField",
              1
            ],
            [
              "slope",
              "tag-1",
              "tag-2"
            ],
            0.1
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/19"
        }
      ],
      "isFinalStep": false,
      "variableAssignments": [
        {
          "name": "student-response-field",
          "value": [
            "responseField",
            1
          ]
        }
      ],
      "substitutedExpressions": []
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/10",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p>What was the change in\ndistance between the two points?</p>\n<p>Hint: Look at the graph.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [
            "rise-arrow1"
          ],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/11",
      "responseTemplate": "/shared/slope-tool-with-multiple-dataset/response-templates/numeric-1",
      "submissibilityCriterion": [
        "isNumeric",
        [
          "responseField",
          1
        ]
      ],
      "responseBranches": [
        {
          "criterion": [
            "withinAbsTolerance",
            [
              "delta",
              "y",
              [
                "slopeToolOrder",
                "tag-1",
                "tag-2"
              ]
            ],
            [
              "responseField",
              1
            ],
            0.1
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/13"
        }
      ],
      "isFinalStep": false,
      "variableAssignments": [
        {
          "name": "student-response-field",
          "value": [
            "responseField",
            1
          ]
        }
      ]
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/11",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p>What was the change in\ndistance between the two points?</p>\n<p>Hint: Look at the table and the graph.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [
            "rise-arrow1"
          ],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": [
            "rise-bracket1"
          ]
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/12",
      "responseTemplate": "/shared/slope-tool-with-multiple-dataset/response-templates/numeric-1",
      "submissibilityCriterion": [
        "isNumeric",
        [
          "responseField",
          1
        ]
      ],
      "responseBranches": [
        {
          "criterion": [
            "withinAbsTolerance",
            [
              "delta",
              "y",
              [
                "slopeToolOrder",
                "tag-1",
                "tag-2"
              ]
            ],
            [
              "responseField",
              1
            ],
            0.1
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/13"
        }
      ],
      "isFinalStep": false,
      "variableAssignments": [
        {
          "name": "student-response-field",
          "value": [
            "responseField",
            1
          ]
        }
      ],
      "substitutedExpressions": []
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/12",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p>The change is\n<b>%@</b> - <b>%@</b>, \nor <b>%@</b>.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [
            "rise-arrow1"
          ],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": [
            "rise-bracket1"
          ]
        }
      },
      "submitButtonTitle": "Continue",
      "defaultBranch": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/13",
      "isFinalStep": false,
      "substitutedExpressions": [
        "end-y",
        "start-y",
        "change-y"
      ]
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/13",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p>What was the change in\ntime between the two points?</p>\n<p>Hint: Look at the graph.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1",
            "rise-arrow1"
          ],
          "highlightedAnnotations": [
            "run-arrow1"
          ],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/14",
      "responseTemplate": "/shared/slope-tool-with-multiple-dataset/response-templates/numeric-1",
      "submissibilityCriterion": [
        "isNumeric",
        [
          "responseField",
          1
        ]
      ],
      "responseBranches": [
        {
          "criterion": [
            "withinAbsTolerance",
            [
              "delta",
              "x",
              [
                "slopeToolOrder",
                "tag-1",
                "tag-2"
              ]
            ],
            [
              "responseField",
              1
            ],
            0.1
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/16"
        }
      ],
      "isFinalStep": false,
      "variableAssignments": [
        {
          "name": "student-response-field",
          "value": [
            "responseField",
            1
          ]
        }
      ]
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/14",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p>What was the change in\ntime between the two points?</p>\n<p>Hint: Look at the graph and the table.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1",
            "rise-arrow1"
          ],
          "highlightedAnnotations": [
            "run-arrow1"
          ],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": [
            "run-bracket1"
          ]
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/15",
      "responseTemplate": "/shared/slope-tool-with-multiple-dataset/response-templates/numeric-1",
      "submissibilityCriterion": [
        "isNumeric",
        [
          "responseField",
          1
        ]
      ],
      "responseBranches": [
        {
          "criterion": [
            "withinAbsTolerance",
            [
              "delta",
              "x",
              [
                "slopeToolOrder",
                "tag-1",
                "tag-2"
              ]
            ],
            [
              "responseField",
              1
            ],
            0.1
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/16"
        }
      ],
      "isFinalStep": false,
      "variableAssignments": [
        {
          "name": "student-response-field",
          "value": [
            "responseField",
            1
          ]
        }
      ]
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/15",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p>The change \nbetween the points is <b>%@</b> - <b>%@</b>, \nor <b>%@</b>.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1",
            "rise-arrow1"
          ],
          "highlightedAnnotations": [
            "run-arrow1"
          ],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": [
            "run-bracket1"
          ]
        }
      },
      "submitButtonTitle": "Continue",
      "defaultBranch": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/16",
      "isFinalStep": false,
      "substitutedExpressions": [
        "end-x",
        "start-x",
        "change-x"
      ]
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/16",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p>\n  If the change in distance is %@\n  and the change in time is %@\n  then what is the velocity in m/s?\n</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/17",
      "responseTemplate": "/shared/slope-tool-with-multiple-dataset/response-templates/numeric-1",
      "submissibilityCriterion": [
        "isNumeric",
        [
          "responseField",
          1
        ]
      ],
      "responseBranches": [
        {
          "criterion": [
            "withinAbsTolerance",
            [
              "responseField",
              1
            ],
            [
              "slope",
              "tag-1",
              "tag-2"
            ],
            0.1
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/19"
        }
      ],
      "isFinalStep": false,
      "variableAssignments": [
        {
          "name": "student-response-field",
          "value": [
            "responseField",
            1
          ]
        }
      ],
      "substitutedExpressions": [
        "change-y",
        "change-x"
      ]
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/17",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p>\n  If the change in distance is %@\n  and the change in time is %@\n  then what is the velocity in m/s?\n</p>\n<p>\n  Hint: Remember that it is \n  the change in distance \n  <b>divided by</b> \n  the change in time.\n</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "submitButtonTitle": "Check My Answer",
      "defaultBranch": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/18",
      "responseTemplate": "/shared/slope-tool-with-multiple-dataset/response-templates/numeric-1",
      "submissibilityCriterion": [
        "isNumeric",
        [
          "responseField",
          1
        ]
      ],
      "responseBranches": [
        {
          "criterion": [
            "withinAbsTolerance",
            [
              "responseField",
              1
            ],
            [
              "slope",
              "tag-1",
              "tag-2"
            ],
            0.1
          ],
          "step": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/19"
        }
      ],
      "isFinalStep": false,
      "variableAssignments": [
        {
          "name": "student-response-field",
          "value": [
            "responseField",
            1
          ]
        }
      ],
      "substitutedExpressions": [
        "change-y",
        "change-x"
      ]
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/18",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p><strong>Incorrect.</strong></p>\n<p>\nIf the change in distance is %@\nand the change in time is %@,\nthe velocity is \n<b>%@</b> divided by <b>%@</b>, \nor <b>%@</b> m/s.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2"
          ],
          "highlightedAnnotations": []
        }
      },
      "isFinalStep": true,
      "nextButtonShouldSubmit": true,
      "substitutedExpressions": [
        "change-y",
        "change-x",
        "change-y",
        "change-x",
        "slope_str"
      ]
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/page/1-page-1/step/19",
      "activityPage": "/shared/slope-tool-with-multiple-dataset/page/1-page-1",
      "beforeText": "<p><b>Correct!</b></p>\n<p>The velocity is <b>1.17</b> m/s.</p>",
      "paneConfig": "split",
      "panes": {
        "top": {
          "type": "graph",
          "title": "Velocity",
          "xAxis": "/shared/slope-tool-with-multiple-dataset/axes/1",
          "yAxis": "/shared/slope-tool-with-multiple-dataset/axes/2",
          "annotations": [
            "highlighted-point-1",
            "highlighted-point-2",
            "line-throughpoints1"
          ],
          "highlightedAnnotations": [],
          "data": [
            "SmallCar",
            "averageVelocity"
          ],
          "datarefs": [
            "dataref-1"
          ],
          "legends": [
            "SmallCar",
            "averageVelocity"
          ],
          "activeDatadefs": [
            "averageVelocity"
          ]
        },
        "bottom": {
          "type": "table",
          "data": "averageVelocity",
          "xLabel": "Time",
          "yLabel": "Distance",
          "annotations": [],
          "highlightedAnnotations": []
        }
      },
      "isFinalStep": true,
      "nextButtonShouldSubmit": true,
      "substitutedExpressions": []
    }
  ],
  "responseTemplates": [
    {
      "url": "/shared/slope-tool-with-multiple-dataset/response-templates/numeric-1",
      "templateString": "",
      "fieldChoicesList": [
        null
      ],
      "initialValues": [
        ""
      ],
      "fieldTypes": [
        "numeric"
      ]
    }
  ],
  "axes": [
    {
      "url": "/shared/slope-tool-with-multiple-dataset/axes/1",
      "units": "/shared/slope-tool-with-multiple-dataset/units/seconds",
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "Time"
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/axes/2",
      "units": "/shared/slope-tool-with-multiple-dataset/units/meters",
      "min": 0,
      "max": 10,
      "nSteps": 10,
      "label": "Distance"
    }
  ],
  "datadefs": [
    {
      "type": "UnorderedDataPoints",
      "records": [
        {
          "url": "/shared/slope-tool-with-multiple-dataset/datadefs/SmallCar",
          "name": "SmallCar",
          "activity": "/shared/slope-tool-with-multiple-dataset",
          "xUnits": "/shared/slope-tool-with-multiple-dataset/units/seconds",
          "yUnits": "/shared/slope-tool-with-multiple-dataset/units/meters",
          "points": [],
          "pointType": "none",
          "lineType": "connected",
          "lineSnapDistance": 0.5
        },
        {
          "url": "/shared/slope-tool-with-multiple-dataset/datadefs/averageVelocity",
          "name": "averageVelocity",
          "activity": "/shared/slope-tool-with-multiple-dataset",
          "xUnits": "/shared/slope-tool-with-multiple-dataset/units/seconds",
          "yUnits": "/shared/slope-tool-with-multiple-dataset/units/meters",
          "points": [
            [
              0,
              1
            ],
            [
              1,
              0
            ],
            [
              2,
              1
            ],
            [
              3,
              2
            ],
            [
              4,
              3
            ],
            [
              5,
              4
            ],
            [
              6,
              5
            ],
            [
              7,
              6
            ],
            [
              8,
              7
            ],
            [
              9,
              7
            ],
            [
              10,
              7
            ]
          ],
          "lineSnapDistance": 0
        }
      ]
    }
  ],
  "datarefs": [
    {
      "type": "LinearEquation",
      "records": [
        {
          "url": "/shared/slope-tool-with-multiple-dataset/datarefs/dataref-1",
          "name": "dataref-1",
          "activity": "/shared/slope-tool-with-multiple-dataset",
          "datadefName": "SmallCar",
          "expressionForm": "slope-intercept",
          "xInterval": 0.5,
          "params": {
            "slope": 1,
            "yIntercept": 0
          }
        }
      ]
    }
  ],
  "tags": [
    {
      "url": "/shared/slope-tool-with-multiple-dataset/tags/tag-1",
      "activity": "/shared/slope-tool-with-multiple-dataset",
      "name": "tag-1",
      "x": 2,
      "y": 1
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/tags/tag-2",
      "activity": "/shared/slope-tool-with-multiple-dataset",
      "name": "tag-2",
      "x": 8,
      "y": 8
    }
  ],
  "annotations": [
    {
      "type": "HighlightedPoint",
      "records": [
        {
          "url": "/shared/slope-tool-with-multiple-dataset/annotations/highlighted-point-1",
          "name": "highlighted-point-1",
          "activity": "/shared/slope-tool-with-multiple-dataset",
          "datadefName": "averageVelocity",
          "tag": "/shared/slope-tool-with-multiple-dataset/tags/tag-1",
          "color": "#1f77b4"
        },
        {
          "url": "/shared/slope-tool-with-multiple-dataset/annotations/highlighted-point-2",
          "name": "highlighted-point-2",
          "activity": "/shared/slope-tool-with-multiple-dataset",
          "datadefName": "averageVelocity",
          "tag": "/shared/slope-tool-with-multiple-dataset/tags/tag-2",
          "color": "#ff7f0e"
        }
      ]
    },
    {
      "type": "RunArrow",
      "records": [
        {
          "url": "/shared/slope-tool-with-multiple-dataset/annotations/run-arrow1",
          "name": "run-arrow1",
          "activity": "/shared/slope-tool-with-multiple-dataset",
          "color": "#cccccc",
          "datadefName": "averageVelocity",
          "p1Tag": "/shared/slope-tool-with-multiple-dataset/tags/tag-1",
          "p2Tag": "/shared/slope-tool-with-multiple-dataset/tags/tag-2"
        }
      ]
    },
    {
      "type": "RiseArrow",
      "records": [
        {
          "url": "/shared/slope-tool-with-multiple-dataset/annotations/rise-arrow1",
          "name": "rise-arrow1",
          "activity": "/shared/slope-tool-with-multiple-dataset",
          "color": "#cccccc",
          "datadefName": "averageVelocity",
          "p1Tag": "/shared/slope-tool-with-multiple-dataset/tags/tag-1",
          "p2Tag": "/shared/slope-tool-with-multiple-dataset/tags/tag-2"
        }
      ]
    },
    {
      "type": "RunBracket",
      "records": [
        {
          "url": "/shared/slope-tool-with-multiple-dataset/annotations/run-bracket1",
          "name": "run-bracket1",
          "activity": "/shared/slope-tool-with-multiple-dataset",
          "color": "#cccccc",
          "datadefName": "averageVelocity",
          "p1Tag": "/shared/slope-tool-with-multiple-dataset/tags/tag-1",
          "p2Tag": "/shared/slope-tool-with-multiple-dataset/tags/tag-2"
        }
      ]
    },
    {
      "type": "RiseBracket",
      "records": [
        {
          "url": "/shared/slope-tool-with-multiple-dataset/annotations/rise-bracket1",
          "name": "rise-bracket1",
          "activity": "/shared/slope-tool-with-multiple-dataset",
          "color": "#cccccc",
          "datadefName": "averageVelocity",
          "p1Tag": "/shared/slope-tool-with-multiple-dataset/tags/tag-1",
          "p2Tag": "/shared/slope-tool-with-multiple-dataset/tags/tag-2"
        }
      ]
    },
    {
      "type": "LineThroughPoints",
      "records": [
        {
          "url": "/shared/slope-tool-with-multiple-dataset/annotations/line-throughpoints1",
          "name": "line-throughpoints1",
          "activity": "/shared/slope-tool-with-multiple-dataset",
          "color": "#1f77b4",
          "datadefName": "averageVelocity",
          "p1Tag": "/shared/slope-tool-with-multiple-dataset/tags/tag-1",
          "p2Tag": "/shared/slope-tool-with-multiple-dataset/tags/tag-2"
        }
      ]
    }
  ],
  "variables": [],
  "units": [
    {
      "url": "/shared/slope-tool-with-multiple-dataset/units/meters",
      "activity": "/shared/slope-tool-with-multiple-dataset",
      "name": "meter",
      "abbreviation": "m",
      "pluralName": "meters"
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/units/minutes",
      "activity": "/shared/slope-tool-with-multiple-dataset",
      "name": "minute",
      "abbreviation": "m",
      "pluralName": "minutes"
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/units/meters per second",
      "activity": "/shared/slope-tool-with-multiple-dataset",
      "name": "meters per second",
      "abbreviation": "m/s",
      "pluralName": "meters per second"
    },
    {
      "url": "/shared/slope-tool-with-multiple-dataset/units/seconds",
      "activity": "/shared/slope-tool-with-multiple-dataset",
      "name": "second",
      "abbreviation": "s",
      "pluralName": "seconds"
    }
  ]
}
