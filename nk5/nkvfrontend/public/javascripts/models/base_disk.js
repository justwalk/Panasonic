define(['underscore', 'backbone'], function(_, Backbone) {
    var BaseDisk = Backbone.Model.extend({
        urlRoot: 'base_disk',
        idAttribute: 'ID',
		defaults: {
			Parent:0,
			Type: 'BaseDisk',
			Format: 0,
			Version: 0,
			Size: 0,
			Path:'c:\\',
			internal: 'virtual',
			SyncSpeed: 0,
			SyncDay: 0,
			SyncHour: 0,
			SyncType: 0
		}
    });
    return BaseDisk;
});