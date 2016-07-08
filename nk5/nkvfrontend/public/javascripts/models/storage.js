define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
    
    var Storage = Backbone.Model.extend({
      errors: {},
      urlRoot: 'server',
      noIoBind: false
    });

    return Storage;
});
