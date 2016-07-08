define([
  'jquery',
  'underscore',
  'backbone',
  'collection/various_setting',
  'views/various_setting/various_setting'
], function($, _, Backbone, VariousSettingCollection, VariousSettingView){
    var VariousSettingRouter = Backbone.Router.extend({
        routes:{
            'various_setting' : 'select',
            'various_setting/' : 'select'
        },

        initialize: function(){
          var variousSetting = new VariousSettingCollection();
          this.variousSettingView = new VariousSettingView({router: this, collection: variousSetting});
        },
        
        select: function(group_id){
          $('#content-body').html(this.variousSettingView.el);
          //this.variousSettingView.openSettings();  //直接显示页面
          this.variousSettingView.delegateEvents();
        }
    });
    
  return VariousSettingRouter;
});