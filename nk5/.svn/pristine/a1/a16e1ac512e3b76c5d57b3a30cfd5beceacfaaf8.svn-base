define(['underscore', 'backbone'], function(_, Backbone) {
  var Settings = Backbone.Model.extend({
    urlRoot: 'editmenus',
    noIoBind: false,
    id: 1,
    timeOptions: function() {
        var timeOptions = '';
        for (var ampm=0; ampm < 24; ampm++) {
         timeOptions += '<option value="'+ampm+'">'+ampm+'</option>';
        }
        return timeOptions;
      }
  });

  return Settings;
});
