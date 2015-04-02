Requests = new Mongo.Collection('requests');

	// update: function(userId, request) {
	// 	return ownsDocument(userId, request);
	// },
Requests.allow({
	update: function() {
		return true;
	},
	remove: function(userId, request) {
		return ownsDocument(userId, request);
	}
});

// Requests.deny({
// 	update: function(userId, request, fieldNames, modifier) {
// 		var errors = validateRequest(modifier.$set);
// 		return errors.title || errors.description || errors.dueDate;
// 	}
// });

validateRequest = function (request) {
	var errors = {};
	if(!request.title) {
		errors.title = "Please provide a title for your request"; 
	}
	if(!request.description) {
		errors.description = "Please describe your request";
	}
	if(!request.dueDate) {
		errors.dueDate = "Please select a due date for your request";
	}
	return errors;
}

Meteor.methods({
	requestInsert: function(requestAttributes) {
		check(Meteor.userId(), String);
		check(requestAttributes, {
			title: String,
			description: String,
			dueDate: String,
		});

		var errors = validateRequest(requestAttributes);
		if (errors.title || errors.description || errors.dueDate) {
			throw new Meteor.Error('invalid request', "You must set a title, description, and due date for your request.");
		}

		var user = Meteor.user();
		var request = _.extend(requestAttributes, {
			userId: user._id,
			author: user.profile.name,
			submitted: new Date()
		});
		var requestId = Requests.insert(request);
		return {
			_id: requestId
		};
	},

	// acceptRequest: function(requestItem) {
	// 	check(Meteor.userId(), String);
	// 	check(requestItem, {
	// 		title: String,
	// 		description: String,
	// 		dueDate: String
	// 	});

	// 	var user = Meteor.user();

	// 	console.log(requestItem);

	// 	var request = _.extend(requestItem, {
	// 		neighbor: user
	// 	});

	// 	console.log(request);
	// 	return request;
		// if (request.neighbor) {
		// 	return throwError("This request has already been accepted!");
		// } else {
		// 	request.neighbor = user;
		// }
	// }
});