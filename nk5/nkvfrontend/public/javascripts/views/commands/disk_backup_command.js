define([
  'jquery',
  'underscore',
  'backbone',
  'modelBinder',
  'models/task',
  'collection/base_disks'
  ], function($, _, Backbone, ModelBinder, Task,BaseDiskCollection){
 BaseCommand = Backbone.View.extend({
    className: 'modal fade',
    events:{
      'submit .task-form ': 'saveModel',
      'hidden' : 'remove'
    },

    initialize: function() {
        _.bindAll(this);
      var self = this;
        this.diskView = this.options.diskView;
        this.IOServerIP = this.options.IOServerIP;
        this.IOServerId = this.options.IOServerId;
      _.bindAll(this, 'render', 'weekdaysConverter', 'cycleChangedConverter', 'executeChangedConverter');
      this.model = this.options.task || new Task();
        this.model.set('name', this.diskView.get('Name'));
        this.model.set('computer_name', this.IOServerIP);
        this.model.set('command', this.IOServerId);
        this.model.set('computer_uuid', this.diskView.get('ID'));
      this._modelBinder = new ModelBinder();
        this.bindings = {
            name: '[name=name]',
            memo: '[name=memo]',
            execute:[
                {selector: '[name=execute]'},
                {selector: '#schedule-details', elAttribute:'displayed', converter: this.executeChangedConverter}
            ],
            cycle: [{selector: '[name=cycle]'}, {selector: '.cycle', converter: this.cycleChangedConverter}],
            date: '[name=date]',
            weekdays: {selector:'[name=weekdays]', converter: this.weekdaysConverter, elAttribute:'checked'},
            month_days: {selector:'[name=month_days]', converter: this.monthDaysConverter},
            time: '[name=time]'
        };
      this.model.bind('error', function(object, message) {
        var errorContainer = $('.task-form .errors', this.el);
        errorContainer.html(JSON.stringify(message));
        errorContainer.show();
      });
        this.parentDisks = new BaseDiskCollection();
        this.parentDisks.bind('add remove reset', self.renderParentDisks);
    },

    // when  时间帅选 ###############################
    monthDaysConverter: function(direction, value, attribute, model) {
      return direction=='ViewToModel' ? value.join(',') : value.split(',');
    },

    cycleChangedConverter: function(direction, value, attribute, model) {
      $('#once, #weekly, #monthly', this.el).addClass('hide');
      $('#'+model.get('cycle'), this.el).removeClass('hide');
    },

    weekdaysConverter: function(direction, value, attribute) {
      var self = this;
      if (direction=='ViewToModel') {
        var weekdays = [];
        $('[name=weekdays]:checked', self.el).each(function() { weekdays.push(this.value); });
        return weekdays.join(',');
      }else{
        _.forEach(value.split(','), function(day) {
          $('#weekdays_'+day, self.el).attr('checked', true);
        });
      }
      
    },

    executeChangedConverter: function(direction, value, attribute, model){
      if (value=='now') {
        this.model.set('cycle', 'once');
      }
      return value!='now';
    },
    // 保存 #########################################
    saveModel: function(e) {
        e.preventDefault();
        var self = this;
        // 获取derectory输入值
        var derectory=$("#derectory").val();
        this.model.set('prefix', derectory);
        // 获取备份数
        var backNumber=$("#backNumber").val();
        this.model.set('start_number', backNumber);
        if (this.model.isValid) {
                this.model.save({action: "disk_backup"}, {
                    success: function (model, response) {
                        self.$el.modal('hide');
                    }
                });
        }
        return false;
    },


    render: function() {
      var self = this;
      $(this.el).html(this.template({model:this.model}));
      this._modelBinder.bind(this.model, this.el, this.bindings);
      $('.datepicker', this.el).datepicker({dateFormat: 'dd/mm/yy'});
        this.parentDisks.fetch();
      return this;
    }
  });
  return BaseCommand;
});