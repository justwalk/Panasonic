define([
  'jquery',
  'underscore',
  'backbone',
  'rsvp',
  'views/commands/base_command',
  'text!templates/commands/multiclient_boot_menu.html',
  'views/multiclient_boot/menus',
  'collection/base_disks'
  ], function($, _, Backbone, RSVP, BaseCommandView, bootMenuTemplate, MenusView, BaseDiskCollection){
    var MulticlientBootMenuView = BaseCommandView.extend({
      template: _.template(underi18n.template(bootMenuTemplate, msgFactory)),
      id:'boot-menu-modal',
      events:{
        'submit .task-form ': 'saveModel',
        'hidden' : 'remove' //the 'hidden' event is from bootstrap modal dismiss        
      },

      initialize: function() {
        this.constructor.__super__.initialize.apply(this, ['options']);
        this.model.set('action', 'boot_menu');
        //if(App.user == 'admin') {
          this.menus = [];
        //}
        this.mockMenus = {
          models: [],
        };
        this.mappings = {
          packsMap: {},
          disksMap: {},
          menusMap: {},
          menuCounter: 0,
          packCounter: 0,
          diskCounter: 0
        };
        this.baseDisks = new BaseDiskCollection();
        this.menusView = new MenusView({
          baseDisks: this.baseDisks,
          mappings: this.mappings,
          mainView: this,
          mockMenus: this.mockMenus,
          computers: this.computers,
          el: $('.form-horizontal',self.el)});
      },
      
      render: function() {
        var self = this;
        this.baseDisks.fetch({});
        //delete old view
        this.menusView.remove();

        $(this.el).html(this.template());

        var ioservers = new RSVP.Promise(function(resolve,reject) {
          socket.emit('servers:read', {}, function(err,data) {
            resolve(data);
          });
        });
        ioservers.then(function(data) {
          self.menusView = new MenusView({
            baseDisks: self.baseDisks,
            mappings: self.mappings,
            ioservers: data,
            mainView: self,
            mockMenus: self.mockMenus,
            computers: self.computers,
            el: $('.form-horizontal',self.el)});
          self.menusView.render();
          $('#menu-name', self.el).focus();
        });
        

        return self;
      }
    });
  return MulticlientBootMenuView;
});