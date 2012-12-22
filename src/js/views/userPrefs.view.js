(function($, Backbone, app) {
	"use strict";
	app.View = app.View || {};

	app.View.UserPrefs = Backbone.View.extend({
		initialize: function(options) {
			_.bindAll(this);
			this.listenTo(this.model, "change:sessions", this.setStates);
			this.lineItem = _.template($("script.userPrefsToolbar").text().replace(/\t/g, ""));
		},

		getHTML: function(session) {
			return this.lineItem({
				s: session
			});
		},

		setStates: function() {
			this.$(".btnStar").each(this.renderStar);
			this.$(".btnLikeUnlike").each(this.renderLikeUnlike);
		},

		renderStar: function(i, el) {
			var $el = $(el);
			var data = this.model.get("sessions")[$el.data("sessionid")];
			if(data) {
				$el.addClass(data.star ? "active btn-warning" : "");
			}
		},

		renderLikeUnlike: function(i, el) {
			var $el = $(el);
			var data = this.model.get("sessions")[$el.children(".btnLike").data("sessionid")];
			if(data) {
				data.like === 1 && $el.children(".btnLike").addClass("btn-success active");
				data.like === -1 && $el.children(".btnUnlike").addClass("btn-danger active");
			}
		},

		onThumbs: function(e) {
			var target = $(e.currentTarget);
			var isOn = target.hasClass("on");
			target.parent().children(".btnLike, .btnUnlike").removeClass("on btn-success btn-danger active");
			if(!isOn) {
				target.addClass("on active " + (target.hasClass("btnLike") ? "btn-success" : "btn-danger"));
			}
			this.changeProp(target, "like", target.hasClass("btn-success") ? 1 : target.hasClass("btn-danger") ? -1 : 0);
			return false;
		},

		onStar: function(e) {
			var target = $(e.currentTarget)
			target.toggleClass("btn-warning");
			this.changeProp(target, "star", !target.hasClass("active"));
		},

		changeProp: function(target, prop, val) {
			var sessionId = target.data("sessionid");
			var sessions = this.model.get("sessions");
			if(typeof sessions[sessionId] === "undefined") {
				sessions[sessionId] = {};
			}
			sessions[sessionId][prop] = val;
			this.model.save();
		},

		events: {
			"click .btnLike": "onThumbs",
			"click .btnUnlike": "onThumbs",
			"click .btnStar": "onStar"
		}

	});
}(jQuery, Backbone, window.app = window.app || {}));