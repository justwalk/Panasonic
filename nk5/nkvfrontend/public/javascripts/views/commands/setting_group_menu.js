define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/commands/settings_group_menu.html',
  'models/computer',
  'modelBinder',
  'collection/menus'
], function($, _, Backbone, SettingsGroupMenuTemplate, Computer, ModelBinder, MenuCollection){
  var SettingsGroupMenuView= Backbone.View.extend({
    id:'settings-group-menu-modal',
    className: 'modal fade',
    template: _.template(underi18n.template(SettingsGroupMenuTemplate, msgFactory)),
    
    events:{
      'click .btn-primary ': 'saveModel',
      // 'hidden' : 'remove', //the 'hidden' event is from bootstrap modal dismiss
      // 'click .computer-form .checkbox': 'checkboxChangedConverter'
    },
    _modelBinder: undefined,
    initialize: function(options) {
      var self = this;
        this.model=new Computer;
      this.groups = this.options.groups;
      
      this._modelBinder = new Backbone.ModelBinder();
      // var index;
      
      var menus = '<option value="0">'+ App.msgFactory('None') +'</option>';
      var menuCollection = this.options.defaultMenu;
      
       
      this.menuCollectionNew=new MenuCollection(menuCollection);
        //menuCollectionNew.fetchWithComputerId(this.model.get('id'));
        this.menuCollectionNew.forEach( function (menu) {
            menus += '<option value="' + menu.get('id') + '">' + menu.get('name') + '</option>';
        });
  
      this.menus = menus;

      _.bindAll(this);
      
      this.model.set('name', this.groups.get('name'));
      this.model.set('groupId', this.groups.get('id'));
    },
    
    checkboxChangedConverter: function(){
        var self = this;
        //Display Boot Menu
        var enableMenuOf=$('input[name=enable_menu]',self.el);
        //Disable All USB
        var usbDevicesOf=$('input[name=disable_usb_devices]',self.el);
        //Support Windows Domain
        var adOf=$('input[name=ad]',self.el);
        //Enable Image Synchroniz
        var ldcSyncOf=$('input[name=ldc_sync]',self.el);

        if(enableMenuOf.is(':checked')){
          $('#bootmenu_timeout',self.el).attr('disabled','disabled');
        }else{
          $('#bootmenu_timeout',self.el).attr('disabled',null);
        }

        if(usbDevicesOf.is(':checked')){
          $('input[name=disable_usb_storage]',self.el).attr('disabled','disabled');
        }else{
          $('input[name=disable_usb_storage]',self.el).attr('disabled',null);
        }

        if(adOf.is(':checked')){
          $('input[name=domainPath]',self.el).attr('disabled','disabled');
        }else{
          $('input[name=domainPath]',self.el).attr('disabled',null);
        }

        if(ldcSyncOf.is(':checked')){
          $('input[name=disk_cache_sync_speed]',self.el).attr('disabled','disabled');
        }else{
          $('input[name=disk_cache_sync_speed]',self.el).attr('disabled',null);
        }

      },
    
    setupMultipleEdit: function() {
      var self = this;
      _(self.disabledAttributes).forEach(function(attribute) {
        $('[name="'+attribute+'"]', self.el).attr('disabled', 'disabled');
      });
    },

    saveModel: function(e) {
       //xiongpanan add start 2016/4/13
       var ja = underi18n.MessageFactory(locale);
      var self = this;
      var id=$("#groupId").val();
      var menus= $("#default_menu",self.el).val();
    
      var menustxt;
      this.menuCollectionNew.forEach(function(menu){
          if(menu.get("id")==menus){
            menustxt=menu.get("name");
          }
       });
      var checkval=$('#wrap input[name="operation"]:checked',self.el).val();
    if(menus!="0"){
            if(checkval=="Add"){
               var computer_id_list=[];
                socket.emit('computers:read', {group_id:id}, function(err, data) {

                    for (var i = 0; i < data.length; i++) {
                        var a;
                       a=data[i]["id"];     
                      computer_id_list.push(a);

                    }; 
                    var computer;
                    var  presence=true;
                    var alertval=0;
                    for (var i = 0; i < computer_id_list.length; i++) {
                     computer=computer_id_list[i];
                   
                      socket.emit('menus:read', {computer_id:computer}, function(err, data,computer_id) {
                          
                          if(data.length>0){
                            for (var j = data.length - 1; j >= 0; j--) {
                            
                                if(data[j]["name"]==menustxt){
                                   presence=false;
                                   break;
                                }
                              };
                              if(presence){
                                   socket.emit('menu:createMenu', {computer_id:computer_id, id:menus, name:menustxt}, function(err, data) {
                                          self.$el.modal('hide');
                                     });
                                }else{
                                  self.$el.modal('hide');
                                }

                          }else{
                           
                             socket.emit('menu:createMenu', {computer_id:computer_id, id:menus, name:menustxt}, function(err, data) {
                                          self.$el.modal('hide');

                                 });
                          }
              
                     });
                    };


                 });
        }else if(checkval=="Delete"){
               var computer_id_list=[];
                socket.emit('computers:read', {group_id:id}, function(err, data) {
                   
                    for (var i = 0; i < data.length; i++) {
                        var a;
                        a=data[i]["id"];     
                        computer_id_list.push(a);

                    }; 

                    for (var i = 0; i < computer_id_list.length; i++) {
                     var computer=computer_id_list[i];
                      socket.emit('menus:read', {computer_id:computer}, function(err, data,computer_id) {
                        var c;
                        var menuId;
                        var  presence=false;
                        var alertval=0;
                          if(data.length>0){
                              for (var j = data.length - 1; j >= 0; j--) {
                                c=data[j]["computer_id"];
                               
                                  if(data[j]["name"]==menustxt){
                                    menuId=data[j]["id"];
                                    presence=true;

                                    break;
                                  }
                                };
                         
                               if(presence){
                                 socket.emit('menu:delete', {computer_id:c, id:menuId}, function(err, data) {
                                            self.$el.modal('hide');

                                       });
                                 
                         }else{
                            self.$el.modal('hide');
                         }
                              
                          }
              
                     });
                    };


                 });
          }else if(checkval=="SetDefaultMenu"){
                var computer_id_list=[];
                socket.emit('computers:read', {group_id:id}, function(err, data) {

                    for (var i = 0; i < data.length; i++) {
                        var a;
                       a=data[i]["id"];     
                      computer_id_list.push(a);

                    }; 

                    for (var i = 0; i < computer_id_list.length; i++) {
                     var computer=computer_id_list[i];
                      socket.emit('menus:read', {computer_id:computer}, function(err, data,computer_id) {
                         var  presence=false;
                         var c;
                         var menuId;
                          var alertval=0;
                          if(data.length>0){
                            for (var j = data.length - 1; j >= 0; j--) {
                              c=data[j]["computer_id"];
                             
                                if(data[j]["name"]==menustxt){
                                  menuId=data[j]["id"];
                                   presence=true;
                                }
                              };
                         if(presence){
                          socket.emit('menu:setDefaultMenu', {computer_id:c, id:menuId}, function(err, data) {
                                      self.$el.modal('hide');
                                 });
                         }else{
                          self.$el.modal('hide');
                         }

                          }
              
                     });
                    };


                 });
          }else{
                alert("Please select the type of operation")
          }
    }else{
       alert(ja("Select menu please."));
    }
        

 //xiongpanan add end 2016/4/13
    },
            
    render: function() {
      this.delegateEvents();
      $(this.el).html(this.template({model:this.model, menus: this.menus, groups: this.groups}));

      this._modelBinder.bind(this.model, this.el);
      if (this.models) {this.setupMultipleEdit();}
      this.checkboxChangedConverter();
      return this;
    }
  });
  return SettingsGroupMenuView;
});
