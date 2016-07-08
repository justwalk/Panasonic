define([
  'jquery',
  'underscore',
  'backbone',
  'models/channel'
], function($, _, Backbone, channelModel) {
  var Channels = Backbone.Collection.extend({
    model: channelModel,
    url: 'channels',
    noIoBind: false,

    fetchWithServerId: function(server_id) {
      //console.log('fetchWithServerId==channels:read##################'+server_id);
      this.fetch( {data:{server_id: server_id}, success: function(models) {
        this.models = models;
      }});
    },

    channelModelCreate: function(data) {
      var exists = this.get(data.id);
      if (!exists) {
        if (!this.server_id || (this.server_id == data.server_id) ) {
          this.add(data);
        }
      } else {
        data.fromServer = true;
        exists.set(data);
      }
    },

    channelModelDelete: function(data) {
      this.remove(data);
    }

  });
  return Channels;
});