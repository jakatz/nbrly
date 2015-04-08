Template.requestsList.helpers({
  requests: function() {
    return Requests.find({ acceptor: null }, {sort: {submitted: -1}});
  },

  zeroRequests: function() {
  	if (Requests.find().count() === 0) {
  		return true;
  	}
  }
});