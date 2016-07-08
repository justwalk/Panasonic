define([
  'jquery',
  'underscore',
  'backbone',
  'rsvp',
  'text!templates/multiclient/menu.html',
  'models/pack',
  'views/loading_screen'
], function($, _, Backbone, RSVP, tableItem, Pack, LoadingView){
    var MenuView = Backbone.View.extend({
      _modelBinder: undefined,
      tagName: 'tbody',
      template: _.template(underi18n.template(tableItem, msgFactory)),
      events:{
        'click td .remove': 'destroy',
        'click td .add-pack': 'addPack'
      },

      initialize: function() {
        this.menu = this.options.menu;
        this.mockMenus = this.options.mockMenus;
        this.computers = this.options.computers;
        this.mappings = this.options.mappings;
        this.mainView = this.options.mainView;
        this._modelBinder = new Backbone.ModelBinder();
      },

      destroy: function() {
        var self = this;
        var promiseArray = [];

        _(this.mappings.menusMap[this.menu.uuid]).forEach( function(menu) {
          promiseArray.push(new RSVP.Promise( function(resolve, reject) {
              menu.destroy({
                success: function(model, response) {
                  resolve(model);
                },
                error: function(model, response) {
                  reject(model);
                },
                wait:false
              });
            })
          );
        });
        
        var loadingScreen = new LoadingView({
          promiseArray: promiseArray,
          displayView: self.mainView,
          executeAfter: function () {
            //reject eliminates all models that have the given uuid
            self.mockMenus.models = _(self.mockMenus.models).reject(function(menu){
              return menu.uuid === self.menu.uuid;
            });
            delete self.mappings.menusMap[self.menu.uuid];
          }
        });
        loadingScreen.render();
      },

      addPack: function() {
        var newPack = {type: $('.pack-types', this.el).val(), uuid: ++this.mappings.packCounter, state: 'UndoReady', disks: []};
        var promiseArray = [];
        var self = this;
        
        this.menu.packs.push(newPack);

        _(this.mappings.menusMap[this.menu.uuid]).forEach(function(menu) {
          var newSavePack = new Pack();
          promiseArray.push(new RSVP.Promise(function (resolve, reject) {
            newSavePack.save({type: newPack['type'], computer_id: menu.get('computer_id'), menu: menu.get('id')}, {
              success: function(model) {
                resolve(model);
              },
              error: function(model,response) {
                reject(model);
              }
            });
          }));
        });
        self.mappings.packsMap[newPack.uuid] = [];
        var loadingScreen = new LoadingView({
          promiseArray: promiseArray,
          displayView: self.mainView,
          finalContainer: self.mappings.packsMap[newPack.uuid]
        });
        loadingScreen.render();
      },

      render: function() {
        $(this.el).html(this.template({
            menu: this.menu
          })
        );
        if (this.menu.packs.length == 7) {
          $('.add-pack',this.el).hide();
        }
        return this;
      }
    });
    return MenuView;
});