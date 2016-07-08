define([
  'jquery',
  'underscore',
  'backbone',
  'models/server',
  'text!templates/servers/license.html',
  'collection/directories',
  'modelBinder'
], function($, _, Backbone, Server,licenseServer, DirectoriesCollection, ModelBinder){

  var LicenseServerView = Backbone.View.extend({
    id:'add-server-modal',
    className: 'modal fade',
    template: _.template(underi18n.template(licenseServer, msgFactory)),
    
    events:{
      // 'submit #edit-server-form': 'saveModel',
      // 'hidden' : 'remove' //the 'hidden' event is from bootstrap modal dismiss
    },
    _modelBinder: undefined,
    initialize: function(options) { 	
       var self = this;
       this.model = this.options.model;
       this._modelBinder = new Backbone.ModelBinder();
       _.bindAll(this);
     
       this.model.set("serialNo",this.model.get("SerialNo"));
       this.model.set("NumberOfLicenses",this.model.get("ClientCount"));
      this.model.set("DaysLeft",this.model.get("TimeLimitDaysLeft"));
      this.model.set("User",this.model.get("pchCompName")+"-"+this.model.get("pchName"));
      // if(this.model.get("LicenseType")=="2"){
      //   $("#evaluation").hide();
      //   $("#pay").hide();
      // }else{
      //     $("#evaluation").css("display","block");
      //   $("#pay").css("display","block");
      // }
     
      
    },
    
    
    render: function() {
      this.delegateEvents();
      $(this.el).html(this.template({model:this.model}));
      this._modelBinder.bind(this.model, this.el);
      
      return this;
    }
  });
  return LicenseServerView;
});
