define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/list_item.html',
  'modelBinder'
], function($, _, Backbone, listItem, ModelBinder){
    ServerView = Backbone.View.extend({

      initialize: function(){
        var self = this;
        self._modelBinder = new Backbone.ModelBinder();

        self.model.on('change:online', function(model, value, event) {
            self.$el.toggleClass('server-online', value);
        });

        self.template = _.template(underi18n.template(listItem, App.msgFactory));
       
      },

      render: function(){
        
        latestView = this;
        var renderContent = this.template({
          model: this.model,
          Type: App.msgFactory(this.model.get('Type'))
        });
        this.$el.html(renderContent);
        return this;
      },
    });

  return ServerView;
});
