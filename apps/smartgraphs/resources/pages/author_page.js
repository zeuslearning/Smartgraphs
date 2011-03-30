// ==========================================================================
// Project:   Smartgraphs.authorPage
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('resources/pages/main_page');

// This is a place to hold the authorView until it's appended to the document

Smartgraphs.authorPageDef = SC.Page.extend({

  authorView: SC.View.design({
    childViews: ['instructionsWrapper', 'jsonEditor'],
    
    theme: 'sc-ace',
    
    instructionsWrapper: SC.View.design({
      layout: { left: 0, width: 0.45 },       // need to specify 0.5 rather than '50%'
      childViews: 'instructionsView'.w(),
    
      instructionsView: SC.View.design({
        classNames: 'smartgraph-pane',
        childViews: 'textWrapper'.w(),

        // provide padding and style rules for the intro text and dialog
        textWrapper: SC.View.design({
          layout: {
            top: 20,
            right: 20,
            left: 20
          },

          classNames: 'text-wrapper'.w(),

          childViews: 'introTextView introTextHintView activityStepView'.w(),
          
          // If the introText contents < 100px in height, adjust to this height before inline editing
          minEditorHeight: 100,
          
          // The following just works; enables a hint with a hover style that can be single-clicked to edit.
          introTextView: SC.LabelView.design({
            valueBinding: 'Smartgraphs.activityPageController.introText',
            useStaticLayout: YES,
            escapeHTML: NO,
            isEditable: YES,
            isInlineEditorMultiline: YES,
            minEditorHeightBinding: '.parentView.minEditorHeight',            
            
            showEditor: NO,
            showEditorDidChange: function () {
              if (this.get('showEditor')) this.beginEditing();
            }.observes('showEditor'),
            
            beginEditing: function () {
              if (this.get('frame').height < this.get('minEditorHeight')) {
                SC.RunLoop.begin();
                this.adjust('height', this.get('minEditorHeight'));
                SC.RunLoop.end();
              }
              sc_super();
            },
            
            inlineEditorDidEndEditing: function () {
              sc_super();
              this.set('showEditor', NO);
              this.set('layout', {});            // be sure to unset any explicit height we may have set!
            },
            
            mouseEntered: function () {
              if (this.get('frame').height < this.get('minEditorHeight')) {
                this.adjust('height', this.get('minEditorHeight'));
              }
              this.$().addClass('hovered');     
            },
            
            mouseExited: function () {
              this.$().removeClass('hovered');
              this.set('layout', {});
            },
            
            mouseDown: function () {
              this.beginEditing();
            }
          }),//introTextView
          
          introTextHintView: SC.LabelView.design({
            value: "<p>Introduce Page Here...</p>",
            classNames: 'hint'.w(),
            escapeHTML: NO,

            showEditorBinding: SC.Binding.oneWay('.parentView.introTextView.showEditor'),
            introTextIsEmptyBinding: SC.Binding.not('Smartgraphs.activityPageController.introText'),
            isVisible: function () {
              return this.get('introTextIsEmpty') && !this.get('showEditor');
            }.property('introTextIsEmpty', 'showEditor').cacheable(),

            minEditorHeightBinding: '.parentView.minEditorHeight',
            
            didUpdateLayer: function () {
              this.invokeLast(function () {
                this.set('originalHeight', this.$('p').outerHeight(true));
                this.adjust('height', this.get('originalHeight'));
              });
            },
            
            mouseDown: function () {
              this.adjust('height', this.get('originalHeight'));                
              this.setPath('parentView.introTextView.showEditor', YES);
            },
            
            mouseEntered: function () {
              this.adjust('height', this.get('minEditorHeight'));
              this.$().addClass('hovered');
            },
            
            mouseExited: function () {
              this.$().removeClass('hovered');
              this.adjust('height', this.get('originalHeight'));
            }
          }),// introTextHintView
          
          activityStepView: SC.View.design({          
            useStaticLayout: YES,
            
            isVisibleBinding: 'Smartgraphs.activityStepController.dialogTextHasContent',

            childViews: 'beforeTextView afterTextView'.w(),
            classNames: 'dialog-text'.w(),

            beforeTextView: SC.StaticContentView.design({
              contentBinding: 'Smartgraphs.activityStepController.beforeText',
              isVisibleBinding: SC.Binding.bool('Smartgraphs.activityStepController.beforeText')
            }),

            afterTextView: SC.StaticContentView.design({
              contentBinding: 'Smartgraphs.activityStepController.afterText',
              isVisibleBinding: SC.Binding.bool('Smartgraphs.activityStepController.afterText')
            })
          }) // activityStepView
        }) // textWrapper
      })
    }),
    
    // ..........................................................
    // RIGHT PANE
    //
    // the right pane shows the data the user is manipulating
    jsonEditor: SC.View.design({
      layout: { right: 0, width: 0.55 },
    
      childViews: 'editorView'.w(),

      editorView: SC.View.design({
        layout: { top: 2, right: 2, bottom: 2, left: 2 },
        
        childViews: 'propertyOwnerMenu propertyOwnerBtn currentPropertyMenu currentPropertyBtn jsonEditorValidationError jsonEditorView'.w(),  //  currentlyEditing currentlyEditingPropertyLabel 
        classNames: 'json-editor smartgraph-pane'.w(),
        
        propertyOwnerBtn: SC.ButtonView.design({
          layout: { top: 15, left: 10, height: 24, width: 200 },
          titleBinding: 'Smartgraphs.activityStepController.currentlyEditingPropertyOwnerLabel',
          mouseDown: function () {
            this.parentView.propertyOwnerMenu.set('isVisible', YES);
            this.parentView.propertyOwnerMenu.popup(this);
          }
        }),
        
        propertyOwnerMenu: SC.MenuPane.design({
          layout: { width: 200, height: 400 },
          isVisible: NO,
          itemsBinding: 'Smartgraphs.activityStepController.jsonEditorMenuItemsOwners',
          selectionDidChange: function () {
            Smartgraphs.activityStepController.set("currentlyEditingPropertyOwnerConfig", this.selectedItem.config);
          }.observes('selectedItem')
        }),
        
        currentPropertyBtn: SC.ButtonView.design({
          layout: { top: 15, left: 220, height: 24, width: 200 },
          titleBinding: 'Smartgraphs.activityStepController.currentlyEditingPropertyName',
          mouseDown: function () {
            this.parentView.currentPropertyMenu.set('isVisible', YES);
            this.parentView.currentPropertyMenu.popup(this);
          }
        }),
        
        currentPropertyMenu: SC.MenuPane.design({
          layout: { width: 200, height: 400 },
          isVisible: NO,
          itemsBinding: 'Smartgraphs.activityStepController.jsonEditorMenuItemsProperties',
          selectionDidChange: function () {
            Smartgraphs.activityStepController.set("currentlyEditingPropertyName", this.selectedItem.title);
          }.observes('selectedItem')
        }),
        
        jsonEditorValidationError: SC.LabelView.design({
          layout: { top: 40, right: 0, bottom: 0, left: 0 },
          classNames: 'json-editor-feedback'.w(),
          value: '&nbsp;',
          escapeHTML: NO,
          showEditor: NO,
          isVisibleBinding: SC.Binding.bool('Smartgraphs.activityStepController.jsonEditingIsInvalid')
        }),

        jsonEditorView: SC.TextFieldView.design({
          layout: { top: 50, right: 10, bottom: 10, left: 10 },
          valueBinding: "Smartgraphs.activityStepController.jsonEditorInput",
          escapeHTML: YES,
          isEditing: YES,
          isTextArea: YES,
          isEditable: YES,
          isInlineEditorMultiline: YES,
          classNames: 'json-editor-code'.w()
        })

      })
    })
  })

});

Smartgraphs.authorPage = Smartgraphs.authorPageDef.design();


