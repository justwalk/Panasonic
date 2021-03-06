define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/computers/computer_form_templete.html',
  'models/computer',
  'modelBinder',
  'collection/menus'
], function($, _, Backbone, computerFormTemplateT, Computer, ModelBinder, MenuCollection){
  var ComputerFormView = Backbone.View.extend({
    id:'add-computer-modal',
    className: 'modal fade',
    template: _.template(underi18n.template(computerFormTemplateT, msgFactory)),
    
    events:{
      'submit .computer-form ': 'saveModel',
      'hidden' : 'remove', //the 'hidden' event is from bootstrap modal dismiss
      'click .computer-form .checkbox': 'checkboxChangedConverter'
    },
    _modelBinder: undefined,
    initialize: function(options) {
      var self = this;
      this.model = this.options.model || new Computer();
      this.models = this.options.models;
      this._modelBinder = new Backbone.ModelBinder();
      this.disabledAttributes = ['name', 'mac_address', 'ip'];
      var index;
      var groups = '';
      //     注释
      //this.options.groups.collection.forEach(function(el){
      // groups += '<option value="' + el.get('id') + '">' + el.get('name') + '</option>';
      //});

      this.groups = groups;
      var menus = '<option value="0">'+ App.msgFactory('None') +'</option>';
      //var menuCollection = this.model.menus;
      var menuCollection = this.options.defaultMenu;
      if (this.model.get('id')) {
        var  menuCollectionNew=new MenuCollection(menuCollection);
        menuCollectionNew.fetchWithComputerId(this.model.get('id'));
        menuCollectionNew.forEach( function (menu) {
            menus += '<option value="' + menu.get('id') + '">' + menu.get('name') + '</option>';
        });
      }
      this.menus = menus;
      _.bindAll(this);
    },
    //复选框选择事件
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
        $('#bootmenu_timeout',self.el).attr('disabled',null);

      }else{
        $('#bootmenu_timeout',self.el).attr('disabled','disabled');
      }

      if(usbDevicesOf.is(':checked')){
        $('input[name=disable_usb_storage]',self.el).attr('disabled','disabled');
      }else{
        $('input[name=disable_usb_storage]',self.el).attr('disabled',null);
      }

      if(adOf.is(':checked')){
        $('input[name=domainPath]',self.el).attr('disabled',null);
      }else{
        $('input[name=domainPath]',self.el).attr('disabled','disabled');
      }

      if(ldcSyncOf.is(':checked')){
        $('input[name=disk_cache_sync_speed]',self.el).attr('disabled',null);
      }else{
        $('input[name=disk_cache_sync_speed]',self.el).attr('disabled','disabled');
      }

    },
    
    setupMultipleEdit: function() {
      var self = this;
      _(self.disabledAttributes).forEach(function(attribute) {
        $('[name="'+attribute+'"]', self.el).attr('disabled', 'disabled');
      });
    },

    saveModel: function(e) {
      var self = this;
      $('input[type=submit]', self.el).attr('alt',$('input[type=submit]',self.el).val());
      $('input[type=submit]', self.el).attr('disabled', 'disabled').val(App.msgFactory('Please wait...'));
      this._modelBinder.bind(this.model, this.el);
      if (this.models) {
      //  alert("this.models  aaa   编辑 ==="+JSON.stringify(this.model));
        _(this.disabledAttributes).each(function(attr) {self.model.unset(attr);});
        saved = this.models.length;
        _(this.models).each(function(model) {
          model.save(self.model.attributes, {
            success: function() {saved--;
              if (!saved) {self.$el.modal('hide');}
            },
            error:function(model, error){
              self.$('.computer-form .errors').append('Failed to save '+ model.get('name')+' \n ');
            }
          });
        });
      } else {
      // alert("views#computer_form_templae    this.models  添加 ==="+JSON.stringify(this.model));
        this.model.save({}, {
          success: function(model, response) {
            self.$el.modal('hide');
          }
        });
      }
      
      return false;
    },

    render: function() {
      this.delegateEvents();
      $(this.el).html(this.template({model:this.model, menus: this.menus, groups: this.groups}));

      this._modelBinder.bind(this.model, this.el);
      if (this.models) {this.setupMultipleEdit();}
      //初始化复选框选择事件
      this.checkboxChangedConverter();
      return this;
    }
  });
  return ComputerFormView;
});
