define([
  'jquery',
  'underscore',
  'backbone',
  'rsvp',
  'text!templates/multiclient/disk.html',
  'views/loading_screen'
  ], function($, _, Backbone, RSVP, tableItem,LoadingView) {
    var DiskView = Backbone.View.extend({
      template: _.template(underi18n.template(tableItem, msgFactory)),
      tagName: 'tr',

      events:{
        'click td .remove': 'destroy'
      },

      initialize: function() {
        this.disk = this.options.disk;
        this.ioserver = this.options.ioserver;
        this.mappings = this.options.mappings;
        this.pack = this.options.pack;
        this.mainView = this.options.mainView;
      },

      destroy: function() {
        var self = this;
        var promiseArray = [];

        _(this.mappings.disksMap[this.disk.uuid]).forEach(function (disk) {
          promiseArray.push(new RSVP.Promise(function(resolve, reject) {
            disk.destroy({
              success: function (model) {
                resolve(model);
              },
              error: function(model,response) {
                reject(model);
              }
            });
          }));
        });

        var loadingScreen = new LoadingView({
          displayView: self.mainView,
          promiseArray: promiseArray,
          executeAfter: function() {
            self.pack.disks = _(self.pack.disks).reject(function(disk){
              return disk.uuid === self.disk.uuid;
            });
            delete self.mappings.disksMap[self.disk.uuid];
          }
        });
        loadingScreen.render();
      },

      render: function() {
        $(this.el).html(this.template({
          disk: this.disk,
          baseDiskIP: this.ioserver.IP
        }));
        return this;
      }
    });
    return DiskView;
  });