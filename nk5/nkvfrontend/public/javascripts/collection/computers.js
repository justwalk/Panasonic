define([
  'jquery',
  'underscore',
  'backbone',
  'models/computer'
], function($, _, Backbone, computerModel){
    var Computers = Backbone.Collection.extend({
        model: computerModel,
        url: 'computers',
        noIoBind: false,

        initialize: function() {
          var self = this;
          _.bindAll(this, 'serverCreate');
          this.ioBind('create', this.serverCreate, this);
          this.ioBind('update', this.serverCreate, this);
          this.ioBind('delete', this.serverDelete, this);

		      socket.on('osv-event', function(details) {
            if (details.Type === "ComputerAlive") {
              var model = self.get(details.ID);
              if (_.isUndefined(model))
      				return;
      			  model.set('Menu', details.Menu);
              model.set('IP', details.IP);
              model.set('Disks', details.Disks);
              model.set('IOServers', details.IOServers);
              model.set('online', true);
              model.set('onlineSince', details.Time);
              var now = new Date();
              model.set('lastUpdate', now);

              window.setInterval(function(){
              if(model.get('lastUpdate') === now) {
                model.set('online', false);
              }
              }, 5000);

            }
          });
        },

        fetchWithGroupId: function(group_id) {
          this.group_id = group_id;
          this.fetch({ data: {group_id: group_id}});
        },

        selectedComputers: function() {
          return this.filter(function(computer) {return computer.isSelected;});
        },
        
        serverCreate: function(data) {
          var exists = this.get(data.id);
          if (!exists) {
            if (!this.group_id || (this.group_id == data.group_id) ) {
              this.add(data);
            }
          } else {
            data.fromServer = true;
            exists.set(data);
          }
        },
          
        serverDelete: function(data) {
          this.remove(data);
        }

    });
    return Computers;
});
