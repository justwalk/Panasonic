define([
  'jquery',
  'underscore',
  'backbone',
  'models/various_setting',
  'text!templates/various_setting/settings.html',
  'modelBinder'
], function($, _, Backbone, Settings, settingsTemplate, ModelBinder) {

  ServerSettingsView = Backbone.View. extend({
      id: 'server-settings-modal',
      className: 'modal fade',
      model: Settings,
      template: _.template(underi18n.template(settingsTemplate, msgFactory)),

      events: {
        'submit form': 'updateModel',
        'click .close': 'closeModal'
      },

      initialize: function() {			
        this.model = this.options.model || new Settings();		
        this._modelBinder = new Backbone.ModelBinder();
       
      },

      render: function() {
        this.$el.html(this.template({model: this.model}));
        this._modelBinder.bind(this.model, this.el);
        return this;
      },

      closeModal: function() {
        this.$el.modal('hide');
      },

      updateModel:function(){
        var self = this;
        this.model.save();
        self.$el.modal('hide');
        return false;
      }
             
  });
  return ServerSettingsView;
});

