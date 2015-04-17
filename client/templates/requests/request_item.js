Template.requestItem.helpers({
	ownRequest: function() {
		return this.userId === Meteor.userId();
	},

	ownTask: function() {
		return this.acceptor === Meteor.user()._id;
	},

	notAccepted: function() {
		return (this.acceptor === null);
	},

	isAccepted: function() {
		return (this.acceptor !== null);
	},

	routeIsRequestsList: function() {
		if (Router.current().route.getName() === 'requestsList') {
			return true;
		}
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
				createAcceptedRequestNotification(currentRequestId);
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