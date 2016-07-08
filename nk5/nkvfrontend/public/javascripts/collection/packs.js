define([
  'jquery',
  'underscore',
  'backbone',
  'models/pack'
], function($, _, Backbone, packModel){
    var Packs = Backbone.Collection.extend({
        model: packModel,
        url: 'packs',
        noIoBind: false,
        
        initialize: function() {
          _.bindAll(this, 'serverCreate');
          this.ioBind('create', this.serverCreate, this);
          this.ioBind('update', this.serverCreate, this);
          this.ioBind('delete', this.serverDelete, this);

			var self = this;
			socket.on('osv-event', function(details) {
				if (details.Type === "ChangePackMode") {
					 var model = self.get(details.Id);

					 model.set('Mode', details.Mode);
				}
			});
        },

        fetchWithComputerIdAndMenuId: function(computer_id, menu_id, callback) {
          this.computer_id = computer_id;
          this.menu_id = menu_id;
          this.fetch({ data: {computer_id: computer_id,  menu_id: menu_id}, success:callback});
        },

        serverCreate: function(data) {
          var exists = this.get(data.id);
          if (!exists) {
            if (!this.computer_id || (this.computer_id == data.computer_id) ) {
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
    return Packs;
});