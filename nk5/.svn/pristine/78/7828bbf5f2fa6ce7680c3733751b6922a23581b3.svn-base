define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
    var GroupView = Backbone.View.extend({
        tagName: 'option',

        render: function(){
            return '<option '+(this.options.selected ? 'selected="selected"':'')+ 'value="' + this.model.get('id') + '">' + this.model.get('name') + '</option>';
        }
    });

  return GroupView;
});
