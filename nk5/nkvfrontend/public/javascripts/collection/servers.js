define([
  'jquery',
  'underscore',
  'backbone',
  'models/server'
], function($, _, Backbone, server){
    var Servers = Backbone.Collection.extend({
        model: server,
        url: 'servers',
        noIoBind: false,
        initialize: function() {

          var self = this;
          _.bindAll(this, 'serverCreate');
          this.ioBind('create', this.serverCreate, this);
    		  this.ioBind('update', this.serverCreate, this);
          this.ioBind('delete', this.serverDelete, this);
          socket.on('osv-event', function(details) {
            if (details.Type === 'Alive') {

              var model = self.get(details.Server);     
              if(model) {
                model.set('online', true);
                var now = new Date();
                model.set('lastUpdate', now);
                window.setInterval(function(){
                  if(model.get('lastUpdate') === now) {
                    model.set('online', false);
                  }
                }, 5000);
              }
            }
          });
        },
        fetchWithServerId: function(server_id) {
            this.server_id = server_id;
            this.fetch({ data: {server_id: server_id}});
          },
        serverCreate: function(data) {
          var exists = this.get(data.ID);
          if (!exists) {
            this.add(data);
          } else {
            data.fromServer = true;
            exists.set(data);
          }
        },
        serverDelete: function(server) {
          this.remove({id:server.ID});
        }
    });
    return Servers;
});