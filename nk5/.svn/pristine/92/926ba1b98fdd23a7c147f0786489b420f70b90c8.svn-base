define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/base_command',
  'text!templates/commands/start_update_computer.html',
  'text!templates/menus/menu_list_update_mode.html'
  ], function($, _, Backbone, BaseCommandView, startUpdateComputerTemplate, menusUpdateModeTemplate){
  StartUpdateComputerView = BaseCommandView.extend({
    id:'update_mode-modal',
    template: _.template(underi18n.template(startUpdateComputerTemplate, msgFactory)),
    menuTemplate:  _.template(underi18n.template(menusUpdateModeTemplate, msgFactory)),
    
    initialize: function() {
      var self=this;
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'start_update');
      this.bindings.update_mode = '[name=update_mode]';
      this.groupView = this.options.groupView;
      this.computersView = this.options.computersView;

      // this.model.on('change:menu_pack_id',function(m,value){
      // var a= $('input[name="menu_pack_id"]:checked ').parent().text();
      //       if(a.indexOf("Storage")>0){
      //         $("#normal").css("display","none");
      //         $("#acitve").css("display","none");
      //         $("#normalmode").css("display","none");
      //         $("#continue").css("display","none");
      //         $("#manage").css("display","none");
      //       }else if(a.indexOf("Smart")>0){
      //         $("#normal").css("display","none");
      //         $("#acitve").css("display","none");
      //         $("#normalmode").css("display","block");
      //         $("#continue").css("display","block");
      //         $("#manage").css("display","block");
      //       }else{
      //         $("#normal").css("display","block");
      //         $("#acitve").css("display","block");
      //         $("#normalmode").css("display","block");
      //         $("#continue").css("display","block");
      //         $("#manage").css("display","none");
      //       }
      //     });
      // this.bindings['update_wait_time'] = '[name=update_wait_time]';
    },
    
    updateTypeChanged: function(direction, value) {
      return value=='automatic';
    },

    saveModel: function(e) {
      e.preventDefault();
       var self = this;
      var ja = underi18n.MessageFactory(locale);
     
      var computer = self.computers[0];
       this.model.set('time', $('#time').val()+":00");
       var update_mode=$('input[name="update_mode"]:checked ').val();
      var menu_pack_id=$('input[name="menu_pack_id"]:checked ').val();
      if(menu_pack_id!=undefined){
         if (this.model.isValid) {
        this.model.save({computer_uuid: this.computers[0].id, computer_name: this.computers[0].get('name'),update_mode:update_mode}, {
          
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
      radioChangedConverter:function(){
          var self = this;
          socket.emit('various_setting:read', {}, function(err, data) {
              if(data["Permit"]==1){
                  $('#normalUpdate',self.el).attr('disabled','disabled');
              }else{
                  $('#normalUpdate',self.el).attr('disabled',null);
              }
          });
      },

    render: function() {
      this.constructor.__super__.render.apply(this, ['options']);
      var self = this;
      this.bindings.menu_pack_id = '[name=menu_pack_id]';
       
      this.computers[0].menus.forEach(function(menu) {
        menu.fetchPacks(function(packs) {
          $('#menus-table', self.el).append(self.menuTemplate({menu:menu,model:self.model}));
          self._modelBinder.bind(self.model, self.el, self.bindings);
        });
      });
        self.radioChangedConverter();
      return this;
    }
     
      
  });
  return StartUpdateComputerView;
});