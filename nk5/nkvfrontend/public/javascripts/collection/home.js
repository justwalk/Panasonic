define([
  'jquery',
  'underscore',
  'backbone',
  'models/home'
], function($, _, Backbone, home){
    var Home = Backbone.Collection.extend({
        model: home,
        url: 'servers',
        noIoBind: false,
        
        initialize: function() {

        },

        fetchWithGroupId: function(server_id) {
          this.server_id = server_id;
          this.fetch({ data: {server_id: server_id}});
        },
    });
    return Home;
});