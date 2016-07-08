define([
  'jquery',
  'underscore',
  'backbone',
  'models/user',
  'text!templates/users/edit_user.html',
  'modelBinder'
    ], function($, _, Backbone, Settings, settingsTemplate, ModelBinder) {
    
      EditUserView = Backbone.View. extend({
        id: 'server-settings-modal',
        className: 'modal fade modal-lg ',
        model: Settings,
        template: _.template(underi18n.template(settingsTemplate, msgFactory)),

        events: {
          'submit form': 'updateModel',
          'click .close': 'closeModal'
        },

        initialize: function(pram) {
          this.model = pram.model;
         /* var self=this;
          this.model.fetch({success: function(data){
             self.model=data;
             self.model.set('OldPassWD',self.model.get('PassWD'))
          }});
*/
          this.father=pram.father;
          this._modelBinder = new Backbone.ModelBinder();
         
        },

        render: function() {
          this.$el.html(this.template({model: this.model}));
          this._modelBinder.bind(this.model, this.el);
          return this;
        },

        updateModel: function(ev) {
          var self =this;
           self.closeModal();
          ev.preventDefault(); 
          console.log(this.model.toJSON());
          this.model.save({}, {
            success: function(model, response) {
              self.closeModal();
              self.father.selectionChanged();
            }
          });
          return false;
        },

        closeModal: function() {
          this.$el.modal('hide');
        }
      });

      return EditUserView;
    });

