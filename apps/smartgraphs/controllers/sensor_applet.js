// ==========================================================================
// Project:   Smartgraphs.sensorAppletController
// Copyright: ©2011 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// =========================================================================
/*globals Smartgraphs */

/** @class

  This is adapted from Aaron Unger's sensorAppletView in the CC framework.

  However, we found that, on *some* computers, instantiating an applet by appending an SC.View that renders to an
  <applet> tag fails mysteriously in IE8. Appending the <applet> tag via jQuery appears to work on those machines, so
  that is what is done here. This may have to do with the fact that <applet> tags really represent "host objects", not
  DOM objects, and apparently-normal access or modification of certain of their properties create problems. jQuery may
  handle this more carefully than SC.View.

  (Sensor applets aren't really a view concern, anyway.)

  @extends SC.Object
*/
Smartgraphs.sensorAppletController = SC.Object.create(
/** @scope Smartgraphs.sensorAppletController.prototype */ {

  appletId:     'sg-applet',
  classNames:   'applet sensor-applet',

  jarUrls:     ['org/concord/sensor-native/sensor-native.jar',
                'org/concord/otrunk/otrunk.jar',
                'org/concord/framework/framework.jar',
                'org/concord/frameworkview/frameworkview.jar',
                'jug/jug/jug.jar',
                'jdom/jdom/jdom.jar',
                'org/concord/sensor/sensor.jar',
                'org/concord/data/data.jar',
                'org/concord/sensor/sensor-applets/sensor-applets.jar'],

  code:         'org.concord.sensor.applet.OTSensorApplet',
  codebase:     '/jnlp',
  resourcePath: '/distance.otml',
  listenerPath: null,

  html: function() {
    return [
     '<applet ',
       'id="',       this.get('appletId'),           '" ',
       'class="',    this.get('classNames'),         '" ',
       'archive="',  this.get('jarUrls').join(', '), '" ',
       'code="',     this.get('code'),               '" ',
       'codebase="', this.get('codebase'),           '" ',
       'width="1px" ',
       'height="1px" ',
       'MAYSCRIPT="true" ',
     '>',
        '<param name="resource" value="',      this.get('resourcePath'), '" />',
        '<param name="listenerPath" value="',  this.get('listenerPath'), '" />',
        '<param name="name" value="',          this.get('appletId'),     '" />',
      '</applet>'
    ].join('');
  }.property(),

	appletInstance: function() {
		return $('#' + this.get('appletId'))[0];
	}.property(),

  sensorState: 'not loaded',
  isAppended: false,

  _sensorAppletTimer: false,

  append: function() {
    $('body').append( this.get('html') );
    this.startSensorAppletInitialization();
    this.set('isAppended', true);
  },

  startSensorAppletInitialization: function() {
    var self = this;
    window.setTimeout(function() { self.initializeSensorInterface(); }, 250);
  },

  initializeSensorInterface: function() {
    var listener       = this.get('listenerPath'),
        appletInstance = this.get('appletInstance'),
        appletReady    = false,
        self           = this;

    // Try to call initSensorInterface, but note
    //  (1) appletInstance may not have initialized yet
    //  (2) 'probing' for initialization via the js idiom:
    //        appletInstance.initSensorInterface && appletInstance.initSensorInterface();
    //      actually throws an error in IE even AFTER appletInstance.initSensorInterface is ready to call, because
    //      IE thinks that it's an error to access a java method as a property instead of calling it.

    try {
      appletReady = appletInstance.initSensorInterface(listener);
    } catch (e) {
      // Do nothing--we'll try again in the next timer interval.
    }

    if (appletReady) {
      if (this._sensorAppletTimer) {
        window.clearInterval(this._sensorAppletTimer);
        this._sensorAppletTimer = false;
      }
      this.set('sensorState', 'ready');
    }
    else {
      if (!this._sensorAppletTimer) {
        this._sensorAppletTimer = window.setInterval(function() { self.initializeSensorInterface(); }, 250);
      }
    }
  },

  start: function() {
    this.set('sensorState', 'running');
    this.get('appletInstance').startCollecting();
  },

  stop: function() {
    this.set('sensorState', 'stopped');
    this.get('appletInstance').stopCollecting();
  },

  reset: function() {
    this.set('sensorState', 'ready');
    this.get('appletInstance').stopCollecting();
  }

});
