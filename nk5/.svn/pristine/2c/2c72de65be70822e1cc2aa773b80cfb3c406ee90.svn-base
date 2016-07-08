define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/packs/pack.html',
  'views/disks/disk',
  'collection/disks',
  'views/disks/disk_form',
  'views/packs/packmodel'
], function($, _, Backbone, tableItem, DiskView, DisksCollection, DiskForm, PackModelView){
    PackView = Backbone.View.extend({
      tagName: 'tbody',
      _modelBinder: undefined,
      template: _.template(underi18n.template(tableItem, msgFactory)),
      events:{
        'click td button.remove': 'destroy',
        'click th button.update': 'update',
        'click td button.update': 'updatemodel',
      },
      initialize: function() {
        
        var self = this;
        _.bindAll(this, 'render', 'renderDisks');
        this.baseDisks = this.options.baseDisks;
        this.ioservers = this.options.ioservers;
        this.model.disks = new DisksCollection();
        this.model.disks.bind('add remove reset change', self.renderDisks);
        this.model.disks.fetchWithComputerIdAndMenuIdAndPackId(this.model.collection.computer_id, this.model.collection.menu_id, this.model.id);
        this.model.diskForm = new DiskForm({el:$(this.el), computer_id:this.model.collection.computer_id, menu_id:this.model.collection.menu_id, pack_id:this.model.id,
          baseDisks: this.baseDisks});
        this.diskViews = [];
      },
      
      destroy: function() {
      var ja = underi18n.MessageFactory(locale);
        this.model.set('computer_id', this.model.collection.computer_id);
        
        this.model.destroy({
          success: function(model, response) {
            alert(ja('Pack ')+model.get('name')+ja(' was deleted.'));
          },
          error: function(model, response) {
            alert('Failed to delete pack. '+response.error);
          },
          wait: true
        });
      },
 
update:function(){ 
    var type=$("#mode",this.el).val();
    var action;
    if(type=="UpdateActive"){
      
      action="update_mode";
    }else{
      action="save_update_mode";
    }
     socket.emit('pack:updateBootMenuPack', {computer_id:this.model.collection.computer_id,menu:this.model.collection.menu_id,id:this.model.id, mode:type, action:action}, function(err, data) {
                               
                      });


},

updatemodel:function(){ 
  $("#bootMenu").hide();
 
  var computer_id=this.model.collection.computer_id;
  var menu_id=this.model.collection.menu_id;
  var pack_id=this.model.id;

  var packModelView = new (require('views/packs/packmodel'))({computer_id:computer_id,menu_id:menu_id, pack_id:pack_id});       
  packModelView.render().$el.appendTo($('#modal-container')).modal();  


},




      
      renderDisks: function() {
        var self = this;
        _(self.diskViews).forEach(function(diskView) {
          diskView.close();
        });

        this.model.disks.forEach(function(disk) {
          var ioserver = _(self.ioservers).find(function(elem) {
            //ioservers come from socket emit you do not have any 
            return elem.ID == disk.get('io_server');
          });

          if (disk.get('pack') == self.model.id) {
            var diskView = new DiskView({model: disk, ioserver: ioserver});
            self.diskViews.push(diskView);
            $('tr:last', self.el).before(diskView.render().el);
          }
        });
      },

      render: function() {
        $(this.el).html(this.template({
            pack: this.model,
            Type: App.msgFactory(this.model.get('type')),
            State: App.msgFactory(this.model.get('state'))
          })
        );
        this.$el.append('<tr><td></td><td></td><td><select name="export_disk" class="disk-selection">'+'</select></td><td><button class="btn add-disk">+'+
              App.msgFactory('Add disk') + '</button></td></tr>');
        this.model.diskForm.render();
        return this;
      }
    });
    return PackView;
});