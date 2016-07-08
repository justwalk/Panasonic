define([
  'jquery',
  'underscore',
  'backbone',
  'models/user'
], function($, _, Backbone, task){
    var Schedules = Backbone.Collection.extend({
        model: task,
        url: 'users',
        noIoBind: false,
        
        initialize: function() {
          _.bindAll(this, 'serverCreate');
          this.ioBind('create', this.serverCreate, this);
          this.ioBind('delete', this.serverDelete, this);
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
        serverDelete: function(schedule) {
          this.remove(schedule);
        },
        
        fetchWithGroupId: function(group_id) {
          this.group_id = group_id;
          this.fetch({ data: {group_id: group_id}}, function(r) {
          });
        }
        
    });

  return Schedules;
});

