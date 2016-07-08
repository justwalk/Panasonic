define([
  'jquery',
  'underscore',
  'backbone',
  'views/servers/base_server',
  'text!templates/servers/stop_server.html'
  ], function($, _, Backbone, BaseServerView, restartServerTemplate){
  restartServer = BaseServerView.extend({
    id:'restart-server-modal',
    template: _.template(underi18n.template(restartServerTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'ioserver_stop');
    }
    
  });
  return restartServer;
});