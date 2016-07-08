define([
  'jquery',
  'underscore',
  'backbone',
  'models/directory'
], function($, _, Backbone, directoryModel) {
  var Directories = Backbone.Collection.extend({
    model: directoryModel,
    url: 'directories',
    noIoBind: false,

    fetchWithServerId: function(server_id, type) {
      this.fetch( {data: {server_id: server_id,type : type}, success: function(models) {
        this.models = models;
      }});
    },

    directoryModelCreate: function(data) {
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

    directoryModelDelete: function(data) {
      this.remove(data);
    }

  });
  return Directories;
});