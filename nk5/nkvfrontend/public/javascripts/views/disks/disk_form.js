define([
  'jquery',
  'underscore',
  'backbone',
  'models/disk',
  'modelBinder',
  'text!templates/disks/base_disk_list.html'

], function($, _, Backbone, Disk, ModelBinder, baseDiskListTemplate){
  var DiskFormView = Backbone.View.extend({
    events:{
      'click td .add-disk': 'saveModel'
    },
    _modelBinder: undefined,
    initialize: function() {
      var self = this;
      _.bindAll(this, 'renderBaseDisks', 'exportDiskConverter');
      this.model = this.options.model || new Disk();
      this.computer_id = this.options.computer_id;
      this.menu_id = this.options.menu_id;
      this.pack_id = this.options.pack_id;
      this.computers = this.options.computers;
      this.baseDisks = this.options.baseDisks;
      this.baseDisks.bind('add remove reset', self.renderBaseDisks);
      this._modelBinder = new Backbone.ModelBinder();
      self.bindings = {
        'export_disk':{selector:'[name=export_disk]', converter:self.exportDiskConverter}
      };
    },
    
    exportDiskConverter: function(direction, value, attr_name, model) {
      var IOServer = value.split('|')[0];
      var diskID = value.split('|')[1];
      var baseDisk = this.baseDisks.find(function(baseDisk) {return baseDisk.get('ID') == IOServer;});
      var disk = _.find(baseDisk.get('disks'), function(disk) {return disk.ID == diskID;});
      this.model.set('io_server', IOServer);
      this.model.set('base_disk', diskID);
      this.model.set('name', disk.Name);
    },

    saveModel: function(e) {
     
      this.model.set('computer_id', this.computer_id);
      this.model.set('menu_id', this.menu_id);
      this.model.set('pack', this.pack_id);
      var self = this;
      
      this.model.save({}, {});
      this.model = new Disk();
      return false;
    },
    
    renderBaseDisks: function() {
      var self = this;
      $('.disk-selection', this.el).html('<option value="" disabled selected>'+App.msgFactory('Select image')+'</option>');
      
      this.baseDisks.forEach(function(baseDisk) {
        var template = _.template(baseDiskListTemplate);
        $('.disk-selection', self.el).append(template({disk:baseDisk}));
      });
      this._modelBinder.bind(this.model, this.el, this.bindings);

    },
    
    render: function() {
      this._modelBinder.bind(this.model, this.el);

      this.renderBaseDisks();

      return this;
    }
  });
  return DiskFormView;
});