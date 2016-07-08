define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/base_command',
  'text!templates/commands/change_mac.html'
  ], function($, _, Backbone, BaseCommandView, changeMacTemplate){
   ChangeMacView = BaseCommandView.extend({
    template: _.template(underi18n.template(changeMacTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, [options]);
      this.model.set('action', 'change_mac');
      this.bindings.mac = '[name=mac]';
    }
    
  });
  return ChangeMacView;
});