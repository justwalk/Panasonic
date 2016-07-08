define(['underscore', 'backbone', 'collection/packs'], function(_, Backbone, PacksCollection) {
    var Menu = Backbone.Model.extend({
        urlRoot: 'menu',
        defaults:{
          cache_size:0
        },
        initialize: function() {
          var self = this;
          this.packs = new PacksCollection();
          this.packs.bind('add remove reset', function(packs) {
          });
        },
        
        fetchPacks: function(callback) {
          if (!this.get('computer_id') || !this.get('id')) {
            throw new Error('Cannot fetch packs because computer or menu id is missing');
          }
          this.packs.fetchWithComputerIdAndMenuId(this.get('computer_id'), this.get('id'), callback);
          
        }
    });

    return Menu;
});