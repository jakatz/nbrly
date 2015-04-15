Meteor.publish("allRequests", function(options) {
	check(options, {
		sort: Object,
		limit: Number,
	});
	return Requests.find({}, options);
});

Meteor.publish("singleRequest", function(id) {
	check(id, String)
	return Requests.find(id);
});

Meteor.publish("comments", function(requestId) {
	check(requestId, String);
	return Comments.find({requestId: requestId});
});

Meteor.publish("notifications", function() {
	return Notifications.find({userId: this.userId, read: false});
});

Meteor.publish("myTasks", function(userId) {
	check(userId, String);
	return Requests.find({ acceptor: userId });
});

Meteor.publish("myAcceptedRequests", function(username) {
	check(username, String);
	return Requests.find({ author: username }, { acceptor: { $ne: null } });
});