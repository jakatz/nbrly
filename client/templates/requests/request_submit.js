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

		request._id = Requests.insert(request);
		Router.go('requestPage', request);
	}
});