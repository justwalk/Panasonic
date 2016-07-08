define([
  'jquery',
  'underscore',
  'backbone',
  'models/edit_menu',
  'text!templates/users/edit_user_menu.html',
  'modelBinder'
    ], function($, _, Backbone, Settings, settingsTemplate, ModelBinder) {
    
      ServerSettingsView = Backbone.View. extend({
        id: 'server-settings-modal',
        className: 'modal fade modal-lg ',
        model: Settings,
        template: _.template(underi18n.template(settingsTemplate, msgFactory)),

        events: {
          'submit form': 'updateModel',
          'click .close': 'closeModal',
          'change .page': 'changePage'
        },

        initialize: function(user) { 
          this.model=new Settings;
          this.menuArray=[]
          var self=this;
          this.user=user;
          this.model.fetch({data: { id: user.get('id')} ,success: function(data){
            var menu={}
              for(var i in data.get('usermemus')){
                self.menuArray.push(data.get('usermemus')[i].menuid);
                  menu[data.get('usermemus')[i].menuid]=true;
              }
              self.$el.html(self.template({model:data.get('menus'),menu:menu}));
              self._modelBinder = new Backbone.ModelBinder();
          }});
        
        },

        render: function() {
          return this;
        },

        updateModel: function(ev) {
          var self =this;
           self.closeModal();
          ev.preventDefault(); 
          var data=$('#edit-menus-form', self.el).serializeArray();
          var saveArray=[];
          for(var i in data){
              saveArray.push(parseInt(data[i].name));
          }
          var addUserMenu=_.difference(saveArray, this.menuArray);//添加
          var removeUserMenu=_.difference(this.menuArray, saveArray)//删除
          if(addUserMenu.length>0||removeUserMenu.length>0){ 
            socket.emit('editmenus:update',{add:addUserMenu,remove:removeUserMenu,id:this.user.get('id')}, function(err, log) {
              self.closeModal();
            })
          }
          
          return false;
        },

        closeModal: function() {
          this.$el.modal('hide');
        }
        ,changePage:function(ev){
          var pageId=$(ev.currentTarget).attr('name');
          var checked=$(ev.currentTarget).is(':checked');
          var name='';
          for(var i in this.model.toJSON().menus){
            if(pageId == this.model.get('menus')[i].superior){
              $('input[name="'+this.model.get('menus')[i].id+'"]').attr("checked",checked);
            }
            if(pageId == this.model.get('menus')[i].id){
              name=this.model.get('menus')[i].name;
            }
          }
          if(checked){
            $('#mena-'+name).collapse('show');
           }else{
            $('#mena-'+name).collapse('hide');
           }
         
        },
         serializeJSON:function(ev){
         var obj = {};
            var count = 0;
            $.each(ev.serializeArray(), function (i, o) {
                var n = o.name, v = o.value;
                count++;
                obj[n] = obj[n] === undefined ? v
                : $.isArray(obj[n]) ? obj[n].concat(v)
                : [obj[n], v];
            });
            return obj;
      }
      });

      return ServerSettingsView;
    });
