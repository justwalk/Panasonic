define(['underscore', 'backbone'], function(_, Backbone) {
  var Message = Backbone.Model.extend({
    urlRoot: 'message',
    noIoBind: false,

      defaults: {
        oldMessage: ''
      },

    initialize: function() {
    },

    parse: function(obj) {
      this.set(obj);
      this.id = 1;
    }

  });

  return Message;
});
