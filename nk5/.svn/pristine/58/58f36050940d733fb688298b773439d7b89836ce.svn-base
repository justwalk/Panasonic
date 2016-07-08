define([
  'jquery',
  'underscore',
  'backbone',
  'models/group'
], function($, _, Backbone, group){
    var Groups = Backbone.Collection.extend({
        model: group,
        url: 'groups',
        noIoBind: false,
        
        initialize: function() {
          _.bindAll(this, 'serverCreate');
          this.ioBind('read', this.serverRead, this);
          this.ioBind('create', this.serverCreate, this);
          this.ioBind('delete', this.serverDelete, this);
        },

        serverRead: function(data) {
          this.reset(data);
        },

        serverCreate: function(data) {
          var exists = this.get(data.id);
          if (!exists) {
            this.add(data);
          } else {
            data.fromServer = true;
            exists.set(data);
          }
        },
        serverDelete: function(group) {
          this.remove(group);
        }
    });

  return Groups;
});

