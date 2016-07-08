define([
  'jquery',
  'underscore',
  'backbone',
  'models/menu'
], function($, _, Backbone, menuModel){
    var Menus = Backbone.Collection.extend({
        model: menuModel,
        url: 'menus',
        noIoBind: false,
        
        initialize: function() {
          _.bindAll(this, 'serverCreate');
          this.ioBind('create', this.serverCreate, this);
          this.ioBind('update', this.serverCreate, this);
          this.ioBind('delete', this.serverDelete, this);
        },
        fetchWithComputerId: function(computer_id) {
          this.computer_id = computer_id;
          this.fetch({ data: {computer_id: computer_id}});
        },
        serverCreate: function(data) {
          var exists = this.get(data.id);
          if (!exists) {
            if (!this.computer_id || (this.computer_id == data.computer_id) ) {
              this.add(data);
            }
          } else {
            data.fromServer = true;
            exists.set(data);
          }
        },
        serverDelete: function(data) {
          this.remove(data);
        }

    });
    return Menus;
});