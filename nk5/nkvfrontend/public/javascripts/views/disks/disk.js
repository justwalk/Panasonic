define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/disks/disk.html',
  'models/server',
  'rsvp'
], function($, _, Backbone, tableItem, Server, RSVP) {
    DiskView = Backbone.View.extend({
      tagName: 'tr',
      template: _.template(underi18n.template(tableItem, msgFactory)),
      events:{
        'click td .amputate': 'destroy'
      },

      initialize: function() {
     
        var self = this;
        _.bindAll(this, 'render', 'close');
        this.ioserver = this.options.ioserver;
      },
      
      close: function() {
        this.unbind();
        this.remove();
      },
      destroy: function() {
        var ja = underi18n.MessageFactory(locale);
        this.model.destroy({
          success: function(model, response) {
            alert(ja('Disk ')+model.get('name')+ja(' was deleted.'));
          },
          error: function(model, response) {
            alert(ja('Failed to delete disk. ')+response.error);
          },
          wait:true
        });
      },
      
      render: function() {
        var self = this;
        
        $(this.el).html(this.template({
          disk: this.model,
          baseDiskIP: this.ioserver.IP
        }));
        return this;
      }
    });
    return DiskView;
});