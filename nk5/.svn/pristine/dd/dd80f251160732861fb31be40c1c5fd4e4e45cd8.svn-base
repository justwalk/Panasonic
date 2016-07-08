define([
  'jquery',
  'underscore',
  'backbone',
  'models/rollback',
  'text!templates/storages/rollback.html',
  'models/base_disk',
  'collection/base_disks',
  'collection/directories',
  'modelBinder'
], function($, _, Backbone,RollBack, rollBackTemplate, BaseDisk, BaseDiskCollection, DirectoriesCollection, ModelBinder){
  var RollBackView = Backbone.View.extend({
    id:'add-storage-modal',
    className: 'modal fade',
    template: _.template(underi18n.template(rollBackTemplate, msgFactory)),
    
    events:{
      'click .submit ': 'saveModel'
    },

    initialize: function() {
      _.bindAll(this);
      var self = this;
      this.model = this.options.model || new RollBack();
    },
      
    saveModel: function(e) {
     var self = this;
     var index = $("input:radio[name='Version']:checked").val();
     var ID = this.model.get('ID');
     var IOServer = this.model.get('IOServer');
     var Size = this.model.get('Size');
     var Name = this.model.get('Name');
     var Path = this.model.get('Path');
     var Version = this.model.get('Data')[index]['Version'];
     console.log(index,ID,IOServer,Size,Name,Path,Version);

      socket.emit('restore:rollback', {ID:ID,Version:Version,IOServer:IOServer,Size:Size,Name:Name,Path:Path}, function(err, data) {
        console.log(err);
      });
      self.$el.modal('hide');
      /*var self = this;
      this.model.save({}, {
        success: function(model, response) {
          
          self.$el.modal('hide');

        }
      });*/
      return false;
    },

    render: function() {
      $(this.el).html(this.template({model:this.model}));
      return this;
    }

  });
  return RollBackView;
});
