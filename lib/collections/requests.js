Requests = new Mongo.Collection('requests');

Requests.allow({
	insert: function(userId, doc) {
		// only allow posting if user is logged in
		return !! userId;
	}
});