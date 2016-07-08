define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
    StorageView = Backbone.View.extend({
        tagName: 'option',
        
        render: function(){
          if(this.model.get('Type')=="Primary")
          return '<option '+(this.options.selected ? 'selected="selected"':'')+' value=\"' + this.model.get('ID') + '\">' + this.model.get('IP') + '</option>';
        }
    });

  return StorageView;
});
