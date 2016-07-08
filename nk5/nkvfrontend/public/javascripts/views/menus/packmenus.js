define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/menus/packmenu.html',
  'models/menu',
  'models/pack'
  ], function($, _, Backbone, menusTemplate, Menu, Pack){
    PackMenusView = Backbone.View.extend({
      template: _.template(underi18n.template(menusTemplate, underi18n.MessageFactory(locale))),

      events:{
        'click #add-menu': 'addMenu'
      },

      initialize: function() {
        var self = this;
        this.menus = this.options.menus;
        this.computers = this.options.computers;
        this.menus.bind('add remove reset', function(e) {
          self.render();
        });
      },

      addMenu: function() {
        var self = this;
        var newMenu = new Menu();
        newMenu.set({name: $('input#menu-name',this.el).val()});
        newMenu.save({computer_id: this.computers[0].id}, {
          success: function(model) {
            $('input#menu-name', self.el).val('');
          }
        });
      },

      

      render: function() {
        var self = this;
        $(this.el).html(this.template());
        
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
        return self;
      }
  });
  return PackMenusView;
});
