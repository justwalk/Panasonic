define([
  'jquery',
  'underscore',
  'backbone',
  'models/base_disk'
], function($, _, Backbone, disk){
    var BaseDisks = Backbone.Collection.extend({
        model: disk,
        url: 'base_disks',
        noIoBind: false,
        
        initialize: function() {
          _.bindAll(this, 'diskCreate');
          this.ioBind('create', this.diskCreate, this);
          this.ioBind('update', this.diskCreate, this);
          this.ioBind('delete', this.diskDelete, this);
          this.on('add reset', this.setTimers, this);
        },

        fetchWithGroupId: function(server_id) {
          this.server_id = server_id;
          this.fetch({ data: {server_id: server_id}});
        },
        
        diskCreate: function(data) {
          var exists = this.get(data.ID);
          if (!exists) {
            if (!this.server_id || (this.server_id == data.IOServer) ) {

              this.add(data);
            }
          } else {
            data.fromServer = true;
            exists.set(data);
          }
        },
  
        diskDelete: function(data) {
          this.remove({id: data.ID});
        }

    });
    return BaseDisks;
});