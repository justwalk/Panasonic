define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/power_off_command',
  'text!templates/commands/restart_action.html'
  ], function($, _, Backbone, PowerOffView, PowerOffTemplate){
  powerOff = PowerOffView.extend({
    id:'stop-computer-modal',
    template: _.template(underi18n.template(PowerOffTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'restart_action');
    }
    
  });
  return powerOff;
});