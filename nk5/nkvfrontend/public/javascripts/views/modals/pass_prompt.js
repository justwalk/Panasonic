define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/modals/pass_prompt.html',
  'msgFactory'
], function($, _, Backbone, tmpl, msgFactory){
  var PassPrompt = Backbone.View.extend({
    id:'login-modal',
    template: _.template(underi18n.template(tmpl, msgFactory)),
  events: {
    'submit form':  'submitPass',
    'click #submit-pass':  'submitPass',
    'change select': function(ev) {
  
      if (this.$('#language-select').val() != App.locale) {
        App.locale = this.$('#language-select').val();
        App.vent.trigger('change:locale');
      }
  }
  },

    submitPass: function() {
      App.user = this.$('#user-input').val();
      App.pass = this.$('#password-input').val();
      var links="";
      var self=this;
	   socket.emit('user:check',{user:App.user,pass:App.pass}, function(err, msg) {
       if(!err){
        var menu={};
        for(var i in msg.means){
          menu[msg.means[i].menuid]=true;
        }
        App.id=msg.user.id;
        App.menu=menu; 
        App.info=msg.user;
        $(self.el).html(self.template({user: App.user, links: links}));
       App.vent.trigger('change:user');

      self.$el.modal('hide');
      App.vent.trigger('change:pass');
      
       }
      })
     if (self.$('#language-select').val() != App.locale) {
        App.locale = self.$('#language-select').val();
        App.vent.trigger('change:locale');
      }
      return false;
    },

    render: function() {
      this.$el.html(this.template()).modal({
        backdrop: 'static'
      });
      this.$('option').each(function() {
        if ($(this).val() == App.locale) $(this).prop('selected', true);
      });
      return this;
    },

    show: function() {

      this.$el.modal('show');
    }
  });
  return PassPrompt;
});

