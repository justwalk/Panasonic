define([
  'jquery',
  'underscore',
  'backbone',
  'views/users/user_menu'
], function($, _, Backbone, SchedulesView){
    var SchedulesRouter = Backbone.Router.extend({
        routes:{
            'users' : 'select',
            'users/' : 'select',
            'users/:group_id' : 'select'
        },
         events: {
            'click #resh': 'reshData'
        },
        initialize: function(){
          this.schedulesView = new SchedulesView({router: this});
        },
        
        select: function(group_id){
          this.schedulesView.setGroupid(group_id);
          $('#content-body').html(this.schedulesView.el);
          this.schedulesView.delegateEvents();
        },
        reshData:function(){
          this.schedulesView.setGroupid(group_id);
        }
    });
    
  return SchedulesRouter;
});