
Smartgraphs.AboutPane = SC.View.extend({
  classNames:   "aboutBox                                                                                                                                                                                                                                                                                                                                                                                                                                                          " .w(),

  projectInfo:  "This software is based upon work supported by the "+
                "National Science Foundation under Grant No. DRL-0918522. "+
                "Any opinions, findings, conclusions, or recommendations "+
                "expressed in this material are those of the author(s) "+
                "and do not necessarily reflect the views of the National "+
                "Science Foundation. The software is copyrighted by "+
                "<a target='_blank' href='http://www.concord.org/software-license'>"+
                "the Concord Consortium under the GNU Lesser General Public License</a>, "+
                "which allows you to use and to distribute this software. " ,
  
    authorInfo: "The SmartGraphs team at the Concord Consortium. ",

  activityInfo: "The activity is available under the Creative Commons "+
                "<a target='_blank' href='http://creativecommons.org/licenses/by-sa/3.0/'>"+
                "Attribution-Share Alike 3.0 Unported license</a>, "+
                "which allows you to use and to distribute this activity.",

  render: function(context, firstTime) {
    context.push(
      "<table>",
        "<tr>",
          "<td><image src='", sc_static('images/concord.png'), "'/></td>",
          "<td><h2>SmartGraphs</h2><h3>A Project of the Concord Consortium</h3></td>",
        "</tr>",
        "<tr>",
          "<td><image src='", sc_static('images/nsf.png'), "'/></td>",
          "<td>", this.get('projectInfo'), "</td>",
        "</tr>",
        "<tr>",
          "<td><image src='", sc_static('images/smartgraphs.png'), "'/></td>",
          "<td><h3>This SmartGraphs activity was developed by:</h3>", this.get('authorInfo'), this.get('activityInfo'), "</td>",
        "</tr>",
      "</table>"
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
    designHash['activityInfo'] = aboutText;
  }

  var ret = SC.PanelPane.create({
    layout: { right: 30, left: 30, centerY: 0, height: 400},
    contentView: Smartgraphs.AboutPane.design(designHash)
  });

  var show = ret.append() ; // make visible.
  return show ;
};

