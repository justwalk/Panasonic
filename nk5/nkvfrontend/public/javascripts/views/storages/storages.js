define([
  'jquery',
  'underscore',
  'backbone',
  'views/storages/resynchroniz',
  'views/storages/recheck',
  'views/storages/storage',
  'views/storages/sync',
  'datatable',
  'text!templates/storages/grid_view.html',
  'text!templates/storages/grid_view_modal.html',
  'views/storages/display',
  'views/base_disks/base_disks',
  'collection/base_disks',
  'views/storages/storage_form',
  'views/storages/delete_storage',
  'models/base_disk',
  'views/storages/rollback',
  'views/commands/disk_copy',
  'views/commands/disk_backup'
], function($, _, Backbone, ResynchronizView,RecheckView,StorageView, SyncView,datatable, gridTemplate,gridModalTemplate, dispalyView, BaseDisksView, BaseDisksCollection, StorageForm, DeleteStorage, Storage,RollBackForm){
    var StoragesView = Backbone.View.extend({
      template: _.template(underi18n.template(gridTemplate, msgFactory)),
      events: {
        'change #servers-select' : 'selectionChanged',  //服务器选择
        'click .switch-view': 'switchView',            //转换视图
        'click .select-all':  'selectAll',
        'click .select-none': 'selectNone',
        'click .select-invert': 'selectInvert',
        'click .add-image': 'addImage',
        'click .disk-copy': 'diskCopy',
        'click .diskBackup': 'diskBackup',
        'click .edit-image' : 'editImage',
        'click .delete-image': 'deleteImage',
        'click .differencing-image': 'differencingImage',
        'click .rollBack-image': 'rollBackImage',
        'click .diskMerge-image': 'diskMergeImage',
        'click .changeTBasedisk-image':'changeTBasediskImage',
        'click .displayImageComputers-images':'displayComputersImage',
        'click .synchronizeSchedule-image':'synchronizeScheduleImage',
        'click .resynchroniz-image':'resynchronizImage',
        'click .reCheck-image':'reCheckImage',
        'click .select-Refresh': 'selectRefresh'
      },

      initialize: function(options) {
        var self = this;
        _.bindAll(this);
        if(self.options.router){
          self.router = self.options.router;
        }else{
          self.template=_.template(underi18n.template(gridModalTemplate, msgFactory)); 
          self.selected_id=self.options.selected_id;
        }
        self.list = false;
        self.disksView = new BaseDisksView({collection:new BaseDisksCollection()});
        self.collection.comparator = function(storage) {return storage.get('ID');};
        self.collection.bind('remove destroy reset', function(collection){
          self.render();
          if (!self.selected_id) {
            self.setSelectedId(collection.at(0).id);
          }
        });
        self.collection.bind('add', function(collection) {

          self.collection.fetchWithGroupId(this.selected);
          self.render();
        });
      },
      
      switchView: function(e) {
        this.list = !this.list;
        if ($('#switch-list').hasClass("show_item")) {
          // list mode
          $('#switch-grid').removeClass('hide_item').addClass('show_item');
          $('#switch-list').removeClass('show_item').addClass('hide_item');
        } else {
          // grid mode
          $('#switch-grid').removeClass('show_item').addClass('hide_item');
          $('#switch-list').removeClass('hide_item').addClass('show_item');
        }
        this.renderBaseDisks(this.list);
      },
      
      selectAll: function() {
        App.vent.trigger('basedisks:change:selection:all');
      },

      selectNone: function() {
        App.vent.trigger('basedisks:change:selection:none');
      },

      selectInvert: function() {
        App.vent.trigger('basedisks:change:selection:invert');
      },

      selectionChanged: function(){

        localStorage.setItem("selectCookieServer",$('#servers-select', this.el).val());
        this.setSelectedId($('#servers-select', this.el).val());
      },
        
      setSelectedId: function(selected_id) {

        var self = this;
        this.selected_id = selected_id ? selected_id : '';
        $('#servers-select', this.el).val(this.selected_id);
        if(this.router){
            this.router.navigate('storages'+ (this.selected_id ? ('/'+this.selected_id) : ''));

        }
        this.renderBaseDisks(this.list);
      },
      
      addImage: function() {
        var storageForm = new StorageForm({model: new Storage({IOServer:this.selected_id})});
       
        storageForm.render().$el.appendTo($('#modal-container')).modal();
        $('input:visible:first', storageForm.el).focus();
        return false;
      },

      //拷贝 disk
      diskCopy: function() {
        var diskCopyView = new (require('views/commands/disk_copy'))();
        diskCopyView.render().$el.appendTo($('#modal-container')).modal();
        $('#task_memo', diskCopyView.el).focus();
      },
      // backup disk
      diskBackup: function() {
		var ja = underi18n.MessageFactory(locale);
        var serverText=$("#servers-select :selected").text();
        var diskView = this.disksView.getSelectedViews()[0];
        if(diskView){
          var diskBackupView = new (require('views/commands/disk_backup'))({IOServerId:this.selected_id,IOServerIP:serverText,diskView:diskView.model});
          diskBackupView.render().$el.appendTo($('#modal-container')).modal();
          $('#task_name', diskBackupView.el).focus();
        }else{
          alert(ja('Please select a disk to backup.'));
        }
        return false;
      },

      //wangxin change start 20160408
      differencingImage: function () {
        var self = this;
        var diskView = this.disksView.getSelectedViews()[0];
        var storageForm = new StorageForm({model: new Storage({IOServer:this.selected_id,Parent:diskView.model.id})});
        storageForm.render().$el.appendTo($('#modal-container')).modal();
        $('input:visible:eq(0)', storageForm.el).removeAttr("checked");
        $('input:visible:eq(0)', storageForm.el).attr("disabled", true);
        $('input:visible:eq(1)', storageForm.el).click();
        $('input:visible:eq(2)', storageForm.el).attr("disabled", true);
        $('input:visible:eq(3)', storageForm.el).attr("disabled", true);
        $('input:visible:eq(4)', storageForm.el).attr("disabled", true);
        $('input:visible:eq(5)', storageForm.el).attr("disabled", true);
        var forbidden=function(){
          var selectDom = document.getElementById('Parent');
          var len = selectDom.options.length;
          for(var i=0;i<len;i++){
            if(diskView.model.id == selectDom.options[i].value){
              selectDom.options[i].selected = true;
              selectDom.disabled = true;
            }
          }
        }
       setTimeout(forbidden,1000)
        return false;
      },

      //wangxin change end 20160408

      editImage: function() {
        var diskView = this.disksView.getSelectedViews()[0];
        var ja = underi18n.MessageFactory(locale);
        if (diskView) {
          var storageForm = new StorageForm({model:diskView.model});
          storageForm.render().$el.appendTo($('#modal-container')).modal();
          $('input:visible:first', storageForm.el).focus();
        }else{
          alert(ja('Please select a disk to edit.'));
        }
        return false;
      },

      //wangxin change start 20160329

      rollBackImage: function(){
        var diskView = this.disksView.getSelectedViews()[0];
		    var ja = underi18n.MessageFactory(locale);
        var rollbackForm = new RollBackForm();
        rollbackForm.model.set('ID',diskView.model.get('ID'));
        rollbackForm.model.set('IOServer',diskView.model.get('IOServer'));
        rollbackForm.model.set('Size',diskView.model.get('Size'));
        rollbackForm.model.set('Path',diskView.model.get('Path'));
        rollbackForm.model.set('Name',diskView.model.get('Name'));
        socket.emit('restore:read', {ID:diskView.model.get('ID'),IOServer:diskView.model.get('IOServer')}, function(err, data) {
            if(data.length == 0){
              alert(ja('There is no restore point.'));
            }else{
              rollbackForm.model.set('Data',data);
              $('#modal-container').append(rollbackForm.render().$el.modal());
            }
            
        });
        
      },
      //wangxin change end 20160329

      // wangxin add start 20160405
      diskMergeImage: function() {
        var diskView = this.disksView.getSelectedViews()[0];
        var ja = underi18n.MessageFactory(locale);
        var self = this;
        if (this.disksView.getSelectedViews().length > 0) {
          var r=confirm(ja('Do you want to merge this disk?'));
          if (r===true){
              socket.emit('disk:merge', {ID:diskView.model.get('ID'),IOServer:diskView.model.get('IOServer')}, function(err, data) {
                if(err){
                  alert("sdk err");
                }
              })
          }
        }
        else{
            alert(ja('Please select a disk to merge.'));
        }
        return false;

      },
      // wangxin add end 20160405 

      //wangxin add start 20160406
      changeTBasediskImage: function(){
        var diskView = this.disksView.getSelectedViews()[0];
        var ja = underi18n.MessageFactory(locale);
        var self = this;
        if (this.disksView.getSelectedViews().length > 0) {
          var r=confirm(ja('Do you want to change to basedisk?'));
          if (r===true){
             socket.emit('disk:proxy', {ID:diskView.model.get('ID'),IOServer:diskView.model.get('IOServer')}, function(err, data) {
                if(err){
                  alert("sdk err");
                }
              })
          }
        }
        else{
            alert(ja('Please select a disk to change.'));
        }
        return false;
      },


      //wangxin add end 20160406

       deleteImage: function() {
        // var ja = underi18n.MessageFactory(locale);
        // var self = this;
        // if (this.disksView.getSelectedViews().length > 0) {
        //   var r=confirm(ja('Are you sure you want to delete it?'));
        //   if (r===true){
        //       _(this.disksView.getSelectedViews()).forEach(function(diskView) {
        //         diskView.model.destroy({
        //           wait:true
        //         });
        //         self.collection.fetchWithGroupId(this.selected);
        //     });
        //   }
        // }
        // else{
        //     alert(ja('Please select a disk to delete.'));
        // }
        // return false;

        var diskView = this.disksView.getSelectedViews()[0];
        var ja = underi18n.MessageFactory(locale);
        if (diskView) {
          var deleteStorage = new DeleteStorage({model:diskView.model});
          deleteStorage.render().$el.appendTo($('#modal-container')).modal();
          $('input:visible:first', deleteStorage.el).focus();
        }else{
          alert(ja('Please select a disk to delete.'));
        }
        return false;

      },

      displayComputersImage: function(){
        var diskView = this.disksView.getSelectedViews()[0];
        var ja = underi18n.MessageFactory(locale);
        var self = this;
        var dispalyForm = new dispalyView();
        socket.emit('disk:display', {ID:diskView.model.get('ID'),IOServer:diskView.model.get('IOServer')}, function(err, data) {
          
          if((data[0] !=null) && (data[0].length >0)){
            dispalyForm.model.set('Data',data[0]);
            dispalyForm.render().$el.appendTo($('#modal-container')).modal();
          }
          else{
            alert(ja('There is no computers.'));
          }
        })        
        return false;
      },

      synchronizeScheduleImage: function(){
        var diskView = this.disksView.getSelectedViews()[0];
        var self = this;
        var syncForm = new SyncView({ID:diskView.model.get('ID'),IOServer:diskView.model.get('IOServer')});
        syncForm.render().$el.appendTo($('#modal-container')).modal();
        socket.emit('disk:disksync', {ID:diskView.model.get('ID'),IOServer:diskView.model.get('IOServer')}, function(err, data) {
          if(data != null){

            syncForm.model.set({'SyncType':data.SyncType,'Week':data.Week,'Clock':data.Clock,'Speed':data.Speed});
            syncForm.model.set('ID',diskView.model.get('ID'));
            syncForm.model.set('IOServer',diskView.model.get('IOServer'));
            console.log(data);
            if(data.SyncType == 0){
              $("input[name='SyncType']").eq(-2).attr('checked','checked');
            }
            else{
              $("input[name='SyncType']").eq(-1).attr('checked','checked');
            }
            switch(data.Week){
              case 0: $('#SyncSelect option').eq(-8).attr('selected',true);break;
              case 1: $('#SyncSelect option').eq(-7).attr('selected',true);break;
              case 2: $('#SyncSelect option').eq(-6).attr('selected',true);break;
              case 3: $('#SyncSelect option').eq(-5).attr('selected',true);break;
              case 4: $('#SyncSelect option').eq(-4).attr('selected',true);break;
              case 5: $('#SyncSelect option').eq(-3).attr('selected',true);break;
              case 6: $('#SyncSelect option').eq(-2).attr('selected',true);break;
              case 7: $('#SyncSelect option').eq(-1).attr('selected',true);break;
            }
            if(data.Clock != null){
              $("input[type='text']").eq(-2).val(data.Clock);
            }
            if(data.Speed != null && data.Speed != 0){
              $("input[name='SyncCheckbox']").eq(-1).attr('checked',true);
              $("input[type='text']").eq(-1).val(data.Speed);
            }
          }
        })        
        return false;
      },

      resynchronizImage:function(){ 
        var ja = underi18n.MessageFactory(locale);
        var diskView = this.disksView.getSelectedViews()[0];
          if (diskView) {
          var resynchronizView = new ResynchronizView({server: diskView.model});
          resynchronizView.render().$el.appendTo($('#modal-container')).modal();
          }else{
            alert(ja('Please select a disk to resynchroniz.'));
          }
      },

      reCheckImage:function(){
        var diskView = this.disksView.getSelectedViews()[0];
        var recheckView = new RecheckView({server: diskView.model}); 
        recheckView.render().$el.appendTo($('#modal-container')).modal();
      },

      selectRefresh:function(e){
        Backbone.history.loadUrl();
      } ,

      render: function() {
        var self = this;
        options = '';
        var cookieServerValue=localStorage.getItem('selectCookieServer');
        if(cookieServerValue!=='' && cookieServerValue!=null){
          self.selected_id=cookieServerValue;
        }
        self.collection.each(function(server) {
      
          var storageView = new StorageView({model: server, selected:(server.get('ID')==self.selected_id)});
          options += storageView.render();
        });
        this.$el.html(self.template({serversOptions: options}));
        self.renderBaseDisks(self.list);
        return false;
      },

      renderBaseDisks: function(listBool) {
       
        if (this.collection.get(this.selected_id)) {
          this.disksView.collection.server_id = this.selected_id;
          this.disksView.list = listBool;
          this.$('#main').html(this.disksView.el);
          this.disksView.delegateEvents();
          this.disksView.collection.reset(this.collection.get(this.selected_id).get('disks'));
        }
      }

    });
    return StoragesView;
});
