define([
  'jquery',
  'underscore',
  'backbone',
  'models/storage'
], function($, _, Backbone, server){
    var Storages = Backbone.Collection.extend({
        model: server,
        url: 'servers',
        noIoBind: false,
        initialize: function() {
          _.bindAll(this, 'serverCreate');
          this.ioBind('create', this.serverCreate, this);
          this.ioBind('delete', this.serverDelete, this);
        },
        serverCreate: function(data) {
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
        serverDelete: function(data) {
          this.remove({id:data.ID});
        }
    });
    return Storages;
});