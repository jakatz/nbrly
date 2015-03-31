Template.requestEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentRequestId = this._id;

		var requestProperties = {
			title: $(e.target).find('[name=title]').val(),
			description: $(e.target).find('[name=description]').val(),
			dueDate: $(e.target).find('[name=dueDate]').val()
		}

		Requests.update(currentRequestId, {$set: requestProperties}, function(error) {
			if (error) {
				// display the error to the user
				alert(error.reason);
			} else {
				Router.go('requestPage', {_id: currentRequestId});
			}
		});
	},

	'click .delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this request?")) {
			var currentRequestId = this._id;
			Requests.remove(currentRequestId);
			Router.go('requestsList');
		}
	}
});