define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/start_group_command',
  'text!templates/commands/start_group.html'
  ], function($, _, Backbone, BaseCommandView, startGroupTemplate){
  StartGroup = BaseCommandView.extend({
    id:'start-group-modal',
    template: _.template(underi18n.template(startGroupTemplate, msgFactory)),
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'group_update_end');
    }
    
  });
  return StartGroup;
});