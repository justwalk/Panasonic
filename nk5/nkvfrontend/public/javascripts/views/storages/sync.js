define([
  'jquery',
  'underscore',
  'backbone',
  'models/sync_schedule',
  'text!templates/storages/sync.html',
  'modelBinder'
], function($, _, Backbone,SyncSchedule, SyncTemplate,ModelBinder){
  var SyncScheduleView = Backbone.View.extend({
    id:'add-storage-modal',
    className: 'modal fade',
    template: _.template(underi18n.template(SyncTemplate, msgFactory)),
    events:{
    	'submit form': 'saveModel'
    },

    initialize: function() {
      _.bindAll(this);
      var self = this;
      this._modelBinder = new ModelBinder();
      this.model = this.options.model || new SyncSchedule();
    },
      
    render: function() {
      $(this.el).html(this.template({model:this.model}));
	  this._modelBinder.bind(this.model, this.el);
      return this;
    },

    saveModel: function(e) {
    	if(!!$("input[name='SyncType']").eq(-1).attr('checked')){
    		this.model.set('SyncType',1);
    	}
    	else{
    		this.model.set('SyncType',0);
    	}
    	if(!!$("input[name='SyncCheckbox']").eq(-1).attr('checked')){
    		this.model.set('Speed',$("input[type='text']").eq(-1).val());
    	}
    	else{
    		this.model.set('Speed',0);
    	}
      	var self = this;
       	this.model.save({}, {
        	success: function(model, response) {
          	self.$el.modal('hide');
        	}
      	});
      	return false;
    },

  });
  return SyncScheduleView;
});
