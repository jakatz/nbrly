Requests = new Mongo.Collection('requests');

Requests.allow({
	update: function(userId, request) {
		return ownsDocument(userId, request);
	},
	remove: function(userId, request) {
		return ownsDocument(userId, request);
	}
})

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