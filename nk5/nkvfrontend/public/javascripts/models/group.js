define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
    var Group = Backbone.Model.extend({
      errors: {},
      urlRoot: 'group',
      noIoBind: false,
      initialize: function() {
          this.ioBind('delete', this.serverDelete, this);
      },
      serverDelete: function(group){
        if (this.collection) {
          this.collection.remove(this);
        } else {
          this.trigger('remove', this);
        }
        this.modelCleanup();
      },
      modelCleanup: function () {
        this.ioUnbindAll();
        return this;
      }
    });
    return Group;
});
