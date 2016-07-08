define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/disk_copy_command',
  'text!templates/commands/disk_copy.html'
], function($, _, Backbone, DiskCopyView,  DiskCopyTemplate){
  diskCopy = DiskCopyView.extend({
    id:'disk-copy-modal',
    template: _.template(underi18n.template(DiskCopyTemplate, msgFactory)),

    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'disk_copy');
    }

  });
  return diskCopy;
});