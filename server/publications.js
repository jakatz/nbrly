Meteor.publish("requests", function() {
	return Requests.find( {acceptor: null});
});

Meteor.publish("myRequests", function() {
	return Requests.find({ acceptor: this.userId });
});