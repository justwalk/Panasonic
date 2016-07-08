define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/groups/add_group.html',
  'models/group'
], function($, _, Backbone, addGroupTemplate, Group){
  var AddGroupView = Backbone.View.extend({
    className: 'modal fade',
    id: 'add-group-modal',
    template: _.template(underi18n.template(addGroupTemplate, msgFactory)),
    
    events:{
      'change .group-form input[type!=\'submit\']' : 'attributeChanged',
      'submit .group-form ': 'saveModel',
      'hidden' : 'remove' //the "hidden" event is from bootstrap modal dismiss
    },
    
    initialize: function() {
      this.model = new Group();
      this.parentView = this.options.parentView;
      this.collection = this.parentView.collection;
      this.model.bind('error', function(object, message) {
        var errorContainer = $('.group-form .errors', this.el);
        errorContainer.html(JSON.stringify(message));
        errorContainer.show();
      });
    },
    
    saveModel: function(e) {
      e.preventDefault();
      var self = this;
      if (this.model.isValid) {
        this.model.save({}, {
          success: function(model, response) {
            self.$el.modal('hide');
            self.parentView.setGroupid(model.id);
          }
        });
      }
      return false;
    },
    
    attributeChanged: function(e) {
      var attribute = e.target.name.match(/^group\[(.*)\]$/)[1];
      this.model.set(attribute, $(e.target).val());
    },
    
    render: function() {
      $(this.el).html(this.template({model:this.model}));
      return this;
    }
  });
  return AddGroupView;
});