define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/power_on_command',
  'text!templates/commands/power_on.html'
  ], function($, _, Backbone, PowerOnView, PowerOnTemplate){
  powerOn = PowerOnView.extend({
    id:'stop-computer-modal',
    template: _.template(underi18n.template(PowerOnTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'poweron');
    }
    
  });
  return powerOn;
});