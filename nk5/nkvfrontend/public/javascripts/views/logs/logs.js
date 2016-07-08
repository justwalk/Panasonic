define([
  'jquery',
  'underscore',
  'backbone',
  'collection/logs',
  'text!templates/logs/logsview.html',
  'views/logs/logsViews',
  'views/groups/group',
  'touchPunch',
  'bootstrapDatatables'
],function($, _, Backbone, SchedulesCollection ,listTemplate, TasksView, GroupView){
    
    var SchedulesView = Backbone.View.extend({
        template : _.template(underi18n.template(listTemplate, msgFactory)),
      
        
                
        initialize: function() {
          var self = this;
          self.router = self.options.router;
          
        /*  this.groupsCollection = new GroupsCollection();
          this.groupsCollection.bind('add remove reset', this.render, this);
          this.groupsCollection.fetch({});*/
          
          this.collection = new SchedulesCollection();
          this.tasksView = new TasksView({collection: this.collection});
          this.render();
        },
        
        resetClickedSchedule: function(schedule) {
          if (this.clickedSchedule.get(schedule.id)) {
            this.clickedSchedule.reset([]);
          }else {
            this.clickedSchedule.reset([schedule]);
          }
        },

        selectionChanged: function(){
          this.setGroupid($('#group-select', this.el).val());
        },

        setGroupid: function(group_id) {
          this.group_id = group_id ? group_id : '';
          $('#group-select', this.el).val(this.group_id);
          this.router.navigate('logs'+ (this.group_id ? ('/'+this.group_id) : ''));
          this.collection.fetchWithGroupId(group_id);
        },
                
        render: function() {
          var self = this;
          $(this.el).html(this.template());
          $('#main', this.el).html(this.tasksView.el);
          this.tasksView.delegateEvents();
          return this;
        }
    });
    return SchedulesView;
});
