define([
  'jquery',
  'underscore',
  'backbone',
  'views/storages/base_re',
  'text!templates/storages/recheck.html'
  ], function($, _, Backbone, BaseReView, recheckTemplate){
  recheckView = BaseReView.extend({
    id:'restart-server-modal',
    template: _.template(underi18n.template(recheckTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'disk_recheck');
    }
    
  });
  return recheckView;
});