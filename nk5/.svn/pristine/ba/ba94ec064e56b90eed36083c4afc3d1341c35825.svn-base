define(['underscore', 'backbone'], function(_, Backbone) {
  
  var Pack = Backbone.Model.extend({
    urlRoot: 'pack',

    fetchDisks: function(callback) {
      if (!this.collection || !this.collection.computer_id || !this.collection.menu_id || !this.id) {
        throw new Error('Cannot fetch disks because computer or menu or pack id is missing');
      }
      this.packs.fetchWithComputerIdAndMenuIdAndPackId(this.collection.computer_id, this.collection.menu_id, this.id, callback);
    }
  });
  return Pack;
});