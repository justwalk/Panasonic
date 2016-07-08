define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/base_command',
  'text!templates/commands/test_update_mode.html'
  ], function($, _, Backbone, BaseCommandView, testUpdateModeTemplate){
  TestUpdateModeView = BaseCommandView.extend({
    template: _.template(underi18n.template(testUpdateModeTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, [options]);
      this.model.set('action', 'test_update_mode');
    },
    saveModel: function(e) {
      e.preventDefault();
      var self = this;
      if (this.model.isValid) {
        //console.log('menu_pack_id', this.model.get('menu_pack_id'))
        this.model.save({computer_uuid: this.computers.id, computer_name: this.computers.get('name')}, {
        success: function(model, response) {
          //console.log(response)
          self.$el.modal('hide');
        }
        });
      }
      return false;
    }
    
  });
  return TestUpdateModeView;
});