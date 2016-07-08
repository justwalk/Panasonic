define([
  'jquery',
  'underscore',
  'backbone',
  'rsvp',
  'text!templates/multiclient/pack.html',
  'text!templates/disks/base_disk_list.html',
  'models/disk',
  'views/loading_screen',
  'views/multiclient_boot/disk'
  ], function($, _, Backbone, RSVP, tableItem, baseDiskListTemplate, Disk, LoadingView, DiskView) {
    var PackView = Backbone.View.extend({

      template: _.template(underi18n.template(tableItem, msgFactory)),
      events: {
        'click th button.remove': 'destroy',
        'click .add-disk': 'addDisk'
      },

      initialize: function() {
        this.pack = this.options.pack;
        this.mappings = this.options.mappings;
        this.baseDisks = this.options.baseDisks;
        this.mainView = this.options.mainView;
        this.menu = this.options.menu;
        this.ioservers = this.options.ioservers;
      },

      destroy: function() {
        var promiseArray = [];
        var self = this;

        _(this.mappings.packsMap[this.pack.uuid]).forEach(function(pack) {
          promiseArray.push(new RSVP.Promise(function(resolve,reject) {
            pack.destroy({
              success: function(model) {
                resolve(model);
              },
              error: function(model, response) {
                reject(model);
              }
            });
          }));
        });

        var loadingScreen = new LoadingView({
          promiseArray: promiseArray,
          displayView: this.mainView,
          executeAfter: function() {
            self.menu.packs = _(self.menu.packs).reject(function(pack){
              return pack.uuid === self.pack.uuid;
            });
            delete self.mappings.packsMap[self.pack.uuid];
          }
        });
        loadingScreen.render();
      },

      exportDiskConverter: function(value, myDisk) {
        var IOServer = value.split('|')[0];
        var diskID = value.split('|')[1];
        var baseDisk = this.baseDisks.find(function(baseDisk) {return baseDisk.get('ID') == IOServer;});
        var disk = _.find(baseDisk.get('disks'), function(disk) {return disk.ID == diskID;});
        myDisk.io_server =  IOServer;
        myDisk.base_disk = diskID;
        myDisk.name = disk.Name;
      },

      addDisk: function() {
        var newDisk = {};
        var self = this;
        var promiseArray = [];

        this.exportDiskConverter($('.disk-selection',this.el).val(), newDisk);
        newDisk.computer_id = 0;
        newDisk.menu_id = 0;
        newDisk.pack = 0;
        newDisk.uuid = ++this.mappings.diskCounter;
        this.mappings.disksMap[newDisk.uuid] = [];
        this.pack.disks.push(newDisk);

        _(this.mappings.packsMap[this.pack.uuid]).forEach(function(pack){
          var newSaveDisk = new Disk();
          newSaveDisk.set(newDisk);
          newSaveDisk.set('pack', pack.get('id'));
          newSaveDisk.set('menu_id', pack.get('menu'));
          newSaveDisk.set('computer_id', pack.get('computer_id'));
          promiseArray.push(new RSVP.Promise(function(resolve, reject){
            newSaveDisk.save({},{
              success: function(model) {
                resolve(model);
              },
              error: function(model,response) {
                reject(model);
              }
            });
          }));
        });

        var loadingScreen = new LoadingView({
          displayView: this.mainView,
          promiseArray: promiseArray,
          finalContainer: self.mappings.disksMap[newDisk.uuid]
        });
        loadingScreen.render();
      },

      renderBaseDisks: function() {
        var self = this;
        $('.disk-selection', this.el).html('<option value="" disabled selected>'+App.msgFactory('Select image')+'</option>');
        
        _(this.baseDisks.models).forEach(function(baseDisk) {
          var template = _.template(baseDiskListTemplate);
          $('.disk-selection', self.el).append(template({disk:baseDisk}));
        });

      },

      render: function() {
        var self = this;

        this.setElement(this.template({
          Name: this.pack.uuid,
          Type: App.msgFactory(this.pack['type']),
          State: App.msgFactory(this.pack.state)
        }));

        this.renderBaseDisks();
        _(this.pack.disks).forEach(function (disk) {
          var ioserver = _(self.ioservers).find(function(elem) {
            //ioservers come from socket emit you do not have any 
            return elem.ID == disk.io_server;
          });

          var diskView = new DiskView({
            disk: disk,
            ioserver: ioserver,
            mappings: self.mappings,
            mainView: self.mainView,
            pack: self.pack
          });
          $(self.el).append(diskView.render().el);
        });
        

        return this;
      }
    });
    return PackView;
  });