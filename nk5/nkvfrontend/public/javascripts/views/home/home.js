define([
  'jquery',
  'underscore',
  'backbone',
  'rsvp',
  'models/message',
  'views/modals/message_modal',
  'modelBinder',
  'views/home/serverlist',
  'views/home/tasklist',
  'views/home/clientlist',
  'views/home/clientFootList',
  'text!templates/home/home.html',
  'collection/servers',
  'collection/logfile',
  'collection/groups',
  'collection/computers'
], function($, _, Backbone,RSVP,Message,MessageModal,ModelBinder, ServerListView,TaskList, ClientList,ClientFootList, HomeTemplate,ServerCollection,LogFileCollection,GroupsCollection,ComputersCollection){
    var HomeView = Backbone.View.extend({
      template: _.template(underi18n.template(HomeTemplate, msgFactory)),
      events:{
        'click .message' : 'messageModel'
      },

      messageModel : function(){
        var message = new Message();
        var messageModal = new MessageModal(message);
        socket.emit('user:check',{user:App.info.username,pass:App.info.password}, function(err, msg) {
          App.id=msg.user.id;
          App.info=msg.user;
          messageModal.showMessage();  
        });
      },

      initialize: function(options) {
        var self = this;
        _.bindAll(this);
        /*self.flag=0;
        self.flag1=0;
        self.flag2=0;*/
        self.arr =[];
        self.router = self.options.router;
        self.list = 0;
        var dfd1 = $.Deferred();
        var dfd2 = $.Deferred();
        var dfd3 = $.Deferred();
        this.serverCollection = new ServerCollection();
        this.serverCollection.fetch();
        this.serverCollection.bind('add reset', function(){
          //self.render();
          dfd1.resolve();
        });

        this.logFileCollection = new LogFileCollection();
        this.logFileCollection.fetch();
        this.logFileCollection.bind('add reset', function(){
          dfd2.resolve();
        });

         

        this.groupsCollection = new GroupsCollection();
        this.groupsCollection.fetch();
        this.groupsCollection.bind('add reset', function(){
          //self.render();
          dfd3.resolve();
        });
        $.when(dfd1,dfd2,dfd3)
         .done(function(){self.render()})

      },

      render: function() {
        var self = this;
        self.$el.html(self.template());
       /* this.flag++;
        self.flag1++;*/

        
        this.serverCollection.each(function(server) {
            var serverListView = new ServerListView({
                model: server
            });
            self.$('#server-container').append(serverListView.render().el);
        });
       
        this.logFileCollection.each(function(logfile) {
            var taskList = new TaskList({
                model: logfile
            });
            self.$('#logfile-container').append(taskList.render().el);
        });

        var computerAccount = new RSVP.Promise(function(resolve,reject) {
          socket.emit('computers:read', {group_id: '0'}, function(err,data) {
            resolve(data);
          });
        });

        var computerAliveAccount = new RSVP.Promise(function(resolve,reject) {
          socket.emit('computerInfos:read', {}, function(err,data) {
            resolve(data);
          });
        });



       
        computerAccount.then(function(computers){
          computerAliveAccount.then(function(data){
            var acc= data.length;
            for(var i=0;i<data.length;i++){
              var nowDate = new Date();
              var aliveDate = new Date(data[i].update_time);
              if(nowDate - aliveDate > 300000){
                acc--;
              }
            }
            var clientFootList = new ClientFootList({
               computersLength:computers.length,
               aliveLength:acc
             })
              self.$('#clientFoot-container').append(clientFootList.render().el);
          });
        });

         
        //wangxin start 20160517
        var def = $.Deferred();
        var arr = [];
        var len = self.groupsCollection.length;
         computerAliveAccount.then(function(computerAlive){
            self.groupsCollection.forEach(function(groupModel) {
            self.computersCollection = new ComputersCollection();  
            self.computersCollection.fetch({
              data: {group_id: groupModel.id},
              success: function(data) {
                var count=0;
                for(var i=0;i<computerAlive.length;i++){
                  data.forEach(function(computer){
                    if(computerAlive[i].cid == computer.id){
                      var now = new Date();
                      var alive = new Date(computerAlive[i].update_time);
                      if(now - alive < 300000){
                        count++;
                      }
                    }
                  });
                }
                var obj = {};
                obj.name = groupModel.get('name');
                obj.len = data.length;
                obj.count = count;
                arr.push(obj);
                len--;
                if(len == 0){
                  def.resolve();
                }
              },
            });
          });
        });
         def.done(function(){
          arr.sort(function(a,b){
            return b.name.localeCompare(a.name);
          });
          arr.forEach(function(item){
            var clientList = new ClientList({
                groupname: item.name,
                groupLength: item.len,
                groupAliveLength: item.count
            })
            self.$('#client-container').append(clientList.render().el);
          });
         })
        //wangxin end 20160517
        return self;
      },

    });
    return HomeView;
});