define([
  'jquery',
  'underscore',
  'backbone',
  'rsvp',
  'models/server',
  'views/servers/server',
  'text!templates/servers/grid_view.html',
  'text!templates/servers/list_view.html',
  'views/servers/add_server',
  'views/servers/creates_server',
  'views/servers/edit_server',
  'views/servers/edit_directory',
  'views/servers/options_server',
  'views/servers/settings',
  'views/servers/license',
  'views/servers/start_server',
  'views/servers/restart_server',
  'views/servers/stop_server',
  'views/servers/bootrestart_server',
  'views/servers/serverScriptExe',
  'bootstrapDatatables'
], function($, _, Backbone,RSVP, Server, ServerView, serversGrid, serversList, AddServerView, CreatesServerView, EditServerView,EditDirectoryView, OptionsServerView, ServerSettingsView, LicenseServerView, RestartServerView,StopServerView,BootRestartServerView){
    var ServersView = Backbone.View.extend({
      template: _.template(underi18n.template(serversGrid, msgFactory)),
      events: {
        'click .servers-actions .add-server': 'addServer',
        'click .servers-actions .remove-server': 'removeServer',
        'click .switch-view': 'switchView',
        'click .select-all': 'selectAll',
        'click .select-none': 'selectNone',
        'click .select-invert': 'selectInvert',
        'click .select-Refresh': 'selectRefresh',
        'click .add-server': 'addServer',
        'click .creates-server': 'createsServer',
        'click .edit-server': 'editServer',
        'click .edit-directory': 'editDirectory',
        'click .remove-server': 'removeServer',
        'click .server-options': 'optionsServer',
        'click .backupLink': 'backupLink',
        'click .settings':   'openSettings',
         'click .license':   'license',
        'click .start-servers': 'startServers',
        'click .restart-servers': 'restartServers',
        'click .stop-server': 'stopServer',
        'click .serverScriptExe': 'serverScriptExe',
        'click .bootrestart-server': 'bootrestartServers',
        'click :not(.servers-actions .add-server .edit-server .remove-server .switch-view .select-all .select-none .select-invert .server-options .backupLink .license .settings .restart-servers .stop-server .bootrestart-server)': 'clickClose'
      },
      initialize: function(options) {
        var self = this;
        _.bindAll(this);
        self.router = self.options.router;
        self.list = false;
        self.template = self.list ? _.template(underi18n.template(serversList, App.msgFactory)) : _.template(underi18n.template(serversGrid, App.msgFactory));
        self.collection.bind('add reset', function(servers){
          self.render();
        });
        this.serverViews = [];
      },

      //wangxin add start 20160421
      serverScriptExe: function(){
  
          var serverScriptView = new (require('views/servers/serverScriptExe'))();
          serverScriptView.render().$el.appendTo($('#modal-container')).modal();
          $('#ip', serverScriptView.el).focus();
          
      },
      //wangxin add end 20160421
	  
	    backupLink: function(){
    		window.socket.emit('message:backup', {}, function(err, data) {
          if(err)
    				return;
    			
    			window.location = '/backup.zip';
    		});
	    },

      clickClose: function(){
        if($('.server-logo').attr('no-hide') == 'true' ){
          return;
        }else{
          $('.server-logo', this.model).removeClass('detailed');
        }
      },
/**
*/
      resetClickedServer: function(server) {
        if (this.clickedServer.get(server.id)) {

          this.clickedServer.reset([]);
        }else {
          this.clickedServer.reset([server]);
        }
      },
      
      getSelectedViews: function() {
       
        return _.filter(this.serverViews, function(serverView) { 
          return serverView.isSelected; });
      },
      
      removeServer: function() {
        var ja = underi18n.MessageFactory(locale);
        if (this.getSelectedViews().length > 0) {
          var r = confirm(ja('Are you sure you want to delete it?'));
          if (r === true) {
                _(this.getSelectedViews()).forEach(function(serverView) {
                  serverView.model.destroy({
                    wait:true,
                    error: function(obj, resp) {
                    alert(resp.error+' id: '+obj.id);
                  }
                });
              });
          }
        }
        else{
          alert(ja('Please select one server at least to delete.'));
        }
      },
      
      switchView: function(e) {
        this.list = !this.list;
        if ($('#switch-list').hasClass("show_item")) {
          // list mode
          $('#switch-grid').removeClass('hide_item').addClass('show_item');
          $('#switch-list').removeClass('show_item').addClass('hide_item');
        } else {
          // grid mode
          $('#switch-grid').removeClass('show_item').addClass('hide_item');
          $('#switch-list').removeClass('hide_item').addClass('show_item');
        }
        this.render();
      },

      selectAll: function() {
        App.vent.trigger('servers:change:selection:all');
      },

      selectNone: function() {
        App.vent.trigger('servers:change:selection:none');
      },

      selectInvert: function() {
        App.vent.trigger('servers:change:selection:invert');
      },

      addServer: function(e) {
        var addServerView = new AddServerView({parentView:this});
        addServerView.render().$el.appendTo($('#modal-container')).modal();
        $('input:visible:first', addServerView.el).focus();
      },
      createsServer: function(e) {
        var createsServerView = new CreatesServerView({parentView:this});
        createsServerView.render().$el.appendTo($('#modal-container')).modal();
        $('input:visible:first', createsServerView.el).focus();
      },
	  

     //xiongpanan add start 2016/4/18
     license: function() {
        var self=this;
        _.bindAll(this, 'render');
        socket.emit("servers:aboutInfo",{},function(err,data){
          var server =new Server(data);
          self.licenseServerView = new LicenseServerView({model:server});
          self.licenseServerView.render().$el.appendTo($('#modal-container')).modal();
          $('input:visible:first', self.licenseServerView.el).focus();
        });

     //xiongpanan add end 2016/4/18

        // var licenseServerView = new LicenseServerView({parentView:this});
        // licenseServerView.render().$el.appendTo($('#modal-container')).modal();
        // $('input:visible:first', licenseServerView.el).focus();
      },

	    editServer: function() {
          var ja = underi18n.MessageFactory(locale);
          if (this.getSelectedViews().length > 0) {
        	var editServerView = new EditServerView({model:this.getSelectedViews()[0].model});
            editServerView.render().$el.appendTo($('#modal-container')).modal();
            $('input:visible:first', editServerView.el).focus();
          }else{
            alert(ja('Please select a ioserver to edit.'));
          }
      },

 
      editDirectory: function() {
          var ja = underi18n.MessageFactory(locale);
          if (this.getSelectedViews().length > 0) {
              if(this.getSelectedViews()[0].model && this.getSelectedViews()[0].model.get('Type')!='Secondary'){
                  var editDirectoryView = new EditDirectoryView({model:this.getSelectedViews()[0].model});
                  editDirectoryView.render().$el.appendTo($('#modal-container')).modal();
                  $('input:visible:first', editDirectoryView.el).focus();
              }else{
                  alert(ja('This is not an IO server.'));
              }

          }else{
              alert(ja('Please select a ioserver to edit.'));
          }
      },
      
      optionsServer: function(e) {
        var optionsServer = new OptionsServerView({parentView:this});
        optionsServer.render().$el.appendTo($('#modal-container')).modal();
        $('input:visible:first', optionServer.el).focus();
      },
      selectRefresh:function(e){
        Backbone.history.loadUrl();
      }, 

      render: function() {
        var self = this;
        self.template = self.list ? _.template(underi18n.template(serversList, App.msgFactory)) : _.template(underi18n.template(serversGrid, msgFactory));
        self.$el.html(self.template());
        this.serverViews = [];
        var dfd = $.Deferred();
        self.collection.each(function(server,index) {
            var win=this;
            //get BaseDisk
            var baseDisk = new RSVP.Promise(function(resolve,reject){
              socket.emit('directories:read', {server_id:server.get('ID'),type:'BaseDisk'}, function(err, data) {
                resolve(data);
              });
            });

            //get Export
            var Export = new RSVP.Promise(function(resolve,reject){
              socket.emit('directories:read', {server_id:server.get('ID'),type:'Export'}, function(err, data) {
                resolve(data);
              });
            });
            
            //get Storage
            var storage = new RSVP.Promise(function(resolve,reject){
              socket.emit('directories:read', {server_id:server.get('ID'),type:'Storage'}, function(err, data) {
                resolve(data);
              });
            });

            baseDisk.then(function(data){
               var aBaseDisk='';
                for(var i=0;i<data.length;i++){
                    aBaseDisk+="<li>"+data[i].Path+"</li>";
                }
                server.set('aBaseDisk',aBaseDisk);
            })
            Export.then(function(data){
              var aExport='';
                for(var i=0;i<data.length;i++){
                    aExport+="<li>"+data[i].Path+"</li>";
                }
                server.set('aExport',aExport);
            })
            storage.then(function(data){
              var aStorage='';
                for(var i=0;i<data.length;i++){
                    //aStorage.push(data[i].Path);
                    aStorage+="<li>"+data[i].Path+"</li>";
                }
                server.set('aStorage',aStorage);
            }).then(function(data){
              var serverView = new ServerView({
                    model: server,
                    list: self.list,
                    tagName: self.list ? 'tr' : 'div',
                    className: self.list ? '' : 'server-logo pull-left'
                });
              win.$('#servers-container').append(serverView.render().el);
              if(index === (self.collection.length - 1)){
                dfd.resolve();
              }
              self.serverViews.push(serverView);
            });
        });

        $.when(dfd)
         .done(function(){
            if (self.list) {
              $('#table-view', self.el).dataTable({
                'sDom': 'R<\'row-fluid table-data-search\'<\'datatable-part pull-left\'l><\'datatable-part pull-right\'f>r> t <\'row-fluid\'<\'datatable-part-medium pull-left\'i><\'datatable-part-medium padding-remove-a pull-right\'p>>',
                'sPaginationType': 'bootstrap',
                'oLanguage': {
                  'sUrl': '/dt.' + App.locale + '.js'
                },
                'bDestroy': true
               });
            }
          });
        
        return self;
      },

      openSettings: function() {
        
        socket.emit('settings', [''], function() {
        });

        var settingsView = new ServerSettingsView();

        $("#modal-container").html(settingsView.render().$el.modal());
      }, 
      startServers: function() {
          var ja = underi18n.MessageFactory(locale);
          if (this.getSelectedViews().length > 0) {
          var restartServerView = new (require('views/servers/start_server'))({server: this.getSelectedViews()[0].model});
          restartServerView.render().$el.appendTo($('#modal-container')).modal();
          $('#ip', restartServerView.el).focus();
          }else{
            alert(ja('Please select a ioserver to start.'));
          }
      
      },

      restartServers: function() {
          var ja = underi18n.MessageFactory(locale);
          if (this.getSelectedViews().length > 0) {
          var restartServerView = new (require('views/servers/restart_server'))({server: this.getSelectedViews()[0].model});
          restartServerView.render().$el.appendTo($('#modal-container')).modal();
          $('#ip', restartServerView.el).focus();
          }else{
            alert(ja('Please select a ioserver to restart.'));
          }
      
      },
      stopServer: function() {
            var ja = underi18n.MessageFactory(locale);
            if (this.getSelectedViews().length > 0) {
            var restartServerView = new (require('views/servers/stop_server'))({server: this.getSelectedViews()[0].model});
            restartServerView.render().$el.appendTo($('#modal-container')).modal();
            $('#memo', restartServerView.el).focus();
            }else{
              alert(ja('Please select a ioserver to stop.'));
            }
        
      },

      bootrestartServers: function() {
        
            var bootrestartServerView = new (require('views/servers/bootrestart_server'))({servers: this.getSelectedViews()});
          bootrestartServerView.render().$el.appendTo($('#modal-container')).modal();
          $('#name', bootrestartServerView.el).focus();   
          
      },
    });
    return ServersView;
});
