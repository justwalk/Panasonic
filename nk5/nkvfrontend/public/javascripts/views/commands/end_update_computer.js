define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/base_command',
  'text!templates/commands/end_update_computer.html',
  'text!templates/menus/menu_list_save_update_mode.html'
  ], function($, _, Backbone, BaseCommandView, endUpdateComputerTemplate, menusUpdateModeTemplate){
 EndUpdateComputerView = BaseCommandView.extend({
    id:'save-update-modal',
    template: _.template(underi18n.template(endUpdateComputerTemplate, msgFactory)),
    menuTemplate:  _.template(underi18n.template(menusUpdateModeTemplate, msgFactory)),
    
   
    initialize: function() {
      var self = this;
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'end_update');
      this.groupView = this.options.groupView;
      this.computersView = this.options.computersView;
     socket.emit('various_setting:read', {}, function(err, data) {
      console.log(data["SaveUpdate"]);
          self.model.set('verbose', data["SaveUpdate"]);
     });
      // this.bindings.update_mode = '[name=update_mode]';
      
    },


   

    saveModel: function(e) {
      e.preventDefault();
      var self = this;
      var ja = underi18n.MessageFactory(locale);
      var computer = this.computers[0];
      this.model.set('time', $('#time').val()+":00");
      var checkval=$("input[type='checkbox']").is(':checked');
      var verbose=$("#verbose",self.el).val();
      var menu_pack_id=$('input[name="menu_pack_id"]:checked ').val();
     if(menu_pack_id!=undefined){
      if (this.model.isValid) {
        this.model.save({computer_uuid: this.computers[0].id, computer_name: this.computers[0].get('name'), snapshot_comment: verbose, checkval:checkval}, {
        success: function(model, response) {
          self.$el.modal('hide');
          setTimeout(function(){
                computer.fetch({ data: {computer_id: computer.get('id')} ,success: function(data) {
                  computer.set('attributes', data.get('attributes'));
                  computer.trigger('rerender');
                }
              });
            },10000);
        }
        });
      }
      return false;
    }else{
      alert(ja("Please select Disk."));
    }
      
    },
   
    render: function() {
      this.constructor.__super__.render.apply(this, ['options']);
      var self = this;
      this.bindings.menu_pack_id = '[name=menu_pack_id]';
      
      this.computers[0].menus.forEach(function(menu) {
        menu.fetchPacks(function(packs) {
          $('#menus-table', self.el).append(self.menuTemplate({menu:menu}));
          self._modelBinder.bind(self.model, self.el, self.bindings);

        });
      });
      return this;
    }
    
  });
  return EndUpdateComputerView;
});