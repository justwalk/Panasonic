define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/tasklistitem.html'
], function($, _, Backbone, tasklisTemplate){
    taskListView = Backbone.View.extend({

      initialize: function(){
      	var self = this;
      	self.template = _.template(underi18n.template(tasklisTemplate, App.msgFactory));
      },

      render: function(){
      	var renderContent = this.template({
      		model:this.model
      	});
      	this.$el.html(renderContent);
      	return this;
      }
    });

  return taskListView;
});