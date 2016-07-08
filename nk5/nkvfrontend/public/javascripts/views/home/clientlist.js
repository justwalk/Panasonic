define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/clientlist.html'
], function($, _, Backbone, clientlisTemplate){
    clientListView = Backbone.View.extend({

      initialize: function(){
      	var self = this;
        this.groupname=this.options.groupname;
        this.groupLength=this.options.groupLength;
        this.groupAliveLength=this.options.groupAliveLength;
      	self.template = _.template(underi18n.template(clientlisTemplate, App.msgFactory));
      },

      render: function(){

      	var renderContent = this.template();
      	this.$el.html(renderContent);
      	return this;      }
    });

  return clientListView;
});
