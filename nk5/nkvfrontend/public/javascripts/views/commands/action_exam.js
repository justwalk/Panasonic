define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/base_command',
  'text!templates/commands/action_exam.html',
  'text!templates/menus/menu_list_update_mode.html'
  ], function($, _, Backbone, BaseCommandView, updateModeTemplate, menusUpdateModeTemplate){
  ActionExamView = BaseCommandView.extend({
    id:'action_exam-modal',
    template: _.template(underi18n.template(updateModeTemplate, msgFactory)),
    menuTemplate:  _.template(underi18n.template(menusUpdateModeTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'action_exam');
      this.groupView = this.options.groupView;
      this.computersView = this.options.computersView;

     
      this.model.on('change:menu_pack_id',function(m,value){
      var a= $('input[name="menu_pack_id"]:checked ').parent().text();
            if(a.indexOf("Storage")>0){
              $("#normal").css("display","none");
              $("#acitve").css("display","none");
              $("#normalmode").css("display","none");
              $("#continue").css("display","none");
              $("#manage").css("display","none");
            }else if(a.indexOf("Smart")>0){
              $("#normal").css("display","none");
              $("#acitve").css("display","none");
              $("#normalmode").css("display","block");
              $("#continue").css("display","block");
              $("#manage").css("display","block");
            }else{
              $("#normal").css("display","block");
              $("#acitve").css("display","block");
              $("#normalmode").css("display","block");
              $("#continue").css("display","block");
              $("#manage").css("display","none");
            }
          });
      // this.bindings['update_wait_time'] = '[name=update_wait_time]';
    },
    
    updateTypeChanged: function(direction, value) {
      return value=='automatic';
    },

    saveModel: function(e) {
      e.preventDefault();
      var self = this;
      var computer = self.computers[0];
      this.model.set('time', $('#time').val()+":00");
      var command = '';
      var confirmStatus =$("input[name='confirmStatus']:checked").val();
      if(confirmStatus){
        command += confirmStatus+"|";
      }else{
        command += 1+"|";
      }
      var confirmShutdown =$("input[name='confirmShutdown']:checked").val();
      if(confirmShutdown){
        command += confirmShutdown+"|";
      }else{
        command += 1+"|";
      }
      var forceShutdown =$("input[name='forceShutdown']:checked").val();
      if(forceShutdown){
        command += forceShutdown+"|";
      }else{
        command += 1+"|";
      }
      var diskShutdown =$("input[name='diskShutdown']:checked").val();
      if(diskShutdown){
        command += diskShutdown+"|";
      }else{
        command += 1+"|";
      }
      var second = $('#after_start').val();
      command += second;
      this.model.set('command',command);
      if (this.model.isValid) {
        this.model.save({computer_uuid:this.computers[0].id,computer_name:this.computers[0].get('name')}, {
          success: function(model, response) {
              self.$el.modal('hide');
          }
        });
      }
      return false;
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
  return ActionExamView;
});