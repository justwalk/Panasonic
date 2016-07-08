define([
  'jquery',
  'underscore',
  'backbone',
  'views/commands/disk_backup_command',
  'text!templates/commands/disk_backup.html'
], function($, _, Backbone, DiskBackupView,  DiskBackupTemplate){
  diskBackup = DiskBackupView.extend({
    id:'disk-backup-modal',
    template: _.template(underi18n.template(DiskBackupTemplate, msgFactory)),

    initialize: function() {
      this.constructor.__super__.initialize.apply(this, ['options']);
      this.model.set('action', 'disk_backup');
    }

  });
  return diskBackup;
});