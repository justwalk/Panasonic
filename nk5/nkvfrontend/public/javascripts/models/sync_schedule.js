define(['underscore', 'backbone'], function(_, Backbone) {
  var SyncBack = Backbone.Model.extend({
    urlRoot: 'disksync',
    noIoBind: false,
    defaults:{
      SyncType:0,
      Week:0,
      Clock:0,
      Speed:0
    },

    initialize: function() {
    	
    }

  });

  return SyncBack;
});