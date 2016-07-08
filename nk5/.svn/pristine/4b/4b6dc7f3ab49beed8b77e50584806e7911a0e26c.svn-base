define([
  'jquery',
  'underscore',
  'backbone',
  'models/disk'
], function($, _, Backbone, diskModel){
    var Disks = Backbone.Collection.extend({
        model: diskModel,
        url: 'disks',
        noIoBind: false,
        
        initialize: function() {
          _.bindAll(this, 'serverCreate');
          this.ioBind('create', this.serverCreate, this);
          this.ioBind('update', this.serverCreate, this);
          this.ioBind('delete', this.serverDelete, this);
        },

        fetchWithComputerIdAndMenuIdAndPackId: function(computer_id, menu_id, pack_id, callback) {
          this.computer_id = computer_id;
          this.menu_id = menu_id;
          this.fetch({ data: {computer_id: computer_id,  menu_id: menu_id, pack_id: pack_id}, success:callback});
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
    return Disks;
});