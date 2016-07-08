define([
  'jquery',
  'underscore',
  'backbone',
  'collection/servers',
  'views/servers/servers',
], function($, _, Backbone, ServersCollection, ServersView){
    var ServerRouter = Backbone.Router.extend({
        routes:{
            ''         : 'defaultRoute',
            'servers'  : 'select',
            'servers/:server_id' : 'select'
        },
        initialize: function(){
          var self = this;
          var servers = new ServersCollection();
          self.serversView = new ServersView({router: self, collection: servers});
        },

        select: function(server_id){
          $('#content-body').html(this.serversView.el);
          this.serversView.collection.fetch();
          this.serversView.delegateEvents();
        },

        defaultRoute: function(){
          window.location = '#clients';
          //Backbone.history.navigate('servers', true);
        }
    });
  return ServerRouter;
});
