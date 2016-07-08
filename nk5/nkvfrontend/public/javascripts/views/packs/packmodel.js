define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/packs/packmodel.html',
  'models/pack',
  'modelBinder'
], function($, _, Backbone, PackModelTemplate, Pack, ModelBinder){
  var PackModelView= Backbone.View.extend({
    id:'packmodel',
    className: 'modal fade',
    template: _.template(underi18n.template(PackModelTemplate, msgFactory)),
    
    events:{
      'click .btn-primary ': 'saveModel',
      'click .checkDisable ': 'checkDisable',
      'click .close ': 'close',
      'change #typeOfWritting ': 'typeOfWritting',
      'change #accessMode ': 'accessMode',
      'click .suspension ': 'suspension',
    },
    _modelBinder: undefined,
    initialize: function(options) {
       var self = this;
        this.model=new Pack();
       this.computer_id=this.options.computer_id;
       this.menu_id=this.options.menu_id;
       this.pack_id=this.options.pack_id;
        this._modelBinder = new Backbone.ModelBinder();
       _.bindAll(this);
     
       this.model.set("computer_id",this.computer_id);
       this.model.set("menu_id",this.menu_id);
       this.model.set("pack_id",this.pack_id);
     
    },
    checkDisable:function(){
       if($("#checkDisable input[type='checkbox']").is(':checked')){
        $("#checkClearCache input[type='checkbox']").removeAttr("checked");
        $(".checkClearCache").attr("disabled","disabled");
       }else{
        $(".checkClearCache").removeAttr("disabled");
       }

    },
typeOfWritting: function(){
  var self = this;
    var typeOfWritting= $("#typeOfWritting option:selected",self.el).val();
    
  if(typeOfWritting!=" "){
   
    $("#checkDisable input[type='checkbox']").removeAttr("checked");
    $(".checkDisable").attr("disabled","disabled");
    $("#checkClearCache input[type='checkbox']").removeAttr("checked");
    $(".checkClearCache").attr("disabled","disabled");
  }else{
   
       $(".checkDisable").removeAttr("disabled");
       $(".checkClearCache").removeAttr("disabled");
  }
  
},
close:function(){
   var self = this;
  self.$el.modal('hide');
$("#bootMenu").show();
},

suspension:function(){
   var self = this;
    self.$el.modal('hide');
    $("#bootMenu").show();
},



accessMode: function(){
  var self = this;
   var accessMode= $("#accessMode option:selected",self.el).val();

  if(accessMode!=" "){
    $("#checkDisable input[type='checkbox']").removeAttr("checked");
    $(".checkDisable").attr("disabled","disabled");
    $("#checkClearCache input[type='checkbox']").removeAttr("checked");
    $(".checkClearCache").attr("disabled","disabled");
  }else{
       $(".checkDisable").removeAttr("disabled","disabled");
       $(".checkClearCache").removeAttr("disabled","disabled");
  }
  
},



    saveModel: function(e) {
      //alert("11111111111111");
           var self = this;
          
           var str="";
            $("input[name='checkbox']:checkbox",self.el).each(function(){ 
                if($(this).attr("checked")){
                    str += $(this).val()+","
                }
            })
            var strval=[];
           var checkVal=[];

            strval=str.split(",");
            if(strval[0]!=""){
              checkVal.push(strval[0]);
            }
            if(strval[1]!=""){
               checkVal.push(strval[1]);
            }
          
            
            var typeOfWritting= $("#typeOfWritting option:selected",self.el).val();
            if(typeOfWritting!=" "){
               checkVal.push(typeOfWritting);
            }
           
            var accessMode= $("#accessMode option:selected",self.el).val();
            if(accessMode!=" "){
               checkVal.push(accessMode);
            }
          
            
            for(var i=0; i<checkVal.length;i++){
              var type=checkVal[i];
              if(type!=undefined){
                socket.emit('pack:setPack', {computer_id:self.computer_id, menu_id:self.menu_id, pack_id:self.pack_id, type:type}, function(err, data) {
                                        self.$el.modal('hide');
                                        $("#bootMenu").show();

                                      });
              }
                 

            }


    },
            
   render: function() {
    
      $(this.el).html(this.template({model:this.model}));

      //this._modelBinder.bind(this.model, this.el);
      return this;
    }
  });
  return PackModelView;
});
