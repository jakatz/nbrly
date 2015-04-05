Meteor.publish("newRequests", function() {
	 return Requests.find({neighbor: null});
});

Meteor.publish("acceptedRequests", function(requestId) {
	return Requests.find({}, {requestId: user})
});