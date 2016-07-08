define([
  'jquery',
  'underscore',
  'backbone',
  'collection/groups',
  'views/groups/groups'
], function($, _, Backbone, GroupsCollection, GroupsView){
    var ClientRouter = Backbone.Router.extend({
        routes:{
            'clients' : 'select',
            'clients/:group_id' : 'select'
        },

        initialize: function(){
          var groups = new GroupsCollection();
          this.groupsView = new GroupsView({router: this, collection: groups});
        },
        
        select: function(group_id){
          this.groupsView.collection.fetch();
          this.groupsView.setGroupid(group_id);
          $('#content-body').html(this.groupsView.el);
          this.groupsView.delegateEvents();
        }
    });
    
  return ClientRouter;
});