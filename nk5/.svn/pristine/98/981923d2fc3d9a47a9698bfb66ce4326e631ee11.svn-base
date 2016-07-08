define([
  'jquery',
  'underscore',
  'backbone',
  'views/servers/basebootrestart_server',
  'text!templates/servers/bootrestart_server.html'
  ], function($, _, Backbone, BaseServerView, bootrestartServerTemplate){
  bootrestartServer = BaseServerView.extend({
    id:'restart-server-modal',
    template: _.template(underi18n.template(bootrestartServerTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'bootserver_restart');
    }
    
  });
  return bootrestartServer;
});