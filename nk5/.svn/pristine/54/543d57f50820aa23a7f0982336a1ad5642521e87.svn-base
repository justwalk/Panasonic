define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/base_command',
  'text!templates/commands/logout.html'
  ], function($, _, Backbone, BaseCommandView, logoutTemplate){
  Logout = BaseCommandView.extend({
    id:'logout-modal',
    template: _.template(underi18n.template(logoutTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'logout');
    }
    
  });
  return Logout;
});