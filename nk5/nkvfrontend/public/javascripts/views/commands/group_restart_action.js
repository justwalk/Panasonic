define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/power_group_message_command',
  'text!templates/commands/group_restart_action.html'
  ], function($, _, Backbone, PowerCommandView, powerMessageTemplate){
  PowerSendMessage = PowerCommandView.extend({
    id:'send-command-modal',
    template: _.template(underi18n.template(powerMessageTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'group_restart_action');
    }
    
  });
  return PowerSendMessage;
});