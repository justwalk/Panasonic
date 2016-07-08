define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/base_command',
  'text!templates/commands/send_command.html'
  ], function($, _, Backbone, BaseCommandView, sendCommandTemplate){
  SendCommand = BaseCommandView.extend({
    id:'send-command-modal',
    template: _.template(underi18n.template(sendCommandTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'send_command');
      this.bindings.command    = '[name=command]';
    }
    
  });
  return SendCommand;
});