define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/power_on_group_message_command',
  'text!templates/commands/group_power_on.html'
  ], function($, _, Backbone, PowerCommandView, powerMessageTemplate){
  PowerSendMessage = PowerCommandView.extend({
    id:'send-command-modal',
    template: _.template(underi18n.template(powerMessageTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'group_poweron');
    }
    
  });
  return PowerSendMessage;
});