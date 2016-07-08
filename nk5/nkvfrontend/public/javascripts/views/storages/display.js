define([
  'jquery',
  'underscore',
  'backbone',
  'models/rollback',
  'text!templates/storages/computerslist.html',
  'modelBinder'
], function($, _, Backbone,RollBack, computerslistTemplate,ModelBinder){
  var DisplayView = Backbone.View.extend({
    id:'add-storage-modal',
    className: 'modal fade',
    template: _.template(underi18n.template(computerslistTemplate, msgFactory)),
    
    initialize: function() {
      _.bindAll(this);
      var self = this;
      this.model = this.options.model || new RollBack();
    },
      
    render: function() {
      $(this.el).html(this.template({model:this.model}));
      return this;
    }

  });
  return DisplayView;
});
