define([
  'jquery',
  'underscore',
  'backbone',
  'rsvp',
  'views/multiclient_boot/menu',
  'views/multiclient_boot/packs',
  'views/loading_screen',
  'models/menu'
  ],function($, _, Backbone, RSVP, MenuView, PacksView, LoadingView, Menu) {
  var MulticlientMenusView = Backbone.View.extend({

    events: {
      'click #add-menu': 'addMenu'
    },

    initialize: function() {
      this.mockMenus = this.options.mockMenus;
      this.mappings = this.options.mappings;
      this.ioservers = this.options.ioservers;
      this.computers = this.options.computers;
      this.mainView = this.options.mainView;
      this.baseDisks = this.options.baseDisks;
    },

    addMenu: function() {
        var newMenu = {name: $('#menu-name', this.el).val(), uuid: ++this.mappings.menuCounter, packs: []};
        var self = this;
        var promiseArray = [];
        this.mockMenus.models.push(newMenu);

        this.mappings.menusMap[this.mappings.menuCounter] = [];
        _(this.computers).forEach(function(computer) {
          promiseArray.push(new RSVP.Promise(function(resolve, reject) {
              var newSaveMenu = new Menu();
              newSaveMenu.set({name: newMenu.name, computer_id: computer.id});
              newSaveMenu.save({}, {
                success: function(model,response) {
                  resolve(model);
                },
                error: function(model,response) {
                  reject(model);
                }
              });
            })
          );
        });
        var loadingScreen = new LoadingView({promiseArray: promiseArray, finalContainer: self.mappings.menusMap[self.mappings.menuCounter], displayView: self.mainView});
        loadingScreen.render();
      },

    render: function() {
      var self = this;
      $('#packs-table',self.el).html('<span class="pack-container"></span>');

      _(this.mockMenus.models).forEach(function(menu) {
        var newMenuView = new MenuView({menu: menu, mockMenus: self.mockMenus, mainView: self.mainView, mappings: self.mappings, computers: self.computers});
        $('#packs-table > .pack-container',self.el).append(newMenuView.render().el);
        var packsView = new PacksView({
          menu: menu,
          mainView: self.mainView,
          mappings: self.mappings,
          computers: self.computers,
          baseDisks: self.baseDisks,
          ioservers: self.ioservers,
          el: $('#packs-table > .pack-container', self.el)
        });
        packsView.render();
      });
        
      $('#add-menu', self.el).attr('disabled', 'disabled');

      $('#menu-name', self.el).bind('keyup', function(e) {
        if ($('#menu-name', self.el).val() != '' && !_.isUndefined($('#add-menu', self.el).attr('disabled'))) {
          $('#add-menu', self.el).removeAttr('disabled');
        }
        if ($('#menu-name', self.el).val() == '') {
          $('#add-menu', self.el).attr('disabled', 'disabled');
        }
      });

      $('#menu-name', self.el).bind('keydown', function(e) {
        if (e.keyCode==13) {
          if (!$('#add-menu', self.el).attr('disabled')) {
            self.addMenu();
          }
          return false;
        }
      });
      return this;
    }

  });
  return MulticlientMenusView;
});