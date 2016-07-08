define([
  'jquery',
  'underscore',
  'backbone',
  'models/server',
  'text!templates/servers/edit_directory.html',
  'collection/directories',
    'models/directory',
    'collection/channels',
    'models/channel',
    'views/servers/directory',
    'views/servers/channel',
  'modelBinder'
], function($, _, Backbone, Server, editDirectory, DirectoriesCollection,Directory,ChannelsCollection,Channel,DirectoryView,ChannelView,ModelBinder){

  var EditDirectoryView = Backbone.View.extend({
    id:'add-server-modal',
    className: 'modal fade editDirectory',
    template: _.template(underi18n.template(editDirectory, msgFactory)),
    
    events:{
        'hidden' : 'remove', //the 'hidden' event is from bootstrap modal dismiss
        'click #add-directory-base': 'addDirectoryBase',
        'click #add-directory-export': 'addDirectoryExport',
        'click #add-directory-storage': 'addDirectoryStorage',
        'click #add-channelAddress': 'addChannelAddress',
        'click .close': 'closeModal'
    },
    _modelBinder: undefined,
    initialize: function(options) { 	
       var self = this;
        self.bonOff=false;
        self.eonOff=false;
        self.sonOff=false;
        self.chonOff=false;
       this.model = this.options.model || new Server();
       this._modelBinder = new Backbone.ModelBinder();
     // #################################查询 directory########################################
      this.baseDirectories = new DirectoriesCollection();
      this.baseDirectories2 = new DirectoriesCollection();
      this.baseDirectories3 = new DirectoriesCollection();
      this.channelsCollection = new ChannelsCollection();

       this.baseDirectories.fetchWithServerId(this.model.get('ID'),'BaseDisk');
       this.baseDirectories.bind('add remove reset', function(collection) {
           //alert("baseDirectories==="+JSON.stringify(collection));
           //alert('baseDirectories  delete');
           if(self.bonOff){
               //初始化加载
               self.abaseDiskView=collection;
               self.xin('BaseDisk','all',collection);
           }else{
               //删除
               self.xin('BaseDisk','delete',collection);
           }
       });


       this.baseDirectories2.fetchWithServerId(this.model.get('ID'),'Export');
       this.baseDirectories2.bind('add remove reset', function(collection) {
           //alert("baseDirectories2==="+JSON.stringify(collection));
           if(self.eonOff){
               //初始化加载
               self.aexportView=collection;
               self.xin('Export','all',collection);
           }else{
               //删除
               self.xin('Export','delete',collection);
           }
       });



       this.baseDirectories3.fetchWithServerId(this.model.get('ID'),'Storage');
       this.baseDirectories3.bind('add remove reset', function(collection) {
           if(self.sonOff){
               //初始化加载
               self.astorageView=collection;
               self.xin('Storage','all',collection);
           }else{
               //删除
               self.xin('Storage','delete',collection);
           }
       });

        this.channelsCollection.fetchWithServerId(this.model.get('ID'));
        this.channelsCollection.bind('add remove reset', function(collection) {
            //alert("channelsCollection==="+JSON.stringify(collection));
            if(self.chonOff){
                //初始化加载
                self.achannelView=collection;
                self.xin('Channel','all',collection);
            }else{
                //删除
                self.xin('Channel','delete',collection);
            }
        });
    },

      // 添加目录 base
      addDirectoryBase: function() {
          var self = this;
          var directory = new Directory();
          directory.set({Path: $('input#directory-name-base',this.el).val(),Type:'BaseDisk'});
          //alert("addDirectoryBase====directory="+JSON.stringify(directory));
          directory.save({Server:this.model.get('ID')}, {
              success: function(model) {
                  self.abaseDiskView.push(model);
                  $('input#directory-name-base', self.el).val('');
                  self.xin('BaseDisk','add',model);
              }
          });
      },

      // 添加目录 export
      addDirectoryExport: function() {
          var self = this;
          var directory = new Directory();
          directory.set({Path: $('input#directory-name-export',this.el).val(),Type:'Export'});
          //alert("addDirectoryExport====directory="+JSON.stringify(directory));
          directory.save({Server:this.model.get('ID')}, {
              success: function(model) {
                  self.aexportView.push(model);
                  $('input#directory-name-export', self.el).val('');
                  self.xin('Export','add',model);
              }
          });
      },
      // 添加目录 storage
      addDirectoryStorage: function() {
          var self = this;
          var directory = new Directory();
          directory.set({Path: $('input#directory-name-storage',this.el).val(),Type:'Storage'});
          //alert("addDirectoryStorage=====directory="+JSON.stringify(directory));
          directory.save({Server:this.model.get('ID')}, {
              success: function(model) {
                  self.astorageView.push(model);
                  $('input#directory-name-storage', self.el).val('');
                  self.xin('Storage','add',model);
              }
          });
      },

     // 添加 ChannelAddress
      addChannelAddress: function() {
          var self = this;
          var channel= new Channel();
          channel.set({IP: $('input#channelAddress-name',this.el).val(),Port:$('input#port-name',this.el).val()});
          //alert("addChannelAddress=====channel="+JSON.stringify(channel));
          channel.save({Server:this.model.get('ID')}, {
              success: function(model) {
                  self.achannelView.push(model);
                  //alert("achannelView==="+JSON.stringify(self.achannelView));
                  $('input#channelAddress-name', self.el).val('');
                  $('input#port-name', self.el).val('');
                  self.xin('Channel','add',model);
              }
          });
      },

      xin:function(type,m,e){
          var self=this;
          if(m=='add'){
              //添加
             // alert("add");
              var addDirectoryView=null;
              if(type=='Channel'){
                  addDirectoryView=new ChannelView({channel:e,server:self.model,ob:self});
              }else{
                  addDirectoryView=new DirectoryView({directory:e,server:self.model,ob:self});
              }

              if(type=='BaseDisk'){
                  self.$('#baseTable',self.el).append(addDirectoryView.render().el);
              }else if(type=='Export'){
                  self.$('#exportTable',self.el).append(addDirectoryView.render().el);
              }else if(type=='Storage'){
                  self.$('#storageTable',self.el).append(addDirectoryView.render().el);
              }else if(type=='Channel'){
                  self.$('#channelAddressTable',self.el).append(addDirectoryView.render().el);
              }
          }else if(m=='all'){
            //  alert("all");
              if(type=='BaseDisk'){
                  self.abaseDiskView.each(function(directory) {
                      var oBaseDiskView=new DirectoryView({directory:directory,server:self.model});
                      self.$('#baseTable',self.el).append(oBaseDiskView.render().el);
                  });
                  self.bonOff=false;
              }else if(type=='Export'){
                  self.aexportView.each(function(directory) {
                      var oExportView=new DirectoryView({directory:directory,server:self.model});
                      self.$('#exportTable',self.el).append(oExportView.render().el);
                  });
                  self.eonOff=false;
              }else if(type=='Storage'){
                  self.astorageView.each(function(directory) {
                      var oStorageView=new DirectoryView({directory:directory,server:self.model});
                      self.$('#storageTable',self.el).append(oStorageView.render().el);
                  });
                  self.sonOff=false;
              }else if(type=='Channel'){
                  self.achannelView.each(function(channel) {
                      //alert("channel=="+JSON.stringify(channel));
                      var oChannelView=new ChannelView({channel:channel,server:self.model});
                      self.$('#channelAddressTable',self.el).append(oChannelView.render().el);
                  });
                  self.chonOff=false;
              }

          }else if(m=='delete'){
              //alert("delete");
              // 重新查询记录
              if(type=='BaseDisk'){
                  self.$('#baseTable',self.el).html("");
                  self.abaseDiskView.each(function(directory) {
                      if(e.get('ID') != directory.get('ID')){
                          var oNBaseDiskView=new DirectoryView({directory:directory,server:self.model});
                          self.$('#baseTable',self.el).append(oNBaseDiskView.render().el);
                      }
                  });
              }else if(type=='Export'){
                  self.$('#exportTable',self.el).html("");
                  self.aexportView.each(function(directory) {
                      if(e.get('ID') != directory.get('ID')){
                          var oNExportView=new DirectoryView({directory:directory,server:self.model});
                          self.$('#exportTable',self.el).append(oNExportView.render().el);
                      }
                  });

              }else if(type=='Storage'){
                  self.$('#storageTable',self.el).html("");
                  self.astorageView.each(function(directory) {
                      if(e.get('ID') != directory.get('ID')){
                          var oNStorageView=new DirectoryView({directory:directory,server:self.model});
                          self.$('#storageTable',self.el).append(oNStorageView.render().el);
                      }
                  });
              }else if(type=='Channel'){
                  self.$('#channelAddressTable',self.el).html("");
                  self.achannelView.each(function(channel) {
                      if(e.get('ID') != channel.get('ID')){
                          var oNChannelView=new ChannelView({channel:channel,server:self.model});
                          self.$('#channelAddressTable',self.el).append(oNChannelView.render().el);
                      }
                  });
              }
          }
      },
      closeModal: function() {
          this.$el.modal('hide');
      },
      //hideChannelAddress:function(){
      //    var self = this;
      //    if(self.model.get('Type')=='Secondary'){
      //        $('.modal-body',self.el).html('this server not supported edit.');
      //    }
      //},
    render: function() {
      this.delegateEvents();
      $(this.el).html(this.template({model:this.model}));
      this._modelBinder.bind(this.model, this.el);
        this.bonOff=true;
        this.eonOff=true;
        this.sonOff=true;
        this.chonOff=true;
        //this.hideChannelAddress();
      return this;
    }
  });
  return EditDirectoryView;
});
