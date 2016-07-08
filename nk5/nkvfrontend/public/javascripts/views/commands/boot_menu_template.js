define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/base_command_template',
  'text!templates/commands/boot_menu_new.html',
  'views/menus/menus',
  'views/packs/packs',
  'views/menus/packmenus',
  'collection/menus'
  ], function($, _, Backbone, BaseCommandView, bootMenuTemplate, MenusView, PacksView, PackMenusView, MenusCollection){
    
    var BootMenuView = BaseCommandView.extend({
      template: _.template(underi18n.template(bootMenuTemplate, msgFactory)),
      id:'boot-menu-modal',
      events:{
        'submit .task-form ': 'saveModel',
        'hidden' : 'remove' //the 'hidden' event is from bootstrap modal dismiss        
      },

      initialize: function(options) {
        this.constructor.__super__.initialize.apply(this, ['options']);
        this.model.set('action', 'boot_menu');
      //if(App.user == 'admin')
        this.menus = this.computers[0].menus;
      },
      render: function() {

        var self = this;

        $(this.el).html(this.template());

        if (this.packMenusView) {
          this.packmenusView.remove();
          this.packmenusView.unbind();
        }
        this.packmenusView = new PackMenusView({menus: this.computers[0].menus, computers: this.computers, el: $('#packmenus', self.el)});
        this.packmenusView.render();

        if (this.menusView) {
          this.menusView.remove();
          this.menusView.unbind();
        }
       // alert("this.computers ==="+JSON.stringify(this.computers));
        this.menusView = new MenusView({menus: this.menus, computers: this.computers, el: $(self.el)});
       // alert("self.el ==="+JSON.stringify(this.menusView));
        this.menusView.render();

        $('#menu-name', self.el).focus();

        return self;
      }
    });
  return BootMenuView;
});
