
Smartgraphs.AboutPane = SC.View.extend({
  classNames:   "aboutBox".w(),

  projectInfo:  "This software is based upon work supported by the "+
                "National Science Foundation under Grant No. DRL-0918522. "+
                "Any opinions, findings, conclusions, or recommendations "+
                "expressed in this material are those of the author(s) "+
                "and do not necessarily reflect the views of the National "+
                "Science Foundation. The software is copyrighted by "+
                "the <a target='_blank' href='http://www.concord.org/software-license' "+
                "title='The Concord Consortium Software License'>"+
                "Concord Consortium under the GNU Lesser General Public License</a>, "+
                "which allows you to use and to distribute this software. ",
    
    authorInfo: "The SmartGraphs team at the Concord Consortium. ",

  licenseInfo: "The activity is available under the Creative Commons "+
                "<a target='_blank' href='http://creativecommons.org/licenses/by-sa/3.0/' title='Creative Commons Attribution-ShareAlike 3.0 Unported License'>"+
                "Attribution-Share Alike 3.0 Unported license</a>, "+
                "which allows you to use and to distribute this activity.",

  render: function(context, firstTime) {
    context.push(
      "<div id='about-container'>",
        "<h2>SmartGraphs is a project of The Concord Consortium</h2>",
        "<div id='about-logos'>",
        "  <img id='about-sg-logo' src='", sc_static('smartgraphs.png'), "' alt='SmartGraphs' title='SmartGraphs' />",
        "  <img id='about-cc-logo' src='", sc_static('concord.png'), "'alt='The Concord Consortium' title='The Concord Consortium' />",
        "</div>",
        "<p id='about-projectInfo'>",
          this.get('projectInfo'),
        "</p>",
        "<hr />",
        "<h2>This SmartGraphs activity was developed by:</h2>",
        "<p id='about-authorInfo'>",
          this.get('authorInfo'),
        "</p>",
        "<p id='about-licenseInfo'>",
          this.get('licenseInfo'),
        "</p>",
      "</div>"
    );
    sc_super();  // render child views &etc.
  }
});

Smartgraphs.AboutPane.show  = function(aboutText) {

  var designHash = {
      layout      : { right: 0, left: 0, top:0, bottom: 0},
      childViews  : 'closeButton'.w(),
      closeButton : SC.ButtonView.design({
          layout    : { centerX: 0, top: 5, height: 24, width: 80 },
          title     : 'close',
          isVisible : YES,
          isEnabled : YES,
          action    : function () { ret.remove(); }
        })
    };

  if (aboutText) {
    designHash['licenseInfo'] = aboutText;
  }

  var ret = SC.PanelPane.create({
    layout: { centerX:0, centerY: 0, height: 450, width: 580},
    contentView: Smartgraphs.AboutPane.design(designHash)
  });

  var show = ret.append() ; // make visible.
  return show ;
};

