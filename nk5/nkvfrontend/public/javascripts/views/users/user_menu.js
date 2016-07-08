define([
  'jquery',
  'underscore',
  'backbone',
  'models/user',
  'collection/users',
  'text!templates/users/user_menu.html',
  'views/users/users',
  'views/groups/group',
  'views/users/edit_user_menu',
  'views/users/edit_user',
  'touchPunch',
  'bootstrapDatatables'
        
], function($, _, Backbone,User, SchedulesCollection ,listTemplate, TasksView, GroupView,EditUserMenuView,EditUserView){
    
    var SchedulesView = Backbone.View.extend({
        template : _.template(underi18n.template(listTemplate, msgFactory)),
        events: {
              'click .add_user':'createUser',
              'click .submit':'saveUser',
              'click .remove_user':'removeUser',
              'click .edit_user_menu':'editUserMenu',
              'click .edit_user':'editUser'
          },
        initialize: function() {
          var self = this;
          self.router = self.options.router;
          /*this.groupsCollection = new GroupsCollection();  
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
          this.router.navigate('users'+ (this.group_id ? ('/'+this.group_id) : ''));
          this.collection.fetchWithGroupId(group_id);
        },
                
        render: function() {
          $(this.el).html(this.template());
          $('#main', this.el).html(this.tasksView.el);
          this.tasksView.delegateEvents();
          return this;
        },
      createUser:function(){
         // document.getElementById('add-user-form').reset()
          $('#add-user-form',this.el)[0].reset()
         $('#add_modal').modal();
         $('.submit').val(App.msgFactory('Save'))
      },
      saveUser:function(){
        var data=this.serializeJSON($("#add-user-form"));
        var user=new User(data);
        user.save();
       $('#add_modal').modal('hide');
       this.selectionChanged();
      },
      removeUser:function(){
        if(this.tasksView.getSelectedViews().length>0){
          this.tasksView.getSelectedViews()[0].task.destroy();
          this.selectionChanged();
        }else{
          alert('Please select users');
        }
        
      },
      editUserMenu:function(){
        if(this.tasksView.getSelectedViews().length>0){
           var editUserMenuView = new EditUserMenuView(this.tasksView.getSelectedViews()[0].task);
           $("#modal-container").html(editUserMenuView.render().$el.modal());
        }else{
           alert('Please select users');
        }
          
       
      },
      editUser:function(){
        if(this.tasksView.getSelectedViews().length>0){
           var editUserView = new EditUserView({model:this.tasksView.getSelectedViews()[0].task,father:this});
           $("#modal-container").html(editUserView.render().$el.modal());
        }else{
           alert('Please select users');
        }
      },
      serializeJSON:function(ev){
         var obj = {};
            var count = 0;
            $.each(ev.serializeArray(), function (i, o) {
                var n = o.name, v = o.value;
                count++;
                obj[n] = obj[n] === undefined ? v
                : $.isArray(obj[n]) ? obj[n].concat(v)
                : [obj[n], v];
            });
            return obj;
      }
    });
    return SchedulesView;
});
