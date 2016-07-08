define(['underscore', 'backbone'], function(_, Backbone) {
  var RollBack = Backbone.Model.extend({
    urlRoot: 'restore',
    noIoBind: false,
    defaults: {
		  Version:0,
      Desc:'0',
      Time:[]
		},
  });

  return RollBack;
});