Template.requestItem.helpers({
	ownRequest: function() {
		return this.userId === Meteor.userId();
	}
});

Template.requestItem.events({
	'click .accept': function(e) {
		e.preventDefault();

		var user = Meteor.user();
		var currentRequestId = this._id;
		var accepted = {
			neighbor: user
		}

		Requests.update({_id: currentRequestId}, {$set: accepted}, function(error) {
			if (error) {
			// display the error to the user
				throwError(error.reason);
				console.log(error);
			} else {
				Router.go('requestsList');
			}
		});
	}
});