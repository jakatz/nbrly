Meteor.publish("requests", function() {
	return Requests.find();
});

Meteor.publish("comments", function(requestId) {
	check(requestId, String);
	return Comments.find({requestId: requestId});
});

Meteor.publish("notifications", function() {
	return Notifications.find();
});

// Meteor.publish("requests", function() {
// 	return Requests.find( {acceptor: null});
// });

// Meteor.publish("myTasks", function() {
// 	return Requests.find({ acceptor: this.userId });
// });

// Meteor.publish("myAcceptedRequests", function() {
// 	return Requests.find({ author: this.username }, { acceptor: { $ne: null } });
// });