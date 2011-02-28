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
    Smartgraphs.sessionController.beginSession();

    var pages = Smartgraphs.activityController.get('pages');
    Smartgraphs.activityPagesController.set('content', pages);
    Smartgraphs.activityPagesController.selectFirstPage();    

    Smartgraphs.appWindowController.showActivityView();
  },

  exitState: function () {
    Smartgraphs.activityController.cleanup();
    Smartgraphs.sessionController.endSession();
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
    points through which to draw the line.
    
    The LineThroughPoints is not automatically added to a graph.
    
    This method does nothing if there is no dataset with the passed name
    
    @param context
    @param args
    
    @param {String} args.firstPoint
      The name of one HighlightedPoint annotation.
    @param {String} args.secondPoint
      The name of the other HighlightedPoint annotation.      
    @param {String} args.lineName
      The name given to the LineThroughPoints annotation which will be created.
    @param {String} args.color
      The RGB color definition for the color to render the line.
  */
  createLineThroughPoints: function (context, args) {
    var p1 = Smartgraphs.activityObjectsController.findAnnotation(args.firstPoint).get('point');
    var p2 = Smartgraphs.activityObjectsController.findAnnotation(args.secondPoint).get('point');   
    var color = args.color || "#000000";
    
    // set points (a relation) using ids rather than objects, because createAnnotation works like createRecord
    // in that regard (it works on the datahash underlying the record)
    var lineThroughPoints = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.LineThroughPoints, args.lineName, { 
        point1: p1.get('id'),
        point2: p2.get('id'),
        color: color
      });
    return YES;
  },

  /** 
    Create an Arrow annotation with the name arrowName in the current session. Takes two HighlightedPoints as the
    defining points; the arrow will run from the height (y-value) of the first point vertically to the second
    point.
    
    The Arrow is not automatically added to a graph.
    
    @param context
    @param args
    
    @param {String} args.firstPoint
      The name of one HighlightedPoint annotation.
    @param {String} args.secondPoint
      The name of the other HighlightedPoint annotation.      
    @param {String} args.arrowName
      The name given to the session-scoped Arrow annotation which will be created.
    @param {String} [args.color='#000000']
      The RGB color definition for the color to render the line.
    @param {String} [args.label]
      Optional label for the arrow
    @param {String} [args.isHighlighted=false]
      Whether the arrow should be highlighted      
  */
  createRiseArrow: function (context, args) {
    var p1 = Smartgraphs.activityObjectsController.findAnnotation(args.firstPoint).get('point');
    var p2 = Smartgraphs.activityObjectsController.findAnnotation(args.secondPoint).get('point');    
    var color = args.color || "#000000";
    
    // Reorder the points such that the first point is the leftmost one, i.e. the lower x-value   
    var points = p1.get('x') < p2.get('x') ? [p1, p2] : [p2, p1];
  
    var riseArrow = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.Arrow, args.arrowName, { 
        point1: points[0].get('id'),
        point2: points[1].get('id'),
        color: color,
        isVertical: YES,
        isClockwise: YES,
        isHighlighted: args.isHighlighted || NO,
        label: args.label
      });
    return YES;
  },

  /** 
    Create an Arrow annotation with the name arrowName in the current session. Takes two HighlightedPoints as the
    defining points; the arrow will run from the first point horizontally to the x-value of the second
    point.
    
    The Arrow is not automatically added to a graph.
    
    @param context
    @param args
    
    @param {String} args.firstPoint
      The name of one HighlightedPoint annotation.
    @param {String} args.secondPoint
      The name of the other HighlightedPoint annotation.      
    @param {String} args.arrowName
      The name given to the session-scoped Arrow annotation which will be created.
    @param {String} [args.color='#000000']
      The RGB color definition for the color to render the line.
    @param {String} [args.label]
      Optional label for the arrow
    @param {String} [args.isHighlighted=false]
      Whether the arrow should be highlighted          
  */
  createRunArrow: function (context, args) {
    var p1 = Smartgraphs.activityObjectsController.findAnnotation(args.firstPoint).get('point');
    var p2 = Smartgraphs.activityObjectsController.findAnnotation(args.secondPoint).get('point');    
    var color = args.color || "#000000";
    
    // Reorder the points such that the first point is the leftmost one, i.e. the lower x-value   
    var points = p1.get('x') < p2.get('x') ? [p1, p2] : [p2, p1];
    
    var runArrow = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.Arrow, args.arrowName, { 
        point1: points[0].get('id'),
        point2: points[1].get('id'),
        color: color,
        isHorizontal: YES,
        isClockwise: YES,
        isHighlighted: args.isHighlighted || NO,        
        label: args.label
      });
    return YES;
  },
  
  /** 
    Create an IndicatingArrow Annotation with the name arrowName in the current session, pointing
    at a specific dataPoint.
    
    @param context
    @param args
    
    @param {String} args.arrowName
      The name for this annotation
    @param {Smartgraphs.DataPoint} args.point
      The data point the arrow will indicate.
    @param {String} [args.color='#cc0000']
      The color of the arrow.
    @param {Number} [args.angle=335]
    
  */
  createIndicatingArrowFromDataPoint: function (context, args) {
    // TODO
    
    // var indicator = 
    //   Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.IndicatingArrow, args.arrowName, {
    //     dataPoint: args.point.get('id'),
    //     pointAngle: args.angle,
    //     color: args.color
    //   });
    // return YES;
  },
  
  /** 
    Create an IndicatingArrow Annotation with the name arrowName in the current session, pointing
    at a specific HighlightedPoint.
    
    @param context
    @param args
    
    @param {String} args.arrowName
      The name for this annotation
    @param {String} args.point
      The name of the HighlightedPoint annotation the arrow will indicate
    @param {String} [args.color='#cc0000']
      The color of the arrow.
    @param {Number} [args.angle=335]
    
  */
  createIndicatingArrowFromHighlightedPoint: function (context, args) {
    var hp = Smartgraphs.activityObjectsController.findAnnotation(args.point);
    var indicator = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.IndicatingArrow, args.arrowName, {
        annotation: hp.get('id'),
        pointAngle: args.angle || 335,
        color: args.color || '#cc0000',
        length: args.length || 40
      });
    return YES;
  },
  
  /** 
    Create an IndicatingArrow Annotation with the name arrowName in the current session, pointing
    at a specific set of coordinates.
    
    @param context
    @param args
    
    @param {String} args.arrowName
      The name for this annotation
    @param {Number} args.x
      The x-coordinate of the point being indicated
    @param {Number} args.y
      The y-coordinate of the point being indicated
    @param {String} [args.color='#cc0000']
      The color of the arrow.
    @param {Number} [args.angle=335]
    @param {Number} [args.length=40]
    
  */
  createIndicatingArrowFromCoordinates: function (context, args) {
    var indicator = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.IndicatingArrow, args.arrowName, {
        specificX: args.x,
        specificY: args.y,
        pointAngle: args.angle || 335,
        color: args.color || '#cc0000',
        length: args.length || 40
      });
    return YES;
  },
  
  /**
    Create a BracketArc Annotation with the name bracketName in the current session, pointing at two
    specific points defined by coordinates.
    
    @param context
    @param args
    
    @param {String} args.bracketName
      The name for this annotation
    @param {Number} args.startX
      The x-coordinate of the starting point of the arc
    @param {Number} args.startY
      The y-coordinate of the starting point of the arc
    @param {Number} args.endX
      The x-coordinate of the ending point of the arc
    @param {Number} args.endY
      The y-coordinate of the ending point of the arc
    @param {String} [args.color='#cc0000']
      The color in which the arc should be rendered.
  */
  createBracketArcFromCoordinates: function (context, args) {
    var arc = 
      Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.BracketArc, args.bracketName, {
        startX: args.startX,
        startY: args.startY,
        endX: args.endX,
        endY: args.endY,
        color: args.color || '#cc0000',
        isClockwise: false
      });
    return YES;
  },
  
  /** 
    Creates a BracketArc annotation intended to sit to the right of the data table and indicate the 
    gap between the Y coordinates of two HighlightedPoints, i.e. the "rise" of the slope between 
    those two points.
    
    @param context
    @param args
    
    @param {String} args.bracketName
      The name for this annotation
    @param {String} args.point1
      The name of the HighlightedPoint where the arc should start.
    @param {String} args.point2
      The name of the HighlightedPoint where the arc should end.
    @param {String} [args.color='#cc0000']
      The color in which the arc should be rendered.
    @param {String} [args.label]
      Optional label for the bracket
    @param {String} [args.isHighlighted=false]
      Whether the bracket should be highlighted
  */
  createRiseBracket: function (context, args) {
    var hp1 = Smartgraphs.activityObjectsController.findAnnotation(args.point1),
        hp2 = Smartgraphs.activityObjectsController.findAnnotation(args.point2),
        p1 = hp1.get('point'),
        p2 = hp2.get('point'),
        dataset = p1.get('dataset'),
        points = dataset.get('points'),
        p1Index = points.indexOf(p1),
        p2Index = points.indexOf(p2);
    
    // dataset.points is automatically sorted by x-value. Therefore the rise arrow always goes from lower to higher index.
        
    if (p1.get('dataset') !== p2.get('dataset')) return YES;

    Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.BracketArc, args.bracketName, {
      item1Index: Math.min(p1Index, p2Index),
      item2Index: Math.max(p1Index, p2Index),
      isLeftOfColumn: NO,
      color: args.color || '#cc0000',
      isHighlighted: args.isHighlighted || NO,
      label: args.label
    });
    
    return YES;
  },
  
  /** 
    Creates a BracketArc annotation intended to sit to the left of the data table and indicate the 
    gap between the X coordinates of two HighlightedPoints, i.e. the "run" of the slope between 
    those two points.
    
    @param context
    @param args
    
    @param {String} args.bracketName
      The name for this annotation
    @param {String} args.point1
      The name of the HighlightedPoint where the arc should start.
    @param {String} args.point2
      The name of the HighlightedPoint where the arc should end.
    @param {String} [args.color='#cc0000']
      The color in which the arc should be rendered.
    @param {String} [args.label]
      Optional label for the bracket
    @param {String} [args.isHighlighted=false]
      Whether the arrow should be highlighted           
  */
  createRunBracket: function (context, args) {
    var hp1 = Smartgraphs.activityObjectsController.findAnnotation(args.point1),
        hp2 = Smartgraphs.activityObjectsController.findAnnotation(args.point2),
        p1 = hp1.get('point'),
        p2 = hp2.get('point'),
        dataset = p1.get('dataset'),
        points = dataset.get('points'),
        p1Index = points.indexOf(p1),
        p2Index = points.indexOf(p2);

    if (p1.get('dataset') !== p2.get('dataset')) return YES;

    Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.BracketArc, args.bracketName, {
      item1Index: Math.min(p1Index, p2Index),
      item2Index: Math.max(p1Index, p2Index),
      isLeftOfColumn: YES,
      color: args.color || '#cc0000',
      isHighlighted: args.isHighlighted || NO,
      label: args.label
    });

    return YES;
  },
  
  /**
    Given a point and a label string, create a LabelAnnotation for that point.
  
  @param context
  @param args
  
  @param {String} args.labelName
    The name for this annotation
  @param {String} args.point
    The point we're annotating. This could be provided as an actual Smartgraphs.DataPoint, a 
    Smartgraphs.Annotation type which has a "point" attribute (which is therefore a Smartgraphs.DataPoint),
    or the guid (url) of a Smartgraphs.DataPoint.
  @param {String} args.label
    The actual text of the label we're putting on the point.
  @param {String} [args.color='#000000']
    The color in which the arc should be rendered.
  @param {Number} [args.xOffset=0]
    How far the center of the label should be offset to the left or right of the point being labeled, in pixels.
    Negative numbers move the label to the left; positive numbers move the label to the right.
  @param {Number} [args.yOffset=-15]
    How far the center of the label should be offset vertically from the point being labeled, in pixels.
    Negative numbers move the label up, positive numbers move the label down. The default is -15, or fifteen
    pixels above the point.
  @param {Number} [args.size=15]
    The "point size" of the label type.
  */
  createLabelAnnotation: function (context, args) {
    var point;
    if (args.point.length) {
      // It's a string, is it a GUID?
      point = Smartgraphs.store.find(Smartgraphs.DataPoint, args.point);
    }
    else if (args.point.kindOf(Smartgraphs.DataPoint)) { 
      // It's a DataPoint
      point = args.point;
    }
    else if (args.point.kindOf(Smartgraphs.Annotation) && args.point.get('point')) { 
      // It's an Annotation which has a 'point' attribute we can use
      point = args.point.get('point');
    }
    if (point.kindOf(Smartgraphs.DataPoint) !== undefined) { // We should have a DataPoint by now
      // Generate the annotation
      var label =
        Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.LabelAnnotation, args.labelName, {
          point: point.get('id'),
          label: args.label,
          color: args.color ? args.color : "#000000",
          xOffset: args.xOffset ? args.xOffset : 0,
          yOffset: args.yOffset ? args.yOffset : -15,
          size: args.size ? args.size : 15
        });
      if (!label.kindOf(Smartgraphs.LabelAnnotation)) {
        // This error means the controller method to create the annotation failed.
        console.log("Creation of the LabelAnnotation may not have worked properly.");
      }
    }
    else {
      // This error means the duck-typing of the args.point argument failed.
      console.log("Couldn't figure out which DataPoint to associate with the annotation.");
    }
    // This always returns YES, but if there are problems they should be in the console log.
    return YES;
  },
  
  /**
    For the named annotation, toggle the isHighlighted property. (If truthy, set to false; if falsy, set to true.)
    
    @param context
    @param args
    
    @param {String} args.annotationName
      The name of the Annotation whose isHighlighted property will be toggled.
  */
  toggleAnnotationHighlight: function (context, args) {
    var annotation = Smartgraphs.activityObjectsController.findAnnotation(args.annotationName);
    annotation.toggleProperty('isHighlighted');
    return YES;
  },
  
  /**
    Set attributes (other than 'name'!) of an attribute
    
    @param context
    @param args
  
    @param {String} args.name
      The name of the Annotation whose properties will be modified
  */
  setAnnotationAttribute: function (context, args) {
    var annotation = Smartgraphs.activityObjectsController.findAnnotation(args.name);
    if (!annotation) return YES;

    for (var prop in args) {
      if (!args.hasOwnProperty(prop) || prop === 'name') continue;
      annotation.set(prop, args[prop]);
    }
  },
  
  /**
    Set a session-scoped Variable to the value of a specific expression.
    
    @param context
    @param args
    
    @param {String} args.name
      The name of the variable to be set.
    @param {String} args.expression
      The value of the variable, expressed as an expression that can be evaluated by Smartgraphs.evaluator.evaluate()
  */
  setVariable: function (context, args) {
    var val;
    if (args.name && args.expression) {
      // new code path; don't remove these checks   
      if (SC.none(args.name)) {
        throw("variable name is required");
      }
      if (SC.none(args.expression)) {
        throw("variable value is required");
      }

      val = Smartgraphs.evaluator.evaluate(args.expression);
      Smartgraphs.activityObjectsController.setVariable(args.name, val); 
      return YES;
    }
    // old code path
   
    var variableName = args.variableName;
    var inspectorType = args.inspectorType;
    var config = args.config;

    if (SC.none(variableName)) {
      throw("variableName is required");
    }
    if (SC.none(inspectorType)) {
      throw("inspectorType is required");
    }
    if (SC.none(config)) {
      throw("config is required");
    }
    
    var inspector = this.makeInspector(inspectorType, config);
    if (inspector) {
      var newValue = inspector.inspect();
      Smartgraphs.activityObjectsController.setVariable(variableName, newValue); 
      return YES;
    }

    return YES; 
  },
  
  // remove when remove 'old code path' above
  makeInspector: function (inspectorType, inspectorConfig) {
    if (!inspectorType) {
      return NO;
    }
    
    var klass = SC.objectForPropertyPath(inspectorType);
        
    if (!klass || !klass.isClass || !SC.kindOf(klass, Smartgraphs.Inspector)) {
      throw "makeInspector was given an non-empty, but invalid, Inspector class name";
    }
    
    return klass.create({
      config: inspectorConfig
    });
  }

}) ;
