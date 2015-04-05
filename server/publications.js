Meteor.publish("newRequests", function() {
	 return Requests.find({neighbor: null});
});

Meteor.publish("acceptedRequests", function(requestId) {
	return Requests.find({}, {requestId: user})
});

// Meteor.publish("userProfile", function() {
	// return Meteor.users.find();
	// var user = Meteor.users.findOne({
	// 	_id: userId
	// });

	// // if not available, mark the subscription as ready and quit
	// if (!user) {
	// 	this.ready();
	// 	return;
	// }

	// // if the user we want to display is currently logged in
	// if (this.userId === user._id) {
	// 	// then we return the corrseponding full doc via a cursor
	// 	return Meteor.users.find(this.userId);
	// }	else {
	// 	return Meteor.users.find(user._id, {
	// 		fields: {
	// 			"profile": 0
	// 		}
	// 	});
	// }
// });