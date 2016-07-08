define(['underscore', 'backbone'], function(_, Backbone) {
  var Channel = Backbone.Model.extend({
    urlRoot: 'channel',
    idAttribute: 'ID',
    defaults: {
      Server: 0,
      IP: 0,
      Port: 0
    }
  });
  return Channel;
});