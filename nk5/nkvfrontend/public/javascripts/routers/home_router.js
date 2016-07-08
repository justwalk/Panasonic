define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/home'
], function($, _, Backbone, HomeView){
    var homeRouter = Backbone.Router.extend({
        routes:{
            ''     : 'defaultRoute',
            'home' : 'select',
            'home/' : 'select'
        },

        initialize: function(){
          //var serverCollection = new ServerCollection();
          this.homeView = new HomeView({router:this});
        },
        
        select: function(){
          //this.homeView.collection.fetch();
          $('#content-body').html(this.homeView.el);
          this.homeView.delegateEvents();
          
        },

        defaultRoute: function(){
          window.location = '#home';
          //Backbone.history.navigate('servers', true);
        }
    });
    
  return homeRouter;
});