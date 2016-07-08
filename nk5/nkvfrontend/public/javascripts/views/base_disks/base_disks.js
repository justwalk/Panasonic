define([
  'jquery',
  'underscore',
  'backbone',
  'views/base_disks/base_disk',
  'text!templates/base_disks/grid_view.html',
  'text!templates/base_disks/list_view.html',
  'jqueryUI',
  'bootstrapDatatables'
], function($, _, Backbone, DiskView, gridTemplate, listTemplate){
    var BaseDisksView = Backbone.View.extend({
        template: this.template,
        events:{
          'click': 'clickClose'
        },
        initialize: function(options) {
          var self = this;
          _.bindAll(this);
          self.list = options.list;

          self.template = self.list ? _.template(underi18n.template(listTemplate, App.msgFactory)) : _.template(underi18n.template(gridTemplate, App.msgFactory));
          this.collection.on('add reset remove', this.render);
        },
        
        reloadTemplate: function() {
          this.template = this.list ? _.template(underi18n.template(listTemplate, App.msgFactory)) : _.template(underi18n.template(gridTemplate, App.msgFactory));
          return this;
        },
        clickClose: function(){
          
              if($('.storage-logo').attr('no-hide') == 'true' ){ 
                return;
              }
              else{
                $('.storage-logo', this.model).removeClass('detailed');
              }
        },
        getSelectedViews: function() {
          return _.filter(this.diskViews, function(diskView){
            //alert(diskView.isSelected);
              return diskView.isSelected;
            });
        },
        getParent: function(parntID) {
          return _.filter(this.collection.models, function(disk){
              return disk.get('ID')==parntID;
            });
        },
        setServerID: function(server_id) {
          this.collection.fetchWithServerID(server_id);
        },
        
        render: function() {
          var self = this;
          self.diskViews = [];
          self.template = self.list ? _.template(underi18n.template(listTemplate, App.msgFactory)) : _.template(underi18n.template(gridTemplate), App.msgFactory);
          $(self.el).html(self.template);
          if (self.collection.models !== null) {
            self.collection.models.forEach(function(disk){
              var arrayObject = self.getParent(disk.get('Parent'));
              if(arrayObject.length>0){
                 disk.set('ParentName',arrayObject[0].get('Name'));
              }
             //console.log(disk,'----------------------------');
              var diskView = new DiskView({model: disk, list: self.list, tagName: self.list ? 'tr' : 'div', className: self.list ? '' : 'storage-logo pull-left'});
              self.$('#storage-container').append(diskView.render().el);
              self.diskViews.push(diskView);
            });
          }

          if (self.list) {
            $('#table-view', self.el).dataTable({
              'sDom': 'R<\'row-fluid table-data-search\'<\'datatable-part pull-left\'l><\'datatable-part pull-right\'f>r> t <\'row-fluid\'<\'datatable-part-medium pull-left\'i><\'datatable-part-medium padding-remove-a pull-right\'p>>',
              'sPaginationType': 'bootstrap',
              'oLanguage': {
                'sUrl': '/dt.' + App.locale + '.js'
              },
              'bDestroy': true
            });
          }

          return self;
        }
    });
    return BaseDisksView;
});
