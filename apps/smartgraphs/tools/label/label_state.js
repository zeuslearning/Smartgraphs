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
    Whether to mark this tool on data point.

    @property {Boolean}
  */

  markOnDataPoints: false,

  /**
    Name of the dataset associated with this tool.

    @property {Boolean}
  */
  datadefName: null,
  /**
    The label or labelset we are managing. Set during entry to LABEL_TOOL state and unset on state exit.

    @property {Smartgraphs.Label|Smartgraphs.LabelSet}
  */
  annotation: null,

  initialSubstate: 'OFF',

  OFF: SC.State.design({
    labelToolStartTool: function (context, args) {
      var parentState = this.get('parentState');
      parentState.set('annotationName', args.annotationName);
      parentState.set('markOnDataPoints', args.markOnDataPoints);
      parentState.set('datadefName', args.datadefName);

      this.gotoState(parentState.get('name') + '.ON');
    }
  }),

  ON: SC.State.design({
    toolRoot: SC.outlet('parentState'),
    initialSubstate: 'START',

    stopTool: function () {
      var parentState = this.get('parentState');
      this.gotoState(parentState.get('name') + '.OFF');
    },

    enterState: function () {
      var parentState    = this.get('parentState'),
          annotationName = parentState.get('annotationName'),
          annotation     = Smartgraphs.labelTool.getAnnotation(annotationName);

      parentState.set('annotation', annotation);
    },

    exitState: function () {
      var parentState = this.get('parentState');

      parentState.get('annotation').disableRemoval();
      parentState.set('annotation', null);
      parentState.set('annotationName', null);
    },

    // EVENT HANDLERS

    mouseDownAtPoint: function (context, args) {
      if (!this.parentState.markOnDataPoints) {
        this.get('statechart').sendAction('addLabel', this, {x: args.x, y: args.y, shouldMarkTargetPoint: YES});
      }
      else {
        var toolName = Smartgraphs.taggingTool.state;
        var taggingTool = Smartgraphs.statechart.getState(toolName);
        var datadefName = this.getPath('toolRoot.datadefName');
        var dataRepresentation = context.getDataRepresentation(datadefName);
        var point = dataRepresentation.getNearestPoint(args);
        if (point !== null) {
          this.get('statechart').sendAction('addLabel', this, {x: point.x, y: point.y, shouldMarkTargetPoint: NO});
        }
      }
      return YES;
    },

    dataPointSelected: function (context, args) {
      this.get('statechart').sendAction('addLabel', this, {x: args.x, y: args.y, shouldMarkTargetPoint: NO});
      return YES;
    },

    // SUBSTATES

    START: SC.State.design({
      toolRoot: SC.outlet('parentState.toolRoot'),
      enterState: function () {
        var annotation = this.getPath('toolRoot.annotation');

        if (SC.kindOf(annotation, Smartgraphs.Label)) {
          this.gotoState('LABEL_ONE');
        }
        else if (SC.kindOf(annotation, Smartgraphs.LabelSet)) {
          this.gotoState('LABEL_MANY');
        }
      }
    }),

    LABEL_ONE: SC.State.design({
      toolRoot: SC.outlet('parentState.toolRoot'),
      initialSubstate: 'NOT_ADDED',

      NOT_ADDED: SC.State.design({
        toolRoot: SC.outlet('parentState.toolRoot'),
        enterState: function () {
          Smartgraphs.labelTool.addLabelsStarting(this);
        },

        exitState: function () {
          Smartgraphs.labelTool.addLabelsFinished(this);
        },

        addLabel: function (context, args) {
          var label = this.getPath('toolRoot.annotation');

          label.set('x', args.x);
          label.set('y', args.y);
          label.set('shouldMarkTargetPoint', args.shouldMarkTargetPoint);
          label.set('createdByLabelTool', YES);

          Smartgraphs.labelTool.appendLabel(this, label);
          this.gotoState('ADDED');
          return YES;
        }
      }),

      ADDED: SC.State.design({
        toolRoot: SC.outlet('parentState.toolRoot'),
        enterState: function () {
          var label = this.getPath('toolRoot.annotation');
          label.enableRemoval();
          label.set('isEditable', YES);
        },
        exitState: function () {
          this.getPath('toolRoot.annotation').set('isEditable', NO);
        },
        dataPointSelected: function (context, args) {
          if (!Smartgraphs.taggingTool.tagName) {
            return;
          }
          if (this.getPath('toolRoot.markOnDataPoints') === true) {
            var label = this.getPath('toolRoot.annotation');
            var labelTextView = label.view.labelTextView();
            if (labelTextView.get('isEditing')) {
              labelTextView.commitEditing();
            }
            label.set('x', args.x);
            label.set('y', args.y);
          }
        },
        mouseDownAtPoint: function (context, args) {
          if (!Smartgraphs.taggingTool.tagName) {
            return;
          }
          var label = this.getPath('toolRoot.annotation');
          var labelTextView = label.view.labelTextView();
          if (labelTextView.get('isEditing')) {
            labelTextView.commitEditing();
          }
          var toolName = Smartgraphs.taggingTool.state;
          var taggingTool = Smartgraphs.statechart.getState(toolName);
          var datadefName = this.getPath('toolRoot.datadefName');
          var dataRepresentation = context.getDataRepresentation(datadefName);
          var point = dataRepresentation.getNearestPoint(args);
          if (point) {
            label.set('x', point.x);
            label.set('y', point.y);
          }
        },
        removeLabel: function (context, args) {
          var label = this.getPath('toolRoot.annotation');

          if (args.label === label) {
            Smartgraphs.labelTool.removeLabel(this, label);
            this.gotoState('NOT_ADDED');
          }
          return YES;
        }
      })
    }),

    LABEL_MANY: SC.State.design({
      toolRoot: SC.outlet('parentState.toolRoot'),
      enterState: function () {
        var labelSet = this.getPath('toolRoot.annotation');
        labelSet.enableRemoval();
        Smartgraphs.labelTool.appendLabelSet(this, labelSet);
        Smartgraphs.labelTool.addLabelsStarting(this);
      },

      exitState: function () {
        var labelSet = this.getPath('toolRoot.annotation');
        labelSet.disableRemoval();
        Smartgraphs.labelTool.addLabelsFinished(this);
      },

      addLabel: function (context, args) {
        var labelSet = this.getPath('toolRoot.annotation');

        var label = labelSet.createChildLabel();
        label.set('x', args.x);
        label.set('y', args.y);
        label.set('createdByLabelTool', YES);
        label.set('shouldMarkTargetPoint', args.shouldMarkTargetPoint);
        label.set('isEditable', YES);

        return YES;
      },

      removeLabel: function (context, args) {
        var labelSet = this.getPath('toolRoot.annotation');

        labelSet.removeLabel(args.label);
        return YES;
      }
    })
  })
});
