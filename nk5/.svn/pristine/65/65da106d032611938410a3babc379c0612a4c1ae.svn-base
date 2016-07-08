define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/clientFootList.html'
], function($, _, Backbone, clientFootlistTemplate){
    clientFootListView = Backbone.View.extend({

      initialize: function(){
      	var self = this;
        this.computersLength=this.options.computersLength;
        this.aliveLength=this.options.aliveLength;
      	self.template = _.template(underi18n.template(clientFootlistTemplate, App.msgFactory));
      },

      render: function(){

      	var renderContent = this.template();
      	this.$el.html(renderContent);
      	return this;      }
    });

  return clientFootListView;
});
