define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/start_device_command',
  'text!templates/commands/start-device.html'
  ], function($, _, Backbone, StartDeviceView,  StartDeviceTemplate){
  startDevice = StartDeviceView.extend({
    id:'stop-computer-modal',
    template: _.template(underi18n.template(StartDeviceTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'start_device');
    }
    
  });
  return startDevice;
});