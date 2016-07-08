define([
  'require',
  'jquery',
  'underscore',
  'backbone',
  'rsvp',
  'views/loading_screen',
  'views/commands/start_computer',
  'views/commands/start_update_computer',
  'views/commands/end_update_computer',
  'views/commands/stop_computer',
  'views/commands/power_off',
  'views/commands/start_device',
  'views/commands/restart_computer',
  'views/commands/send_command',
  'views/commands/start_group', //byt add start 20160317
  'views/commands/stop_group', //byt add start 20160322
  'views/commands/restart_group', //byt add start 20160322
  'views/commands/send_message', //byt add start 20160324
  'views/commands/send_group_message', //byt add start 20160331
  'views/commands/power_group_message', //byt add start 20160331
  'views/commands/device_group_message', //byt add start 20160331
  'views/commands/send_group_command', //byt add start 20160331
  'views/commands/group_logout', //byt add start 20160331
  'views/commands/logout',
  'views/commands/change_mac',
  'views/commands/naming_pattern'
], function(require, $, _, Backbone, RSVP, LoadingView) {
  var ContextCommands = Backbone.View.extend({
    events: {
      'click .start': 'startComputers',
      'click .stop': 'stopComputers',
      'click .restart': 'restartComputers',
      'click .send-cmd': 'sendCommand',
      'click .send-msg': 'sendMessage',
      // 'click .auto-login': 'autoLogin',
      'click .logout': 'logoutComputers',
      'click .change-mac': 'changeMac',
      'click .naming-pattern': 'namingPattern',
      // 'click .lock-position': 'lockComputers',
      // 'click .unlock-position': 'unlockComputers'

    },
    initialize: function() {
      this.parentView = this.options.parentView;
      this.clickedComputer = this.options.clickedComputer;
      this.clickedComputer.bind('reset', this.toggleCommandAvailability, this);
      this.bind('recheck', this.toggleCommandAvailability, this);
      this.collection.bind('toggleSelected', this.toggleCommandAvailability, this);
    },

    lockComputers: function() {
      var self = this;
      _(this.getActiveComputers()).forEach(function(computer) {
        if (computer.get('locked') === false) {
          computer.set('locked', true);
          computer.trigger('rerender');
          computer.save({}, {
            success: function(model, response) {
              self.trigger('recheck');
            }
          });
        }
      });
    },

    unlockComputers: function() {
      var self = this;
      _(this.getActiveComputers()).forEach(function(computer) {
        if (computer.get('locked') === true) {
          computer.set('locked', false);
          computer.save({}, {
            success: function(model, response) {
              self.trigger('recheck');
              computer.trigger('rerender');
            }
          });
        }
      });
    },
    //byt add start 20160322
    getGroup: function() {
      var self = this;
      var data = this.options.parentView.collection._byCid;
      var group = '';
      for (var a in data) {
        if (data[a].get('id') == self.options.collection.group_id) {
          group = data[a];
        }
      }
      return this.group = group;
    },
    //byt add end 20160322

    //byt change start 20160317
    startComputers: function() {
      if (this.options.collection.group_id > 0 && this.options.collection.length == this.collection.selectedComputers().length) {
        var startGroupView = new(require('views/commands/start_group'))({
          groups: this.getGroup()
        });
        startGroupView.render().$el.appendTo($('#modal-container')).modal();
        $('#task_name', startGroupView.el).focus();
      } else if (this.options.collection.group_id == 0 || this.collection.selectedComputers().length) {
        var startComputerView = new(require('views/commands/start_computer'))({
          computers: this.getActiveComputers()
        });
        startComputerView.render().$el.appendTo($('#modal-container')).modal();
        $('#task_name', startComputerView.el).focus();
      }

    },
    //byt change end 20160317

    //byt change start 20160322
    stopComputers: function() {
      if (this.options.collection.group_id > 0 && this.options.collection.length == this.collection.selectedComputers().length) {
        var stopGroupView = new(require('views/commands/stop_group'))({
          groups: this.getGroup()
        });
        stopGroupView.render().$el.appendTo($('#modal-container')).modal();
        $('#task_name', stopGroupView.el).focus();
      } else if (this.options.collection.group_id == 0 || this.collection.selectedComputers().length) {
        var stopComputerView = new(require('views/commands/stop_computer'))({
          computers: this.getActiveComputers()
        });
        stopComputerView.render().$el.appendTo($('#modal-container')).modal();
        $('#task_name', stopComputerView.el).focus();
      }

    },

    restartComputers: function() {
      if (this.options.collection.group_id > 0 && this.options.collection.length == this.collection.selectedComputers().length) {
        var restartGroupView = new(require('views/commands/restart_group'))({
          groups: this.getGroup()
        });
        restartGroupView.render().$el.appendTo($('#modal-container')).modal();
        $('#task_name', restartGroupView.el).focus();
      } else if (this.options.collection.group_id == 0 || this.collection.selectedComputers().length) {
        var restartComputerView = new(require('views/commands/restart_computer'))({
          computers: this.getActiveComputers()
        });
        restartComputerView.render().$el.appendTo($('#modal-container')).modal();
        $('#task_name', restartComputerView.el).focus();
      }
    },

    sendCommand: function() {
      if (this.options.collection.group_id > 0 && this.options.collection.length == this.collection.selectedComputers().length) {
        var sendGroupCommandView = new(require('views/commands/send_group_command'))({
          groups: this.getGroup()
        });
        sendGroupCommandView.render().$el.appendTo($('#modal-container')).modal();
        $('#task_name', sendGroupCommandView.el).focus();
      } else if (this.options.collection.group_id == 0 || this.collection.selectedComputers().length) {
        var sendCommandView = new(require('views/commands/send_command'))({
          computers: this.getActiveComputers()
        });
        sendCommandView.render().$el.appendTo($('#modal-container')).modal();
        $('#task_name', sendCommandView.el).focus();
      }
    },

    sendMessage: function() {
      if (this.options.collection.group_id > 0 && this.options.collection.length == this.collection.selectedComputers().length) {
        var sendGroupMessageView = new(require('views/commands/send_group_message'))({
          groups: this.getGroup()
        });
        sendGroupMessageView.render().$el.appendTo($('#modal-container')).modal();
        $('#task_name', sendGroupMessageView.el).focus();
      } else if (this.options.collection.group_id == 0 || this.collection.selectedComputers().length) {
        var sendMessageView = new(require('views/commands/send_message'))({
          computers: this.getActiveComputers()
        });
        sendMessageView.render().$el.appendTo($('#modal-container')).modal();
        $('#task_name', sendMessageView.el).focus();
      }
    },

    autoLogin: function() {},

    logoutComputers: function() {
      if (this.options.collection.group_id > 0 && this.options.collection.length == this.collection.selectedComputers().length) {
        var groupLogoutView = new(require('views/commands/group_logout'))({
          groups: this.getGroup()
        });
        groupLogoutView.render().$el.appendTo($('#modal-container')).modal();
        $('#task_name', groupLogoutView.el).focus();
      } else if (this.options.collection.group_id == 0 || this.collection.selectedComputers().length) {
        var logoutView = new(require('views/commands/logout'))({
          computers: this.getActiveComputers()
        });
        logoutView.render().$el.appendTo($('#modal-container')).modal();
        $('#task_name', logoutView.el).focus();
      }
    },

    changeMac: function() {
      var changeMacView = new(require('views/commands/change_mac'))({
        computers: this.getActiveComputers()
      });
      changeMacView.render().$el.appendTo($('#modal-container')).modal();
      $('#task_name', changeMacView.el).focus();
    },

    namingPattern: function() {
      var namingPatternView = new(require('views/commands/naming_pattern'))({
        computers: this.getActiveComputers()
      });
      namingPatternView.render().$el.appendTo($('#modal-container')).modal();
      $('#task_name', namingPatternView.el).focus();
    },



    getActiveComputers: function() {
      if (this.collection.selectedComputers().length) {
        return this.collection.selectedComputers();
      } else if (this.clickedComputer.length) {
        return this.clickedComputer.models;
      } else {
        return false;
      }
    },

    toggleCommandAvailability: function(computer, collection, currentIndex) {
      var activeComputers = this.getActiveComputers();
      var filterActiveComputers = _(activeComputers).filter(function(computer) {
        return computer.get('locked') == true;
      });

      $('.lock-position', this.el).show();
      $('.unlock-position', this.el).show();
      if (activeComputers.length == filterActiveComputers.length) {
        $('.lock-position', this.el).hide();
      } else {
        if (filterActiveComputers.length === 0) {
          $('.unlock-position', this.el).hide();
        }
      }
      if (activeComputers) {
        $('button', this.el).removeAttr('disabled');
      } else {
        $('button', this.el).attr('disabled', 'disabled');
      }
    }

  });

  return ContextCommands;
});