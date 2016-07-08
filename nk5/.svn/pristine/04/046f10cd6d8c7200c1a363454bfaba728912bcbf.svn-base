define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/base_option_setting_computer',
  'text!templates/commands/option_settings_computer_menu.html',
  ], function($, _, Backbone, BaseCommandView, optionSettingsComputerMenuTemplate){
  OptionSettingsComputerMenuView = BaseCommandView.extend({
    id:'update_mode-modal',
    template: _.template(underi18n.template(optionSettingsComputerMenuTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'menu_switch');
      //this.bindings.update_mode = '[name=update_mode]';
      this.groupView = this.options.groupView;
      this.computersView = this.options.computersView;
    },
    
    updateTypeChanged: function(direction, value) {
      return value=='automatic';
    },

    saveModel: function(e) {
      e.preventDefault();
      var self = this;
      
       this.model.set('time', $('#time').val()+":00");
      var menus= $("#default_menu option:selected",self.el).text();
      var menus_id= $("#default_menu option:selected",self.el).val();
      var computer_uuid= $("#computer_uuid",self.el).val();
      var name= $("#name",self.el).val();
     
      if (this.model.isValid) {
        this.model.save({computer_uuid: computer_uuid, computer_name: name,menu_name:menus,menu_pack_id:menus_id}, {
          
          success: function(model, response) {
              self.$el.modal('hide');
           
          }
        });
      }
      return false;
    },
    render: function() {
      this.constructor.__super__.render.apply(this, ['options']);
      return this;
    }
     
      
  });
  return OptionSettingsComputerMenuView;
});