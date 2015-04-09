Template.requestItem.helpers({
	ownRequest: function() {
		return this.userId === Meteor.userId();
	},

	notAccepted: function() {
		return (this.acceptor === null);
	},

	commentsCount: function() {
		return Comments.find({ requestId: this._id}).count();
	}
});

Template.requestItem.events({
	'click .accept': function(e) {
		e.preventDefault();

		var user = Meteor.user();
		var currentRequestId = this._id;
		var acceptor = {
			acceptor: user._id
		}

		Requests.update({_id: currentRequestId}, {$set: acceptor}, function(error) {
			if (error) {
			// display the error to the user
				throwError(error.reason);
				console.log(error);
			} else {
				Router.go('requestsList');
			}
		});
	},

	'click .mark-complete': function(e) {
		e.preventDefault();

		var currentRequestId = this._id;

		Requests.update({ _id: currentRequestId}, {$set: {completed: true}}, function(error) {
			if (error) {
				throwError(error.reason);
			}
		});
	}
});