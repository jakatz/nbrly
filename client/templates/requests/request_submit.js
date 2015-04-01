Template.requestSubmit.rendered = function() {
	$('#date-picker').datepicker();
}

Template.requestSubmit.created = function() {
	Session.set('requestSubmitErrors', {});
}

Template.requestSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('requestSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('requestSubmitErrors')[field] ? 'has-error' : '';
	}
});

Template.requestSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var request = {
			title: $(e.target).find('[name=title]').val(),
			description: $(e.target).find('[name=description]').val(),
			dueDate: $(e.target).find('[name=due-date]').val()
		};

		var errors = validateRequest(request);
		if (errors.title || errors.description || errors.dueDate) {
			return Session.set('requestSubmitErrors', errors);
		}

		Meteor.call('requestInsert', request, function(error, result) {
			// display the error to the user and abort
			if (error) {
				return throwError(error.reason);
			}

			Router.go('requestPage', {_id: result._id});
		});		
	}
});