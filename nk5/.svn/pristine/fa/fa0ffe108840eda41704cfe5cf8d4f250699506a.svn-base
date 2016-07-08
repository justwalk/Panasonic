define([
  'jquery',
  'underscore',
  'backbone',
  'rsvp',
  'text!templates/commands/loading_screen.html'
  ], function( $, _, Backbone, RSVP, loadingScreen) {
    var LoadingView = Backbone.View.extend({
      template: _.template(underi18n.template(loadingScreen, msgFactory)),
      
      initialize: function() {
        this.promiseArray = this.options.promiseArray;
        this.finalContainer = this.options.finalContainer;
        this.displayView = this.options.displayView;
        this.executeAfter = this.options.executeAfter;
      },

      render: function() {
        var self = this;

        $(this.el).html(this.template());
        this.displayView.$el.html(this.$el);
        RSVP.all(this.promiseArray).then(function(data) {
          self.$el.modal('hide');
          self.remove();
          if (self.finalContainer) {
            self.finalContainer.length = 0;
            while (data.length !== 0) {
              self.finalContainer.push(data.shift());
            }
          }
          //run executeAfter befor the re-render
          if (self.executeAfter) {
            self.executeAfter();
          }
          if (self.displayView) {
            self.displayView.render();
          }
        });
      }

    });
    return LoadingView;
  });