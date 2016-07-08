define([
  'jquery',
  'underscore',
  'backbone',
  'models/server',
  'text!templates/servers/creates_server.html',
  'modelBinder'
], function($, _, Backbone, Server, createsServer, ModelBinder){

  var CreatesServerView = Backbone.View.extend({
    id:'add-server-modal',
    className: 'modal fade',
    template: _.template(underi18n.template(createsServer, msgFactory)),
    
    events:{
      'submit #creates-server-form': 'saveModel',
      'hidden' : 'remove' //the 'hidden' event is from bootstrap modal dismiss
    },
    
    initialize: function() {
      var self = this;
      this.model = new Server();
      this._modelBinder = new Backbone.ModelBinder();
    },
    
    saveModel: function(e) {
      alert("aaa");
      var self = this;
      $('input[type=submit]', self.el).attr('alt',$('input[type=submit]',self.el).val());
      $('input[type=submit]', self.el).attr('disabled', 'disabled').val(App.msgFactory('Please wait...'));
      this._modelBinder.bind(this.model, this.el);
      this.model.save({}, {
        success: function(model, response) {
          self.$el.modal('hide');
        }
      });
      return false;
    },
    
    render: function() {
      this.delegateEvents();
      $(this.el).html(this.template({model:this.model}));
      this._modelBinder.bind(this.model, this.el);

      return this;
    }
  });
  return CreatesServerView;
});
