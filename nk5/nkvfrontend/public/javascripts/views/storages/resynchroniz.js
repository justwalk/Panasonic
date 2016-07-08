define([
  'jquery',
  'underscore',
  'backbone',
  'views/storages/base_re',
  'text!templates/storages/resynchroniz.html'
  ], function($, _, Backbone, BaseReView, resynchronizTemplate){
  resynchronizView = BaseReView.extend({
    id:'restart-server-modal',
    template: _.template(underi18n.template(resynchronizTemplate, msgFactory)),
    
    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'disk_resynchronize');
    }
    
  });
  return resynchronizView;
});