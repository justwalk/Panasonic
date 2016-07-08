define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/servers/directory.html'
], function($, _, Backbone, tableItem){
  DirectoryView = Backbone.View.extend({
      tagName: 'tbody',
      _modelBinder: undefined,
      template: _.template(underi18n.template(tableItem, msgFactory)),
      events:{
        'click td .remove': 'destroy'
      },

      initialize: function() {
        this.directory = this.options.directory;
        this.server = this.options.server;
          this.ob=this.options.ob;
        this._modelBinder = new Backbone.ModelBinder();
      },

      destroy: function() {
          var self=this;
          this.directory.destroy({
              success: function(model, response) {
                  if(self.ob){
                          if(model.get('Type')=='BaseDisk'){
                              var aTbody=self.ob.$("#baseTable").find('tbody');
                              for(var i=0;i<aTbody.length;i++){
                                  var obutton=aTbody[i].getElementsByTagName("button")[0];
                                 var obuttonValue=obutton.getAttribute("juede");
                                  if(obuttonValue==model.get('ID')){
                                      self.ob.$(aTbody[i],self.ob.el).remove();
                                  }
                              }
                          }else if(model.get('Type')=='Export'){
                              var aTbody=self.ob.$("#exportTable").find('tbody');
                              for(var i=0;i<aTbody.length;i++){
                                  var obutton=aTbody[i].getElementsByTagName("button")[0];
                                  var obuttonValue=obutton.getAttribute("juede");
                                  if(obuttonValue==model.get('ID')){
                                      self.ob.$(aTbody[i],self.ob.el).remove();
                                  }
                              }

                          }else if(model.get('Type')=='Storage'){
                              var aTbody=self.ob.$("#storageTable").find('tbody');
                              for(var i=0;i<aTbody.length;i++){
                                  var obutton=aTbody[i].getElementsByTagName("button")[0];
                                  var obuttonValue=obutton.getAttribute("juede");
                                  if(obuttonValue==model.get('ID')){
                                      self.ob.$(aTbody[i],self.ob.el).remove();
                                  }
                              }
                          }
                  }
                 // alert('Directory '+model.get('Path')+' was deleted.');
              },
              error: function(model, response) {
                  alert('Failed to delete directory. '+response.error);
              },
              wait:true
          });
      },

      render: function() {
        //  alert("directory==="+JSON.stringify(this.directory));
        $(this.el).html(this.template({
          directory: this.directory
          })
        );
        return this;
      }
    });
    return DirectoryView;
});