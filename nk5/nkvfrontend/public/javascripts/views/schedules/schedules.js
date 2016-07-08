define([
  'jquery',
  'underscore',
  'backbone',
  'collection/schedules',
  'text!templates/schedules/schedules.html',
  'collection/groups',
  'views/schedules/tasks',
  'views/groups/group',
  'touchPunch',
  'bootstrapDatatables'
], function($, _, Backbone, SchedulesCollection ,listTemplate, GroupsCollection, TasksView, GroupView){
    
    var SchedulesView = Backbone.View.extend({
        template : _.template(underi18n.template(listTemplate, msgFactory)),
        events: {
              'click .remove-task': 'removeTask',
              'click #save':'saveDate',
              'click .update-task':'updateTask'
          },
        initialize: function() {
          var self = this;
          self.router = self.options.router;
          this.collection = new SchedulesCollection();
          this.tasksView = new TasksView({collection: this.collection,selected:self.options.selected});
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
          this.router.navigate('schedule'+ (this.group_id ? ('/'+this.group_id) : ''));
          this.collection.fetchWithGroupId(group_id);
        },
                
        render: function() {
          $(this.el).html(this.template());
          $('#main', this.el).html(this.tasksView.el);
          this.tasksView.delegateEvents();

          return this;
        },
      removeTask:function(){
        $('.datepicker', this.el).datepicker({dateFormat: 'dd/mm/yy'});
        $('#task-date').modal();
      },
      saveDate:function(){
         $('#task-date').modal('hide');
         $('#datetime').text($('input[name="date"]').val());
         $('#myModal').modal();
      },
      updateTask:function(){
        var self=this;
         var date=$('input[name="date"]').val();
          $('.update-task').attr('disabled', 'disabled').val(App.msgFactory('Please wait...'));
          socket.emit('task:removeBydate', {'date':date}, function(err, data) {
             $('#myModal').modal('hide');
              $('.update-task').removeAttr('disabled').val(App.msgFactory('Enter'));
              $('input[name="date"]').val('');
              self.selectionChanged();
            })
      }
    });
    return SchedulesView;
});