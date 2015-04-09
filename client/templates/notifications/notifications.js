Template.notifications.helpers({
	notifications: function() {
		return Notifications.find({userId: Meteor.userId(), read: false});
	},
	notificationCount: function() {
		return Notifications.find({userId: Meteor.userId(), read: false}).count();
	}
});

Template.notificationItem.helpers({
	notificationRequestPath: function() {
		return Router.routes.requestPage.path({_id: this.requestId});
	}
});

Template.notificationItem.events({
	'click a': function() {
		Notifications.update(this._id, {$set: {read: true}});
	}
});