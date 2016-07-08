define([
  'jquery',
  'underscore',
  'backbone',
  'views/logs/logs'
], function($, _, Backbone, LogsView){
    var LogsRouter = Backbone.Router.extend({
        routes:{
            'logs' : 'select',
            'logs/' : 'select'
        },

        initialize: function(){
          this.logsView = new LogsView({router: this});
        },
        
        select: function(){
          $('#content-body').html(this.logsView.el);
          this.logsView.delegateEvents();
          this.logsView.setGroupid('');
        }
    });
    
  return LogsRouter;
});