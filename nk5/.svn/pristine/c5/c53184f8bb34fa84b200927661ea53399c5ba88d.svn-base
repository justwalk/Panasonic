define([
  'jquery',
  'underscore',
  'backbone',
  'models/settings',
  'text!templates/schedules/remove-task.html',
  'modelBinder'
    ], function($, _, Backbone, Settings, settingsTemplate, ModelBinder) {
    
      ServerSettingsView = Backbone.View. extend({
        id: 'server-settings-modal',
        className: 'modal fade modal-lg ',
        model: Settings,
        template: _.template(underi18n.template(settingsTemplate, msgFactory)),
        events: {
          'submit form': 'updateModel',
          'click .close': 'closeModal',
          'click #save':'saveModel',
        },
        initialize: function(settings) {
          this.$el.html(this.template());
           $('.datepicker', this.el).datepicker({dateFormat: 'dd/mm/yy'});
        },
        render: function() {
          return this;
        },
        updateModel: function(ev) {
          var self =this;
           self.closeModal();
          ev.preventDefault(); 
          $('input[type=submit]', self.el).attr('alt',$('input[type=submit]',self.el).val());
          $('input[type=submit]', self.el).attr('disabled', 'disabled').val(App.msgFactory('Please wait...'));
           this.model.set({'BootServer1':this.model.get('BootSrv')})
          if(this.model.get('Password')==this.model.get('rePassword')&&this.model.get('Password')&&this.model.get('rePassword')){
            this.model.set({'PassWD':this.model.get('Password')})
          }
          this.model.save({}, {
            success: function(model, response) {
              self.closeModal();
            }
          });
          return false;
        },

        closeModal: function() {
          this.$el.modal('hide');
        },
        saveModel:function(){
          alert(1)
          this.$el.modal('hide');
          $('#myModal').modal();
        }
      });

      return ServerSettingsView;
    });

