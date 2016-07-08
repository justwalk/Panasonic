define([
  'jquery',
  'underscore',
  'backbone',
  'rsvp',
  'models/menu',
  'models/pack',
  'views/packs/packs',
  'collection/base_disks'
], function($, _, Backbone, RSVP, Menu, Pack, PacksView, BaseDiskCollection) {
  MenusView = Backbone.View.extend({

    events: {},

    initialize: function() {
      var self = this;
      this.menus = this.options.menus;
      this.computers = this.options.computers;
      this.menus.bind('add remove reset', function(e) {
        self.render();
      });
      this.packsViews = [];
    },

    render: function() {
      var self = this;
      _(self.packsViews).forEach(function(packsView) {
        packsView.remove();
      });

      self.packsViews = [];
      var baseDisks = new BaseDiskCollection();
      baseDisks.fetch({});
      var ioservers = new RSVP.Promise(function(resolve, reject) {
        socket.emit('servers:read', {}, function(err, data) {
          resolve(data);
        });
      });
      ioservers.then(function(data) {
        $('#packs-table', self.el).append('<span class="pack-container"></span>');
        (self.menus.models).forEach(function(menu) {
          self.packsViews.push(new PacksView({
            menu: menu,
            ioservers: data,
            computers: self.computers,
            el: $('#packs-table > .pack-container', self.el),
            baseDisks: baseDisks
          }));
        });
        $('#menu-name', self.el).focus();
        return self;
      });
    }
  });
  return MenusView;
});