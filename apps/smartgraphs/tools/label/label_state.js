// ==========================================================================
// Project:   Smartgraphs.LABEL_TOOL
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  @extends SC.State
  @version 0.1
*/
Smartgraphs.LABEL_TOOL = SC.State.extend(
/** @scope Smartgraphs.LABEL_TOOL.prototype */ {

  /**
    The name of the label or labelset we care about. Set before entry to LABEL_TOOL state and unset on state exit.
    
    @property {String}
  */
  annotationName: null,
  
  /**
    The label or labelset we are managing. Set during entry to LABEL_TOOL state and unset on state exit.
    
    @property {Smartgraphs.Label|Smartgraphs.LabelSet}
  */
  annotation: null,
  
  initialSubstate: 'DUMMY',

  enterState: function () {
    var annotationName = this.get('annotationName'),
        annotation     = Smartgraphs.labelTool.getAnnotation(annotationName);

    this.set('annotation', annotation);
    
    if (SC.kindOf(annotation, Smartgraphs.Label)) {
      this.gotoState('LABEL_ONE');
    }
    else if (SC.kindOf(annotation, Smartgraphs.LabelSet)) {
      this.gotoState('LABEL_MANY');
    }
  },

  exitState: function () {
    this.get('annotation').disableRemoval();
    this.set('annotation', null);
    this.set('annotationName', null);
  },
  
  // EVENT HANDLERS
  
  mouseDownAtPoint: function (context, args) {
    this.get('statechart').sendAction('addLabel', this, {x: args.x, y: args.y, shouldMarkTargetPoint: YES});
    return YES;
  },
  
  dataPointSelected: function (context, args) {
    this.get('statechart').sendAction('addLabel', this, {x: args.x, y: args.y, shouldMarkTargetPoint: NO});
    return YES;
  },
  
  // SUBSTATES
  
  DUMMY: SC.State.design(),
  
   
  LABEL_ONE: SC.State.design({
    
    initialSubstate: 'NOT_ADDED',
  
    NOT_ADDED: SC.State.design({
    
      enterState: function () {
        Smartgraphs.labelTool.addLabelsStarting(this);
      },
    
      exitState: function () {
        Smartgraphs.labelTool.addLabelsFinished(this);
      },

      addLabel: function (context, args) {
        var label = this.getPath('parentState.parentState.annotation');

        label.set('x', args.x);
        label.set('y', args.y);
        label.set('shouldMarkTargetPoint', args.shouldMarkTargetPoint);
      
        Smartgraphs.labelTool.appendLabel(this, label);
        this.gotoState('ADDED');
        return YES;
      }
    }),
  
    ADDED: SC.State.design({
      
      enterState: function () {
        this.getPath('parentState.parentState.annotation').enableRemoval();
      },
      
      removeLabel: function (context, args) {
        var label = this.getPath('parentState.parentState.annotation');
        
        if (args.label === label) {
          Smartgraphs.labelTool.removeLabel(this, label);
          this.gotoState('NOT_ADDED');
        }
        return YES;
      }
    })
  }),
  
  
  LABEL_MANY: SC.State.design({
    
    enterState: function () {
      var labelSet = this.getPath('parentState.annotation');
      labelSet.enableRemoval();
      Smartgraphs.labelTool.appendLabelSet(this, labelSet);
      Smartgraphs.labelTool.addLabelsStarting(this);
    },
  
    exitState: function () {
      var labelSet = this.getPath('parentState.annotation');      
      labelSet.disableRemoval();
      Smartgraphs.labelTool.addLabelsFinished(this);
    },
    
    addLabel: function (context, args) {
      var labelSet = this.getPath('parentState.annotation'),
          label    = labelSet.createChildLabel();
    
      label.set('x', args.x);
      label.set('y', args.y);
      label.set('shouldMarkTargetPoint', args.shouldMarkTargetPoint);
      return YES;
    },
    
    removeLabel: function (context, args) {
      var labelSet = this.getPath('parentState.annotation');
      labelSet.removeLabel(args.label);
      return YES;
    }
  })  

});