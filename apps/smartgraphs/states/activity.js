// ==========================================================================
// Project:   Smartgraphs.ACTIVITY
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */


/** @class

  Superstate representing that the application is running an Activity.

  @extends SC.State
  @version 0.1
*/

Smartgraphs.ACTIVITY = SC.State.extend(
  /** @scope Smartgraphs.ACTIVITY.prototype */ {
  
  initialSubstate: 'ACTIVITY_PAGE_START',
  
  enterState: function() {
    Smartgraphs.appWindowController.showActivityView();
  },

  exitState: function () {
    Smartgraphs.activityController.cleanup();
  },
  
  
  ACTIVITY_PAGE_START: SC.State.design({
    enterState: function () {
      Smartgraphs.activityStepController.set('content', Smartgraphs.activityPageController.get('firstStep'));
      this.gotoState('ACTIVITY_STEP');
    }
  }),
  
  
  ACTIVITY_STEP: SC.State.plugin('Smartgraphs.ACTIVITY_STEP'),
  
  
  ACTIVITY_STEP_SUBMITTED: SC.State.plugin('Smartgraphs.ACTIVITY_STEP_SUBMITTED'),
  
  
  ACTIVITY_PAGE_DONE: SC.State.design({
    
    enterState: function() {    
      if (Smartgraphs.activityPagesController.get('isLastPage')) {
        this.gotoState('ACTIVITY_DONE');
      }
      else {
        Smartgraphs.activityController.set('canGotoNextPage', YES);
      }
    },

    exitState: function() {
      Smartgraphs.activityController.set('canGotoNextPage', NO);
      Smartgraphs.activityPageController.cleanup();
    },

    gotoNextPage: function () {
      Smartgraphs.activityPagesController.selectNextPage();
      this.gotoState('ACTIVITY_PAGE_START');
    }
  }),


  // ..........................................................
  // ACTIONS
  //
  
  /**
    Open author's view of the currently running activity.
  */
  openAuthorView: function () {
    this.gotoState('AUTHOR');
    return YES;
  },
  
  /**
    Executes if openActivity action is sent within the ACTIVITY state. Instructs the LOADING_ACTIVITY state to switch
    back to the ACTIVITY state (rather than AUTHOR) when the new activity is loaded. Returns NO so that the main
    openActivity handler (defined in the READY state) is also called, thereby actually loading the activity.
  */
  openActivity: function () {
    Smartgraphs.loadingActivityController.set('openAuthorViewAfterLoading', NO);
    return NO;    // let READY handle the rest.
  },
  
  /** 
    Create a LineThroughPoints with the name lineName in the current session. Takes two HighlightedPoints as the 
    points through which to draw the line
    
    The LineThroughPoints is not automatically added to the graph.
    
    This method does nothing if there is no dataset with the passed name, or if it is not open in the graph
    with graphName.
    
    @param context
    @param args
    
    @param {String} args.graphName
      The name of the graph on which the dataset with the line must be displayed. This graph must be open in 
      the page when this command executes.
    @param {String} args.firstPoint
      The name of one HighlightedPoint annotation.
    @param {String} args.secondPoint
      The name of the other HighlightedPoint annotation.      
    @param {String} args.lineName
      The name given to the session-scoped LineThroughPoints annotation which will be created.
    @param {String} args.color
      The RGB color definition for the color to render the line.
  */
  createLineThroughPoints: function (context, args) {
    // TODO: This dependence on the controller is probably not useful long-term.
    // given the graphName, find the associated graph controller
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
  
    if (!controller) return YES;
    
    var firstAnnotation = controller.findAnnotationByName(args.firstPoint);
    var secondAnnotation = controller.findAnnotationByName(args.secondPoint);
    var color = args.color ? args.color : "#000000";
    
    // set points (a relation) using ids rather than objects, because createAnnotation works like createRecord
    // in that regard (it works on the datahash underlying the record)
    var lineThroughPoints = 
      Smartgraphs.sessionController.createAnnotation(Smartgraphs.LineThroughPoints, args.lineName, { 
        point1: firstAnnotation.get('point').get('id'),
        point2: secondAnnotation.get('point').get('id'),
        color: color
      });
    return YES;
  },

  /** 
    Create an Arrow annotation with the name arrowName in the current session. Takes two HighlightedPoints as the
    defining points; the arrow will run from the height (y-value) of the first point vertically to the second
    point.
    
    The Arrow is not automatically added to the graph.
    
    This method does nothing if there is no graph with the passed name.
    
    @param context
    @param args
    
    @param {String} args.graphName
      The name of the graph on which the dataset with the line must be displayed. This graph must be open in 
      the page when this command executes.
    @param {String} args.firstPoint
      The name of one HighlightedPoint annotation.
    @param {String} args.secondPoint
      The name of the other HighlightedPoint annotation.      
    @param {String} args.arrowName
      The name given to the session-scoped Arrow annotation which will be created.
    @param {String} [args.color='#000000']
      The RGB color definition for the color to render the line.
  */
  createRiseArrow: function (context, args) {
    // TODO: This dependence on the controller is probably not useful long-term.
    // given the graphName, find the associated graph controller
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
  
    if (!controller) return YES;
    
    var firstAnnotationPoint = controller.findAnnotationByName(args.firstPoint).get('point');
    var secondAnnotationPoint = controller.findAnnotationByName(args.secondPoint).get('point');
    // Default to black
    var color = args.color ? args.color : "#000000";
    // Reorder the points such that the first point is the leftmost one, i.e. the lower x-value
    var points;
    if (firstAnnotationPoint.get('x') < secondAnnotationPoint.get('x')) {
      points = [firstAnnotationPoint.get('id'), secondAnnotationPoint.get('id')];
    }
    else {
      points = [secondAnnotationPoint.get('id'), firstAnnotationPoint.get('id')];
    }
    
    var riseArrow = 
      Smartgraphs.sessionController.createAnnotation(Smartgraphs.Arrow, args.arrowName, { 
        point1: points[0],
        point2: points[1],
        color: color,
        isVertical: YES,
        isClockwise: YES
      });
    return YES;
  },

  /** 
    Create an Arrow annotation with the name arrowName in the current session. Takes two HighlightedPoints as the
    defining points; the arrow will run from the first point horizontally to the x-value of the second
    point.
    
    The Arrow is not automatically added to the graph.
    
    This method does nothing if there is no graph with the passed name.
    
    @param context
    @param args
    
    @param {String} args.graphName
      The name of the graph on which the dataset with the line must be displayed. This graph must be open in 
      the page when this command executes.
    @param {String} args.firstPoint
      The name of one HighlightedPoint annotation.
    @param {String} args.secondPoint
      The name of the other HighlightedPoint annotation.      
    @param {String} args.arrowName
      The name given to the session-scoped Arrow annotation which will be created.
    @param {String} [args.color='#000000']
      The RGB color definition for the color to render the line.
  */
  createRunArrow: function (context, args) {
    // TODO: This dependence on the controller is probably not useful long-term.
    // given the graphName, find the associated graph controller
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];
  
    if (!controller) return YES;
    
    var firstAnnotationPoint = controller.findAnnotationByName(args.firstPoint).get('point');
    var secondAnnotationPoint = controller.findAnnotationByName(args.secondPoint).get('point');
    // default to black
    var color = args.color ? args.color : "#000000";
    // Reorder the points such that the first point is the leftmost one, i.e. the lower x-value
    var points;
    if (firstAnnotationPoint.get('x') < secondAnnotationPoint.get('x')) {
      points = [firstAnnotationPoint.get('id'), secondAnnotationPoint.get('id')];
    }
    else {
      points = [secondAnnotationPoint.get('id'), firstAnnotationPoint.get('id')];
    }
    
    var runArrow = 
      Smartgraphs.sessionController.createAnnotation(Smartgraphs.Arrow, args.arrowName, { 
        point1: points[0],
        point2: points[1],
        color: color,
        isHorizontal: YES,
        isClockwise: YES
      });
    return YES;
  },
  
  /**
    For the named annotation, toggle the isHighlighted property. (If truthy, set to false; if falsy, set to true.)
    
    @param context
    @param args
    
    @param {String} args.graphName
      The name of the graph where the Annotation is displayed. 
    @param {String} args.annotationName
      The name of the Annotation whose isHighlighted property will be toggled.
  */
  toggleAnnotationHighlight: function (context, args) {
    // TODO: Unfortunately, we need the graphName to find the right controller. And we need the
    // controller to find the annotation by name.
    var controller = Smartgraphs.GraphController.controllerForName[args.graphName];

    if (!controller) return YES;
    
    var annotation = controller.findAnnotationByName(args.annotationName);
    if (annotation.get('isHighlighted')) {
      annotation.set('isHighlighted', NO);
    }
    else {
      annotation.set('isHighlighted', YES);
    }
    return YES;
  }

}) ;
