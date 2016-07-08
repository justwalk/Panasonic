define([
  'jquery',
  'underscore',
  'backbone',
  'models/snapshot'
], function($, _, Backbone, snapshot){
    var Snapshot = Backbone.Collection.extend({
        model: snapshot,
        url: 'versions',
        noIoBind: false,
        
        initialize: function() {
          _.bindAll(this, 'snapshotCreate');
          this.ioBind('read', this.snapshotsRead, this);
          this.ioBind('create', this.snapshotCreate, this);
          this.ioBind('update', this.snapshotCreate, this);
          this.ioBind('delete', this.snapshotDelete, this);
        },

        snapshotsRead: function(snapshots) {
          this.reset(snapshots);
        },
        
        fetchWithDiskId: function(disk_id) {
          this.disk_id = disk_id;
          this.fetch({ data: {disk_id: disk_id}});
        },
        
        snapshotCreate: function(data) {
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
  
        
        snapshotDelete: function(data) {
          this.remove(data);
        }

    });
    return Snapshot;
});