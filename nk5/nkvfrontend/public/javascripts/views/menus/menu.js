define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/menus/menu.html',
  'models/pack'
], function($, _, Backbone, tableItem, Pack){
    MenuView = Backbone.View.extend({
      tagName: 'tbody',
      _modelBinder: undefined,
      template: _.template(underi18n.template(tableItem, msgFactory)),
      events:{
        'click td .remove': 'destroy',
        'click td .add-pack': 'addPack'
      },

      initialize: function() {
        this.menu = this.options.menu;
        this.computers = this.options.computers;
        this._modelBinder = new Backbone.ModelBinder();
        console.log();
      },

      destroy: function() {
          var ja = underi18n.MessageFactory(locale);
        this.menu.destroy({
          success: function(model, response) {
            alert(ja('Menu ')+model.get('name')+ja(' was deleted.'));
          },
          error: function(model, response) {
            alert(ja('Failed to delete menu. ')+response.error);
          },
          wait:true
        });
      },

      addPack: function() {
        var newPack = new Pack();
        var self = this;
        newPack.set({type: $('.pack-types', this.el).val()});
        newPack.save({computer_id: this.computers[0].id, menu: this.menu.get('id')}, {
          success: function(model) {
          },
          error: function(model,response) {
          }
        });
      },

      render: function() {
        $(this.el).html(this.template({
            menu: this.menu
          })
        );
        return this;
      }
    });
    return MenuView;
});