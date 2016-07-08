define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/commands/settings_group_disk.html',
  'models/computer',
  'modelBinder',
  'collection/menus'
], function($, _, Backbone, SettingsGroupDiskTemplate, Computer, ModelBinder, MenuCollection) {
  var SettingsGroupDiskView = Backbone.View.extend({
    id: 'settings-group-menu-modal',
    className: 'modal fade',
    template: _.template(underi18n.template(SettingsGroupDiskTemplate, msgFactory)),

    events: {
      'click .btn-primary ': 'saveModel',
      'change #default_menu': 'selectPack',
      // 'hidden' : 'remove', //the 'hidden' event is from bootstrap modal dismiss
      // 'click .computer-form .checkbox': 'checkboxChangedConverter'
    },
    _modelBinder: undefined,
    initialize: function(options) {
      var self = this;
      this.model = new Computer;
      this.groups = this.options.groups;

      this._modelBinder = new Backbone.ModelBinder();
      // var index;

      var menus = '<option value="0">' + App.msgFactory('None') + '</option>';
      var menuCollection = this.options.defaultMenu;


      this.menuCollectionNew = new MenuCollection(menuCollection);
      //menuCollectionNew.fetchWithComputerId(this.model.get('id'));
      this.menuCollectionNew.forEach(function(menu) {
        menus += '<option value="' + menu.get('id') + '">' + menu.get('name') + '</option>';
      });

      this.menus = menus;

      _.bindAll(this);

      this.model.set('name', this.groups.get('name'));
      this.model.set('groupId', this.groups.get('id'));
    },
    //xiongpanan add end 2016/4/19
    selectPack: function() {
      var self = this;
      var menus = $("#default_menu option:selected", self.el).val();
      var pack = '<option value="0">' + App.msgFactory('None') + '</option>';
      socket.emit('packs:read', {
        computer_id: 1,
        menu_id: menus
      }, function(err, data) {
        for (var i = 0; i < data.length; i++) {
          var packs_id = data[i]["id"];
          var packs_name = data[i]["type"];
          pack += '<option value="' + packs_id + '">' + packs_name + '</option>';


        };
        $("#pack", self.el).html(pack);

      });

    },
    //xiongpanan add end 2016/4/19
    checkboxChangedConverter: function() {
      var self = this;
      //Display Boot Menu
      var enableMenuOf = $('input[name=enable_menu]', self.el);
      //Disable All USB
      var usbDevicesOf = $('input[name=disable_usb_devices]', self.el);
      //Support Windows Domain
      var adOf = $('input[name=ad]', self.el);
      //Enable Image Synchroniz
      var ldcSyncOf = $('input[name=ldc_sync]', self.el);

      if (enableMenuOf.is(':checked')) {
        $('#bootmenu_timeout', self.el).attr('disabled', 'disabled');
      } else {
        $('#bootmenu_timeout', self.el).attr('disabled', null);
      }

      if (usbDevicesOf.is(':checked')) {
        $('input[name=disable_usb_storage]', self.el).attr('disabled', 'disabled');
      } else {
        $('input[name=disable_usb_storage]', self.el).attr('disabled', null);
      }

      if (adOf.is(':checked')) {
        $('input[name=domainPath]', self.el).attr('disabled', 'disabled');
      } else {
        $('input[name=domainPath]', self.el).attr('disabled', null);
      }

      if (ldcSyncOf.is(':checked')) {
        $('input[name=disk_cache_sync_speed]', self.el).attr('disabled', 'disabled');
      } else {
        $('input[name=disk_cache_sync_speed]', self.el).attr('disabled', null);
      }

    },

    setupMultipleEdit: function() {
      var self = this;
      _(self.disabledAttributes).forEach(function(attribute) {
        $('[name="' + attribute + '"]', self.el).attr('disabled', 'disabled');
      });
    },

    saveModel: function(e) {
      //xiongpanan add start 2016/4/19
      var ja = underi18n.MessageFactory(locale);
      var self = this;
      var id = $("#groupId").val();
      var menus = $("#default_menu option:selected", self.el).val();
      var pack = $("#pack option:selected", self.el).text();
      var packId = $("#pack option:selected", self.el).val();
      var menustxt;
      this.menuCollectionNew.forEach(function(menu) {
        if (menu.get("id") == menus) {
          menustxt = menu.get("name");
        }
      });
      var checkval = $('#wrap input[name="operation"]:checked', self.el).val();
      if (menus != "0") {
        if (packId != 0) {
          if (checkval != undefined) {
            var computer_id_list = [];
            socket.emit('computers:read', {
              group_id: id
            }, function(err, data) {
              for (var i = 0; i < data.length; i++) {
                var a;
                a = data[i]["id"];
                computer_id_list.push(a);
              }
              var computer;
              for (var i = 0; i < computer_id_list.length; i++) {
                computer = computer_id_list[i];
                socket.emit('menus:read', {
                  computer_id: computer
                }, function(err, data, computer_id) {
                  var presenceMenus = false;
                  var menu_id;
                  if (data.length > 0) {
                    for (var j = data.length - 1; j >= 0; j--) {
                      if (data[j]["name"] == menustxt) {
                        presenceMenus = true;
                        menu_id = data[j]["id"];
                        break;
                      }
                    }
                    self.$el.modal('hide');
                    if (presenceMenus) {
                      socket.emit('packs:read', {
                        computer_id: computer_id,
                        menu_id: menu_id
                      }, function(err, data, computer_id, menu_id) {
                        var presencePack = false;
                        var pack_id;
                        if (data.length > 0) {
                          for (var k = data.length - 1; k >= 0; k--) {
                            if (ja(data[k]["type"]) == ja(pack)) {
                              presencePack = true;
                              pack_id = data[k]["id"];
                              break;
                            }
                          }
                        }
                        if (presencePack) {

                          socket.emit('pack:setPack', {
                            computer_id: computer_id,
                            menu_id: menu_id,
                            pack_id: pack_id,
                            type: checkval
                          }, function(err, data) {
                            self.$el.modal('hide');
                          });
                        }
                      });
                    }

                  }

                });
              }


            });

          } else {
            alert("Please select the type of operation");
          }
        } else {
          alert(ja("Select diskpack please."));
        }

      } else {
        alert(ja("Select menu please."));
      }


      //xiongpanan add end 2016/4/19
    },

    render: function() {
      this.delegateEvents();
      $(this.el).html(this.template({
        model: this.model,
        menus: this.menus,
        groups: this.groups
      }));

      this._modelBinder.bind(this.model, this.el);
      if (this.models) {
        this.setupMultipleEdit();
      }
      this.checkboxChangedConverter();
      return this;
    }
  });
  return SettingsGroupDiskView;
});