define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
    
    var Server = Backbone.Model.extend({
      defaults:{
        Type: 'Primary',
		    Port: 7001
      },
      idAttribute: 'ID',
      errors: {},
      urlRoot: 'server',
      noIoBind: false
    });
    return Server;
});
