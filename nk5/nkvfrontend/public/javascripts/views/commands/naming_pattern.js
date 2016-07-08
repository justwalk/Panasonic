define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/base_command',
  'text!templates/commands/naming_pattern.html'
  ], function($, _, Backbone, BaseCommandView, namingPatternTemplate){
  NamingPatternView = BaseCommandView.extend({
    template: _.template(underi18n.template(namingPatternTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, [options]);
      this.model.set('action', 'naming_pattern');
      this.bindings.prefix  = '[name=prefix]';
      this.bindings.size  = '[name=size]';
      this.bindings.start_number  = '[name=start_number]';
    }
    
  });
  return NamingPatternView;
});