Requests = new Mongo.Collection('requests');

Requests.allow({
	update: function(userId, request) {
		return ownsDocument(userId, request);
	},
	remove: function(userId, request) {
		return ownsDocument(userId, request);
	}
});

Requests.deny({
	update: function(userId, request, fieldNames) {
		// may only edit the following three fields:
		return (_.without(fieldNames, 'title', 'description', 'dueDate').length > 0);
	}
})

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
			dueDate: String
		});

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
	}
});