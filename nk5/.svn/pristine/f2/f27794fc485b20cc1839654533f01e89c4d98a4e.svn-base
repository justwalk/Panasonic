define([
  'jquery',
  'underscore',
  'backbone',
  'models/server',
  'text!templates/servers/edit_server.html',
  'collection/directories',
  'modelBinder'
], function($, _, Backbone, Server, editServer, DirectoriesCollection, ModelBinder){

  var EditServerView = Backbone.View.extend({
    id:'add-server-modal',
    className: 'modal fade',
    template: _.template(underi18n.template(editServer, msgFactory)),
    
    events:{
      'submit #edit-server-form': 'saveModel',
      'hidden' : 'remove' //the 'hidden' event is from bootstrap modal dismiss
    },
    _modelBinder: undefined,
    initialize: function(options) { 	
       var self = this;
       this.model = this.options.model || new Server();
       this._modelBinder = new Backbone.ModelBinder();
        
/*       this.baseDirectories = new DirectoriesCollection();

       this.baseDirectories.fetchWithServerId(this.model.get('ID'),'BaseDisk');
       console.log(this.baseDirectories.fetchWithServerId(this.model.get('ID'),'BaseDisk'));
       this.baseDirectories.bind('add remove reset', function(collection) {
//    	   var base = '';
//    	   collection.each(function(directory) {
//    		   base += directory.get('Path');
//			   self.model.set('base', base);
//    	   });
//    	   console.log(collection.models[1].get('Path'));
    	   self.model.set('base', collection.models[0].get('Path'));
    	   
       });
//       this.baseDirectories2 = new DirectoriesCollection();
       this.baseDirectories.fetchWithServerId(this.model.get('ID'),'Export');
       this.baseDirectories.bind('add remove reset', function(collection) {
    	   self.model.set('export', collection.models[0].get('Path'));
       });
//       this.baseDirectories3 = new DirectoriesCollection();
       this.baseDirectories.fetchWithServerId(this.model.get('ID'),'Storage');
       this.baseDirectories.bind('add remove reset', function(collection) {
    	   self.model.set('storage', collection.models[0].get('Path'));
       });*/
       
       _.bindAll(this);
    },
    
    saveModel: function(e) {
	  e.preventDefault();
      var self = this;
      $('input[type=submit]', self.el).attr('alt',$('input[type=submit]',self.el).val());
      $('input[type=submit]', self.el).attr('disabled', 'disabled').val(App.msgFactory('Please wait...'));
	  this._modelBinder.bind(this.model, this.el);
      this.model.save({}, {
        success: function(model, response) {
        	
          self.$el.modal('hide');
          Backbone.history.loadUrl();
        }
      });
      return false;
    },
    
    render: function() {
      this.delegateEvents();
      $(this.el).html(this.template({model:this.model}));
      this._modelBinder.bind(this.model, this.el);
      
      return this;
    }
  });
  return EditServerView;
});
