define([
  'jquery',
  'underscore',
  'backbone',
  'views/packs/pack',
  'views/menus/menu',
  'collection/base_disks'
  ], function($, _, Backbone, PackView, MenuView, BaseDiskCollection){

    PacksView = Backbone.View.extend({

      events:{},

      initialize: function() {
        _.bindAll(this, 'render', 'setMenu');
        this.computers = this.options.computers;
        this.setMenu(this.options.menu);
        this.baseDisks = this.options.baseDisks;
        this.ioservers = this.options.ioservers;
        this.menus = this.options.menus;
        this.packViews = [];
        this.menuView = new MenuView({menu: this.menu, menus: this.menus, computers: this.computers});
      },

      setMenu: function(menu) {
        this.menu = menu;
        this.menu.fetchPacks();
        this.menu.packs.bind('add remove reset', this.render);
      },
      
      render: function() {
        var self = this;
        
        self.packViews.forEach(function(packView) {
          packView.unbind();
          packView.remove();
        });

        self.packViews = [];

        $(this.el).append(this.menuView.render().el);
        
        if(self.menu) {
          self.menu.packs.forEach(function(pack) {
              //fix it another way !!!!
              if (pack.get('menu') == self.menu.id) {
                var packView = new PackView({model:pack, baseDisks: self.baseDisks, ioservers: self.ioservers});
                self.packViews.push(packView);
                $(self.el).append(packView.render().el);
              }
              
          });
        }
        
        return self;
      }
  });
  return PacksView;
});