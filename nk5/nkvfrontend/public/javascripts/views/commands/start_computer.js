define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/base_command',
  'text!templates/commands/start_computer.html'
  ], function($, _, Backbone, BaseCommandView, startComputerTemplate){
  StartComputer = BaseCommandView.extend({
    id:'start-computer-modal',
    template: _.template(underi18n.template(startComputerTemplate, msgFactory)),
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'start');
    }
    
  });
  return StartComputer;
});