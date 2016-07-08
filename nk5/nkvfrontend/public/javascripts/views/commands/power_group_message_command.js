define([
  'jquery',
  'underscore',
  'backbone',
  'modelBinder',
  'models/task'
  ], function($, _, Backbone, ModelBinder, Task){
 BaseCommand = Backbone.View.extend({
    className: 'modal fade',
    events:{
      'submit .task-form ': 'saveModel',
      'hidden' : 'remove' //the "hidden" event is from bootstrap modal dismiss
    },

    initialize: function() {
      var self = this;
      this.groups = this.options.groups;
      
      _.bindAll(this, 'render', 'weekdaysConverter', 'cycleChangedConverter', 'executeChangedConverter');
      this.model = this.options.task || new Task();
      this.model.set('name', this.groups.get('name'));
        this.model.set('computer_name', this.groups.get('name'));
        this.model.set('computer_uuid', this.groups.get('id'));
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

        //获取 NetKaleido.conf 数据
        socket.emit('various_setting:read', {}, function(err, data) {
            self.model.set('ClientExePath',data.ClientExePath);
        });
    },
    
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
    
    saveModel: function(e) {
      e.preventDefault();
      var self = this;
        //获取Allow Cancel 选中值
        var cancelValue =$("input[name='allow_cancel']:checked").val();
        //获取Allow Message 选中值
        var messageValue =$("input[name='allow_message']:checked").val();
        var second = $('#after_start').val();
        var message = $('#message').val();
        if(self.model.get('action')==="group_poweroff"){
            var command=this.model.get('ClientExePath')+' S ';
        }
        if(self.model.get('action')==="group_restart_action"){
            var command=this.model.get('ClientExePath')+' R ';
        }
        if(null == second || '' == second){
            command+=0+' ';
        }else{
            command+=second+' ';
        }

        if(cancelValue==1){
            command+='Y'+' ';
        }else{
            command+='N'+' ';
        }

        if(messageValue==1){
            command+=message;
        }
        this.model.set('command',command);
        this.model.set('time', $('#time').val()+":00");
        if (this.model.isValid) {
                this.model.save({}, {
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
      return this;
    }
  });
  return BaseCommand;
});