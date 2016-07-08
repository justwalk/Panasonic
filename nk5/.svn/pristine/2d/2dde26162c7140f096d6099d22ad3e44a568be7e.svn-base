define([
  'jquery',
  'underscore',
  'backbone',
  'modelBinder',
  'models/task',
  'collection/menus',
  ], function($, _, Backbone, ModelBinder, Task, MenuCollection){
 BaseOptionSettingComputer = Backbone.View.extend({
    className: 'modal fade',
    events:{
      'submit .task-form ': 'saveModel',
      'hidden' : 'remove' //the "hidden" event is from bootstrap modal dismiss
    },

    initialize: function() {
      var self = this;
      this.computers = this.options.computers;
        var name = '';
        var computer_uuid = '';
        if(this.computers.length == 1){
          name += this.computers[0].get('name');
          computer_uuid += this.computers[0].id;
        }else{
        this.computers.forEach(function(computer) {
          name += computer.get('name') + " | ";
          computer_uuid += computer.id + "|";
          });
        name = name.substring(0,name.lastIndexOf('|'));
        computer_uuid = computer_uuid.substring(0,computer_uuid.lastIndexOf('|'));
        }
        this._modelBinder = new Backbone.ModelBinder();
        this.menus = '<option value="0">'+ App.msgFactory('None') +'</option>';
        var menuCollection = this.options.defaultMenu;
     
        this.menuCollectionNew=new MenuCollection(menuCollection);
        //menuCollectionNew.fetchWithComputerId(this.model.get('id'));
        this.menuCollectionNew.forEach( function (menu) {
            self.menus += '<option value="' + menu.get('id') + '">' + menu.get('name') + '</option>';
        });
     
      
      
      _.bindAll(this, 'render', 'weekdaysConverter', 'cycleChangedConverter', 'executeChangedConverter');
      this.model = this.options.task || new Task();
      this.model.set('name', name);
      this.model.set('computer_uuid', computer_uuid);
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
        time: '[name=time]',
        computer_uuid: '[name=computer_uuid]'
        
      };
      
            
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
      this.model.set('time', $('#time').val()+":00");
      if (this.model.isValid) {

        if (this.computers.length > 1) {
          _(this.computers).forEach(function(comp) {
            self.model.save({computer_uuid: comp.id, computer_name: comp.get('name')}, {
              success: function(model, resp) {
                self.$el.modal('hide');
              }
            });
          });

        } else {
        this.model.save({computer_uuid: this.computers[0].id, computer_name: this.computers[0].get('name')}, {
          success: function(model, response) {
            self.$el.modal('hide');
          }
        });
        }
      }
      return false;
    },


    render: function() {
      var self = this;
      $(this.el).html(this.template({model:this.model,menus:this.menus}));
      this._modelBinder.bind(this.model, this.el, this.bindings);
      $('.datepicker', this.el).datepicker({dateFormat: 'dd/mm/yy'});
      return this;
    }
  });
  return BaseOptionSettingComputer;
});