define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/device_group_message_command',
  'text!templates/commands/group_start_device.html'
  ], function($, _, Backbone, DeviceCommandView, deviceMessageTemplate){
  DeviceSendMessage = DeviceCommandView.extend({
    id:'send-command-modal',
    template: _.template(underi18n.template(deviceMessageTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'group_start_device');
    }
    
  });
  return DeviceSendMessage;
});