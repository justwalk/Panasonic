define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/commands/settings_computer_menu.html',
  'models/computer',
  'modelBinder',
  'collection/menus'
], function($, _, Backbone, SettingsComputerMenuTemplate, Computer, ModelBinder, MenuCollection){
  var SettingsComputerMenuView= Backbone.View.extend({
    id:'settings-computer-menu-modal',
    className: 'modal fade',
    template: _.template(underi18n.template(SettingsComputerMenuTemplate, msgFactory)),
    
    events:{
      'click .btn-primary ': 'saveModel',
      // 'hidden' : 'remove', //the 'hidden' event is from bootstrap modal dismiss
      // 'click .computer-form .checkbox': 'checkboxChangedConverter'
    },
    _modelBinder: undefined,
    initialize: function(options) {
      this.model=new Computer;
      var self = this;
      this.computers = this.options.computers;
var name = '';
    var computer_uuid = '';
    if(this.computers.length == 1){
      name += this.computers[0].get('name');
      computer_uuid += this.computers[0].id;
    }else{
    this.computers.forEach(function(computer) {
      name += computer.get('name') + " | ";
      computer_uuid += computer.id + "|";
      });
    name = name.substring(0,name.lastIndexOf('|'));
    computer_uuid = computer_uuid.substring(0,computer_uuid.lastIndexOf('|'));
    }

     
      this._modelBinder = new Backbone.ModelBinder();
      var menus = '<option value="0">'+ App.msgFactory('None') +'</option>';
      var menuCollection = this.options.defaultMenu;
     
        this.menuCollectionNew=new MenuCollection(menuCollection);
        //menuCollectionNew.fetchWithComputerId(this.model.get('id'));
        this.menuCollectionNew.forEach( function (menu) {
            menus += '<option value="' + menu.get('id') + '">' + menu.get('name') + '</option>';
        });
     
      this.menus = menus;
      _.bindAll(this);
    
        this.model.set('name', name);
         this.model.set('computer', computer_uuid);
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

      //xiongpanan add start 2016/4/12
      var ja = underi18n.MessageFactory(locale);
      var self = this;
      var id=$("#computer",self.el).val();
      var menus= $("#default_menu",self.el).val();
      var menustxt='';
     
      this.menuCollectionNew.forEach(function(menu){
        if(menu.get("id")==menus){
          menustxt=menu.get("name");
        }
       });

        var index=id.indexOf("|");
              var computerId=[];
        if(index>=0){
          computerId=id.split("|");
          
        }else{
          computerId.push(id);
        }

      var checkval=$('#wrap input[name="operation"]:checked',self.el).val();
      if(menus!="0"){
         if(checkval=="Add"){
           
              var cid;
            for (var i = 0; i < computerId.length; i++) {
                  cid=computerId[i];
                  socket.emit('menus:read', {computer_id:cid}, function(err, data,computer_id) {
                    var  presence=true;
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
          
        }else if(checkval=="Delete"){
       
          for (var i = 0; i < computerId.length; i++) {
          var cid=computerId[i];
            socket.emit('menus:read', {computer_id:cid}, function(err, data,computer_id) {
                var menuId;
               var  presence=false;
                if(data.length>0){
                  for (var j = data.length - 1; j >= 0; j--) {
                      if(data[j]["name"]==menustxt){
                       menuId=data[j]["id"];
                        presence=true;
                        break;
                      }
                    };
                    if(presence){
                      socket.emit('menu:delete', {computer_id:computer_id, id:menuId}, function(err, data) {
                         
                          self.$el.modal('hide');

                     });
                    }
                   
              }
           });

          };
        
        
      }else if(checkval=="SetDefaultMenu"){
   
          for (var i = 0; i < computerId.length; i++) {
                var cid=computerId[i];
  
                 socket.emit('menus:read', {computer_id:cid}, function(err, data,computer_id) {
                            var menuId;
                             var  presence=false;
                            if(data.length>0){
                              for (var j = data.length - 1; j >= 0; j--) {
                                  if(data[j]["name"]==menustxt){
                                   menuId=data[j]["id"];
                                    presence=true;
                                    break;
                                  }
                                };
                                if(presence){
                                   socket.emit('menu:setDefaultMenu', {computer_id:computer_id, id:menuId}, function(err, data) {
                                  
                                      self.$el.modal('hide');

                                 });
                                }
                              
                          }
                       });
          };
        
      }else{
          alert("Please select the type of operation")
        }
      }else{
        alert(ja("Select menu please."));
      }

     
 //xiongpanan add end 2016/4/12
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
  return SettingsComputerMenuView;
});
