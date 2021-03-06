define([
  'jquery',
  'underscore',
  'backbone',
  'views/schedules/tableExport',
  'views/schedules/task',
  'text!templates/schedules/tasks.html',
  'touchPunch',
  'bootstrapDatatables'
], function($, _, Backbone,TableExport,TaskView, tasksTemplate){
    TasksView = Backbone.View.extend({
      template: _.template(underi18n.template(tasksTemplate, msgFactory)),
      initialize: function() {
        this.collection.bind('add reset remove', this.render, this);
        var self=this;
         App.vent.on('tasks:render', function() {
            self.refreshData()
         })
      }, 
      events: {
              'click .select-schedule': 'selectSchedule',
              'click .refreshtask': 'refreshData',
              'click .csvexport':'csvExport'
          },
      
      render: function() {
        var self = this;
        self.$el.html(this.template());
        this.collection.each(function(task) {
          if(self.isSchedule&&task.get('execute')!='schedule'){
            return false;
          }
          var taskView = new TaskView({task: task,collection:self.collection});
          $('#schedules-container', self.el).append(taskView.render().el);
        });
        $('#schedules-table', this.el).dataTable({
          'sDom': 'R<\'row-fluid table-data-search\'<\'datatable-part pull-left\'l>r <\'datatable-part pull-right\' f> > t<\'row-fluid\'<\'datatable-part-medium pull-left\'i><\'datatable-part-medium padding-remove-a pull-right\'p><\'datatable-part-small\' T>>',
          'sPaginationType': 'bootstrap',
          'oLanguage': {
           'sUrl': '/dt.' + App.locale + '.js'
          },oTableTools: {
            'sSwfPath': 'javascripts/vendor/datatable/copy_csv_xls_pdf.swf',
            'aButtons': [],
          },
          'bAutoWidth': true,
          'bDestroy': true,
          'bFilter': true,
          'nTFoot': false,
          'aoColumns' : [
          {sWidth:'5%'},
          {sWidth: '5%'},
          {sWidth: '3%'},
          {sWidth: '8%'},
          {sWidth: '8%'},
          {sWidth: '11%'},
          {sWidth: '13%'},
          {sWidth: '13%'},
          {sWidth: '3%'},
          {sWidth:'0%'},
          {sWidth:'0%'},
          ],
          "aaSorting": [[10, "desc" ],[ 9, "desc" ]],
        }).columnFilter({
          aoColumns: [
          {type: 'text'},
          {type: 'text'},
          {type: 'text'},
          {type: 'date-range'},
          {type: 'date-range'},
          {type: 'select', values: [App.msgFactory('success'), App.msgFactory('failed')]},
         
          ]
        });

        if(self.isSchedule){
          $('#checkbox').attr("checked",'true');
        }else{
          $('#checkbox').removeAttr("checked");
        }
        this.delegateEvents();
      },
      csvExport:function(){
        var values=$('select[name="schedules-table_length"]').val()
        $('select[name="schedules-table_length"]').val("-1");
        $('select[name="schedules-table_length"]').trigger("change.DT");
        $('#schedules-table').tableExport({ignoreColumn: [6,7,8],filename:'taskTable',type:'csv', consoleLog:'true' });
        $('select[name="schedules-table_length"]').val(values);
        $('select[name="schedules-table_length"]').trigger("change");
      },
      selectSchedule:function(ent){
        this.isSchedule=$('#checkbox').is(':checked');
        this.render();
      },
      refreshData:function(){
         this.collection.fetchWithGroupId("");
      }
    });
    return TasksView;
});
