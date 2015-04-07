Template.requestsList.helpers({
  requests: function() {
    return Requests.find({}, {sort: {submitted: -1}});
  },

  zeroRequests: function() {
  	if (Requests.find().count() === 0) {
  		return true;
  	}
  }
});