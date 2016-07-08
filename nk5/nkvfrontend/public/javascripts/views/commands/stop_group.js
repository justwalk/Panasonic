define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/base_group_stop_command',
  'text!templates/commands/stop_group.html'
  ], function($, _, Backbone, BaseCommandView, StopGroupTemplate){
  StopGroup = BaseCommandView.extend({
    id:'stop-group-modal',
    template: _.template(underi18n.template(StopGroupTemplate, msgFactory)),
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'group_stop');
    }
    
  });
  return StopGroup;
});