Meteor.publish("requests", function() {
	return Requests.find();
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