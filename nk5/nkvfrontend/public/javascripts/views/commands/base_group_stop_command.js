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
      this._modelBinder = new ModelBinder();
	  
      // this.bindings = {
        // name: '[name=name]',
        // memo: '[name=memo]',
        // execute:[
          // {selector: '[name=execute]'},
          // {selector: '#schedule-details', elAttribute:'displayed', converter: this.executeChangedConverter}
        // ],
        // cycle: [{selector: '[name=cycle]'}, {selector: '.cycle', converter: this.cycleChangedConverter}],
        // date: '[name=date]',
        // weekdays: {selector:'[name=weekdays]', converter: this.weekdaysConverter, elAttribute:'checked'},
        // month_days: {selector:'[name=month_days]', converter: this.monthDaysConverter},
        // time: '[name=time]'
      // };
      
            
      this.model.bind('error', function(object, message) {
        var errorContainer = $('.task-form .errors', this.el);
        errorContainer.html(JSON.stringify(message));
        errorContainer.show();
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
	  var now = new Date();
	  var now_time = now.getHours() + ":" + (now.getMinutes() < 10 ? '0'+now.getMinutes() : now.getMinutes()) + ":" + (now.getSeconds() < 10 ? '0'+now.getSeconds() : now.getSeconds());
	  var second = $('#after_start').val();
	  if(null == second || '' == second){
		  second = 0;
		  this.model.set('execute', 'now');
	  }else{
		  this.model.set('execute', 'schedule');
	  }
	  var message = "Stop After " + second + " seconds";
	  now.setSeconds(now.getSeconds() + parseInt(second));
	  var after_time = now.getHours() + ":" + (now.getMinutes() < 10 ? '0'+now.getMinutes() : now.getMinutes()) + ":" + (now.getSeconds() < 10 ? '0'+now.getSeconds() : now.getSeconds());

      if (this.model.isValid) {
        this.model.save({computer_uuid: this.groups.get('id'), computer_name: this.groups.get('name'), action: "group_stop", time: after_time}, {
          success: function(model, response) {
            self.$el.modal('hide');
          }
        });
        this.model.save({computer_uuid: this.groups.get('id'), computer_name: this.groups.get('name'), action: "send_group_message", time: now_time, execute: "now", memo: message, command: message}, {
          success: function(model, response) {
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