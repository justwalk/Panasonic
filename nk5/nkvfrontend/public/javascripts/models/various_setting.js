define(['underscore', 'backbone'], function(_, Backbone) {
  var VariousSetting = Backbone.Model.extend({
    urlRoot: 'various_setting',
    noIoBind: false
  });

  return VariousSetting;
});