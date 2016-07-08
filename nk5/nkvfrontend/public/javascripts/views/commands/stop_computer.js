define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/base_stop_command',
  'text!templates/commands/stop_computer.html'
  ], function($, _, Backbone, BaseCommandView, stopComputerTemplate){
  StopComputer = BaseCommandView.extend({
    id:'stop-computer-modal',
    template: _.template(underi18n.template(stopComputerTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'stop');
    }
    
  });
  return StopComputer;
});