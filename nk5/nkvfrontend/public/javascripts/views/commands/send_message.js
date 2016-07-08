define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/base_message_command',
  'text!templates/commands/send_message.html'
  ], function($, _, Backbone, BaseCommandView, sendMessageTemplate){
  SendMessage = BaseCommandView.extend({
    id:'send-command-modal',
    template: _.template(underi18n.template(sendMessageTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'send_message');
    }
    
  });
  return SendMessage;
});