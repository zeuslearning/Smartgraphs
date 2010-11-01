// ==========================================================================
// Project:   Smartgraphs.GraphController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
Smartgraphs.GraphController = SC.ObjectController.extend(SC.Responder, 
/** @scope Smartgraphs.graphController.prototype */ {
  
  /**
    The datasets being shown on this graph.
  */
  datasetList: null,
  
  /**
    The (static) annotations being shown on this graph.
  */
  annotationList: null,

  /**
    Mouse events are pushed onto this array when we are in freehand input mode.
  */
  eventQueue: [],
  
  // private: whether to route mouse events to the eventQueue
  _routeEvents: NO,
  
  /**
    The set of dataset mark colors.
    Taken from Protovis 'category10': http://vis.stanford.edu/protovis/docs/color.html
  */
  colors: [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
  ],
  
  clear: function () {
    // remove this controller from the controllerForName hash
    var currentGraphName = this.get('name');
    if (currentGraphName) {
      Smartgraphs.GraphController.controllerForName.set(currentGraphName, null);
    }
    
    this.set('datasetList', []);
    this.set('annotationList', []);
    this.set('content', null);
  },
  
  openGraph: function (name) {
    var currentGraphName = this.get('name');
    if (name === currentGraphName) return YES;    // nothing to do!

    var activity = Smartgraphs.activityController.get('content');
    var query = activity ?
      SC.Query.local(Smartgraphs.Graph, 'name={name} AND activity={activity}', { 
        name: name,
        activity: Smartgraphs.activityController.get('content')
      }) 
      :
      SC.Query.local(Smartgraphs.Graph, 'name={name}', {      // e.g., in testing mode
        name: name
      });
    
    var graphs = Smartgraphs.store.find(query);
    if (graphs.get('length') < 1) return NO;
    
    this.clear();
    
    if (currentGraphName) {
      Smartgraphs.GraphController.controllerForName.set(currentGraphName, null);
    }
    this.set('content', graphs.objectAt(0));      // it would be strange if there are >1
    Smartgraphs.GraphController.controllerForName.set(name, this);
    
    // add the initial dataset and annotations
    var initial = this.get('initialDatasets') || [];
    for (var i = 0, len = initial.get('length'); i < len; i++) {
      this.addObjectByName(Smartgraphs.Dataset, initial.objectAt(i));
    }
    
    initial = this.get('initialAnnotations') || [];
    var annotation;
    for (i = 0, len = initial.get('length'); i < len; i++) {
      annotation = initial.objectAt(i);
      // FIXME we probably just want to have a session-scoped list of all annotation names mapped to types
      // so the type can be assumed from the name
      this.addObjectByName(SC.objectForPropertyPath(annotation.type), annotation.name);
    }
  },
  
  /**
    Tries to find the object (dataset or annotation, based on 'objectType') with name 'objectName' in the current
    session and adds that object to the list of datasets or annotations associated with this graph. (This will
    cause the dataset or annotation to be show in the corresponding graph view.)
    
    If the object is not found in the current session, then tries to find and add an example dataset/annotation with 
    the given name. (TODO: should copy the example to the session so further manipulation doesn't affect the example
    object.)
    
    ("Example" datasets and annotations are canonical data or annotations created by the author of the activity
    rather than the user of the activity.)
    
    This is the canonical way to add an object given its name. (Once it finds the object, it adds it using
    the addDataset/addAnnotation methods.)
  */
  addObjectByName: function (objectType, objectName) {
    // first try to get the named dataset from the current session
    var query = SC.Query.local(objectType, 'name={name} AND session={session}', { 
      name: objectName,
      session: Smartgraphs.sessionController.getPath('content')
    });
    var objectList = Smartgraphs.store.find(query);
    
    if (objectList.get('length') < 1) {
      // get an example dataset if that's what has this name
      query = SC.Query.local(objectType, 'name={name} AND isExample=YES', { 
        name: objectName
      });
      objectList = Smartgraphs.store.find(query);
      if (objectList.get('length') < 1) return NO;
      
      // FIXME copy the object to the session before using it!
    }
  
    var object = objectList.objectAt(0);
    if (objectType === Smartgraphs.Dataset) {
      this.addDataset(object);
      return YES;
    }
    if (object.get('isAnnotation')) {
      this.addAnnotation(object);
    }
  },

  addDataset: function (dataset) {
    if (this.findDatasetByName(dataset.get('name'))) {
      return;      // don't add the dataset if it is already in the graph!
    }
    
    // get a color for the dataset
    dataset.set('color', this.getColorForDataset(dataset));
    
    this.get('datasetList').pushObject(dataset);
  },

  /**
    Remove the named dataset from the graph.
  */
  removeDataset: function (name) {
    var datasetList = this.get('datasetList');
    var dataset = this.findDatasetByName(name);
    if (dataset) datasetList.removeObject(dataset);
  },
  
  addAnnotation: function (annotation) {
    if (this.findAnnotationByName(annotation.get('name'))) {
      return;
    }
    this.get('annotationList').pushObject(annotation);
  },
  
  /**
    Remove the named annotation from the graph.
  */
  removeAnnotation: function (name) {
    var annotationList = this.get('annotationList');
    var annotation = this.findAnnotationByName(name);
    if (annotation) annotationList.removeObject(annotation);
  },
  
  findDatasetByName: function (name) {
    return this.findObjectByNameIn(name, this.get('datasetList'));
  },
  
  findAnnotationByName: function (name) {
    return this.findObjectByNameIn(name, this.get('annotationList'));
  },
  
  findObjectByNameIn: function (name, list) {
    var names = list.getEach('name');
    var idx = names.indexOf(name);
    return (idx >= 0) ? list.objectAt(idx) : null;
  },
  
  /**
    a simple implementation for now...  Later, we can use color names, handle default colors a little more
    carefully, maybe cycle through colors if we have > 10 datasets on a graph (which we would ... why?)
  */
  getColorForDataset: function (dataset) {
    var defaultColor = dataset.get('defaultColor');
    var used = this.get('datasetList').getEach('color');
  
    if (defaultColor && !used.contains(defaultColor)) {
      return defaultColor;
    }
    
    var colors = this.get('colors');
    
    for (var i = 0, len = colors.get('length'); i < len; i++) {
      if ( !used.contains(colors.objectAt(i)) ) return colors.objectAt(i);
    }
    
    // just default to the first color if none available
    return colors.objectAt(0);
  },

  inputAreaMouseDown: function (x, y) {
    if (this._routeEvents) {
      this._eventQueue.pushObject({
        x: x,
        y: y,
        type: Smartgraphs.freehandInputController.START
      });
    }
  },
  
  inputAreaMouseDragged: function (x, y) {
    if (this._routeEvents) {
      this._eventQueue.pushObject({
        x: x,
        y: y,
        type: Smartgraphs.freehandInputController.CONTINUE
      });
    }
  },
  
  inputAreaMouseUp: function (x, y) {
    if (this._routeEvents) {
      this._eventQueue.pushObject({
        x: x,
        y: y,
        type: Smartgraphs.freehandInputController.END
      });
    }
  },
  
  startFreehandInput: function () {
    this._routeEvents = YES;
    this._eventQueue = [];
    this.set('eventQueue', this._eventQueue);
  },
  
  endFreehandInput: function () {   
    this._routeEvents = NO;
  }

  // NOT CURRENTLY USED:
  
  // setAxes: function (axesId) {
  //   var axes = Smartgraphs.store.find(Smartgraphs.Axes, axesId);
  //   if (!axes) {
  //     axes = Smartgraphs.store.createRecord(Smartgraphs.Axes, { guid: axesId });
  //   }
  //   
  //   this.set('axes', axes);
  // },
  // 
  // selectDataset: function (datasetName) {
  //   var dataset = this.findDatasetByName(datasetName);
  //   if (dataset) this.set('selectedDataset', dataset);
  // }
  
}) ;

Smartgraphs.GraphController.controllerForName = SC.Object.create({});
