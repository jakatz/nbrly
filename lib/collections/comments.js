Comments = new Mongo.Collection('comments');

Meteor.methods({
	commentInsert: function(commentAttributes) {
		check(this.userId, String);
		check(commentAttributes, {
			requestId: String,
			body: String
		});

		var user = Meteor.user();
		var request = Requests.findOne(commentAttributes.requestId);
		if (!request) {
			throw new Meteor.Error('invalid-comment', 'You must comment on a request');
		}

		comment = _.extend(commentAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		// update the request with the number of comments
		Requests.update(comment.requestId, {$inc: {commentsCount: 1}});

		return Comments.insert(comment);
	}
});