define([
  'jquery',
  'underscore',
  'backbone',
  'views/servers/serverScriptExebase',
  'text!templates/servers/serverScriptExe.html'
  ], function($, _, Backbone, BaseServerView, serverScriptTemplate){
  serverScript = BaseServerView.extend({
    id:'restart-server-modal',
    template: _.template(underi18n.template(serverScriptTemplate, msgFactory)),
  
    initialize: function() {
	  this.constructor.__super__.initialize.apply(this, ['options']);
	  this.model.set('action', 'script_exe');
    }
    
  });
  return serverScript;
});