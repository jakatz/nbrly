Template.requestEdit.created = function() {
	Session.set('requestEditErrors', {});
}

Template.requestEdit.helpers({
	errorMessage: function(field) {
		return Session.get('requestEditErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('requestEditErrors')[field] ? 'has-error' : '';
	}
});

Template.requestEdit.rendered = function() {
	$('#date-picker').datepicker();
}

Template.requestEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentRequestId = this._id;

		var requestProperties = {
			title: $(e.target).find('[name=title]').val(),
			description: $(e.target).find('[name=description]').val(),
			dueDate: $(e.target).find('[name=due-date]').val()
		}

		var errors = validateRequest(requestProperties);
		if (errors.title || errors.description || errors.dueDate) {
			return Session.set('requestEditErrors', errors);
		}

		Requests.update(currentRequestId, {$set: requestProperties}, function(error) {
			if (error) {
				// display the error to the user
				throwError(error.reason);
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