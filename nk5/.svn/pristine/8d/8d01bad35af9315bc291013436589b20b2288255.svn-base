define([
  'jquery',
  'underscore',
  'backbone',
  'views/multiclient_boot/pack'
  ], function($, _, Backbone, PackView){

    var PacksView = Backbone.View.extend({

      events:{},

      initialize: function() {
        this.mappings = this.options.mappings;
        this.baseDisks = this.options.baseDisks;
        this.mainView = this.options.mainView;
        this.ioservers = this.options.ioservers;
        this.menu = this.options.menu;
        this.packViews = [];
      },

      render: function() {
        var self = this;
        
        self.packViews.forEach(function(packView) {
          packView.remove();
        });

        self.packViews = [];
        
        if(self.menu) {
          _(self.menu.packs).forEach(function(pack) {
              //fix it another way !!!!
            var packView = new PackView({
              pack: pack,
              menu: self.menu,
              mappings: self.mappings,
              baseDisks: self.baseDisks,
              mainView: self.mainView,
              ioservers: self.ioservers
            });
            self.packViews.push(packView);
            $(self.el).append(packView.render().el);
            
          });
        }
        
        return self;
      }
  });
  return PacksView;
});