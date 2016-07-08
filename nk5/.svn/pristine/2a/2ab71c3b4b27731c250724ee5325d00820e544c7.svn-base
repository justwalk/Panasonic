define([
  'jquery',
  'underscore',
  'backbone',
  'collection/base_disks',
  'views/storages/storages'
], function($, _, Backbone, StoragesCollection, StoragesView){
    var StorageRouter = Backbone.Router.extend({
        routes:{
            'storages'  : 'select',
            'storages/' : 'select',
            'storages/:server_id' : 'select'
        },
        initialize: function(){
          var self = this;
          self.base_disks = new StoragesCollection();
          self.storagesView = new StoragesView({router: self, collection: self.base_disks});
        },
        
        select: function(server_id){
          var self = this;
          self.storagesView.setSelectedId(server_id);
          self.storagesView.collection.fetch();
          $('#content-body').html(self.storagesView.el);
          self.storagesView.delegateEvents();
        }
    });
    return StorageRouter;
});
