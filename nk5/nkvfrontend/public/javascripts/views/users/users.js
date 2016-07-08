define([
  'jquery',
  'underscore',
  'backbone',
  'views/users/user',
  'text!templates/users/users.html',
  'touchPunch',
  'bootstrapDatatables'
], function($, _, Backbone, TaskView, tasksTemplate){
    TasksView = Backbone.View.extend({
      template: _.template(underi18n.template(tasksTemplate, msgFactory)),
      initialize: function() {
        this.collection.bind('add reset remove', this.render, this);
       
      }, 
      events: {
              'click .refreshtask': 'refreshData',
          },
      
      render: function() {
        var self = this;
        self.$el.html(this.template());
         this.usersView=[];
        this.collection.each(function(task) {
          var taskView = new TaskView({task: task});
           self.usersView.push(taskView);
          $('#schedules-container', self.el).append(taskView.render().el);
        });
        $('#schedules-table', this.el).dataTable({
          'sDom': 'R<\'row-fluid table-data-search\'<\'datatable-part pull-left\'l>r <\'datatable-part pull-right\' f> > t<\'row-fluid\'<\'datatable-part-medium pull-left\'i><\'datatable-part-medium padding-remove-a pull-right\'p><\'datatable-part-small\' T>>',
          'sPaginationType': 'bootstrap',
          'oLanguage': {
           'sUrl': '/dt.' + App.locale + '.js'
          },
          oTableTools: {
            'sSwfPath': 'javascripts/vendor/datatable/copy_csv_xls_pdf.swf',
            'aButtons': [],
          },
          'bAutoWidth': false,
          'bDestroy': false,
          'bFilter': true,
          'nTFoot': false,
          'aoColumns' : [
          {sWidth: '25%'},
          {sWidth: '25%'},
          {sWidth: '25%'},
          {sWidth: '25%'},
          ],
          "aaSorting": [[ 0, "asc" ]],
        });
        this.delegateEvents();
      },
      refreshData:function(){
         this.collection.fetch();
      },
      getSelectedViews: function() {
        return _.filter(this.usersView, function(serverView) { return serverView.isSelected; });
      }
       });
    return TasksView;
});