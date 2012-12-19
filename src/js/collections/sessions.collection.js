(function($, app) {
	app.Collection = app.Collection || {};
	app.Collection.SessionList = Backbone.Collection.extend({
		model: app.Model.Session,
		initialize: function(models, options) {
			this.server = options.server;
			this.db = options.db;
		},

		getSpeakers: function() {
			return _.compact(_.map(this.toJSON(), function(session) {
				if(session.speaker && session.speaker.name) {
					return _.extend({
						id: session.id,
						sessionName: session.name
					}, session.speaker);
				}
			}));
		}

	});

}(jQuery, window.app = window.app || {}));