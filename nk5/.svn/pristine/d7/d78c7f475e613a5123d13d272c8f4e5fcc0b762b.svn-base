define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/servers/channel.html'
], function($, _, Backbone, tableItem){
    ChannelView = Backbone.View.extend({
      tagName: 'tbody',
      _modelBinder: undefined,
      template: _.template(underi18n.template(tableItem, msgFactory)),
      events:{
        'click td .remove': 'destroy'
      },

      initialize: function() {
        this.channel = this.options.channel;
        this.server = this.options.server;
          this.ob=this.options.ob;
        this._modelBinder = new Backbone.ModelBinder();
      },

      destroy: function() {
          var self=this;
          this.channel.destroy({
              success: function(model, response) {
                  if(self.ob){
                        //alert("model=="+JSON.stringify(model));
                              var aTbody=self.ob.$("#channelAddressTable").find('tbody');
                              for(var i=0;i<aTbody.length;i++){
                                  var obutton=aTbody[i].getElementsByTagName("button")[0];
                                  var obuttonValue=obutton.getAttribute("juede");
                                  if(obuttonValue==model.get('ID')){
                                      self.ob.$(aTbody[i],self.ob.el).remove();
                                  }
                              }
                  }
                 // alert('Directory '+model.get('Path')+' was deleted.');
              },
              error: function(model, response) {
                  alert('Failed to delete channel. '+response.error);
              },
              wait:true
          });
      },

      render: function() {
        //  alert("directory==="+JSON.stringify(this.directory));
        $(this.el).html(this.template({
            channel: this.channel
          })
        );
        return this;
      }
    });
    return ChannelView;
});