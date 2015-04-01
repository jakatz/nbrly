Template.requestSubmit.rendered = function() {
	$('#date-picker').datepicker();
}

Template.requestSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var request = {
			title: $(e.target).find('[name=title]').val(),
			description: $(e.target).find('[name=description]').val(),
			dueDate: $(e.target).find('[name=due-date]').val()
		};

		Meteor.call('requestInsert', request, function(error, result) {
			// display the error to the user and abort
			if (error) {
				return throwError(error.reason);
			}
			
			Router.go('requestPage', {_id: result._id});
		});		
	}
});