define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/storages/delete_storage.html',
  'models/base_disk',
  'collection/base_disks',
  'collection/directories',
  'modelBinder'
], function($, _, Backbone, deleteStorage, BaseDisk, BaseDiskCollection, DirectoriesCollection, ModelBinder){

  var DeleteStorageView = Backbone.View.extend({
    id:'add-storage-modal',
    className: 'modal fade',
    template: _.template(underi18n.template(deleteStorage, msgFactory)),
    
    events:{
      'submit .storage-form': 'saveModel',
      'hidden' : 'remove' //the 'hidden' event is from bootstrap modal dismiss
    },
    
    initialize: function() {
       var self = this;
       this.model = this.options.model || new Server();
       this._modelBinder = new Backbone.ModelBinder();
    },
    
    saveModel: function(e) {
     
      var self = this;
      $('input[type=submit]', self.el).attr('alt',$('input[type=submit]',self.el).val());
      var checkval=""
      if($("input[type='checkbox']").is(':checked')){
      
        checkval="1";

      }else{
        checkval="0";
      }
       //this.model.set('Checkval', checkval);

     socket.emit('base_disk:delete', {ID:this.model.get("ID"),IOServer:this.model.get("IOServer"),Checkval:checkval,}, function(err, data) {
     Backbone.history.loadUrl();
     self.$el.modal('hide');
    

      });
      
      return false;
    },
    
    render: function() {
       var self = this;
      this.delegateEvents();
      $(this.el).html(this.template({model:this.model}));
      this._modelBinder.bind(this.model, this.el);
      return this;
    }
  });
  return DeleteStorageView;
});
