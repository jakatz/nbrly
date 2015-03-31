Template.requestItem.helpers({
	ownRequest: function() {
		return this.userId === Meteor.userId();
	}
});