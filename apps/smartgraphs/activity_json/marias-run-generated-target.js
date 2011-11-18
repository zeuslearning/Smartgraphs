(function() {
  /*
  type: Activity
  name: Maria’s Run
  pages:
  - type: Page
   name: Introduction
   text: in this activity....
  - type: Page
   name: Where did she stop
   text: look at the graph...
  */  Smartgraphs.activityDocs || (Smartgraphs.activityDocs = {});
  Smartgraphs.activityDocs["/shared/marias-run"] = {
    _id: "marias-run-generated-target.df6",
    _rev: 1,
    data_format_version: 6,
    activity: {
      title: "Maria's Run",
      url: "/shared/marias-run",
      owner: "shared",
      pages: ["/shared/marias-run/page/introduction", "/shared/marias-run/page/where-did-she-stop"]
    },
    pages: [
      {
        name: "Introduction",
        url: "/shared/marias-run/page/introduction",
        activity: "/shared/marias-run",
        index: 1,
        introText: "in this activity....",
        steps: ["/shared/marias-run/page/introduction/step/1"],
        firstStep: "/shared/marias-run/page/introduction/step/1"
      }, {
        name: "Where did she stop",
        url: "/shared/marias-run/page/where-did-she-stop",
        activity: "/shared/marias-run",
        index: 2,
        introText: "look at the graph...",
        steps: ["/shared/marias-run/page/where-did-she-stop/step/1"],
        firstStep: "/shared/marias-run/page/where-did-she-stop/step/1"
      }
    ],
    steps: [
      {
        url: "/shared/marias-run/page/introduction/step/1",
        activityPage: "/shared/marias-run/page/introduction",
        paneConfig: "single",
        panes: null,
        isFinalStep: true,
        nextButtonShouldSubmit: true
      }, {
        url: "/shared/marias-run/page/where-did-she-stop/step/1",
        activityPage: "/shared/marias-run/page/where-did-she-stop",
        paneConfig: "single",
        panes: null,
        isFinalStep: true,
        nextButtonShouldSubmit: true
      }
    ],
    responseTemplates: [],
    axes: [],
    datadefs: [],
    tags: [],
    annotations: [],
    variables: [],
    units: []
  };
}).call(this);