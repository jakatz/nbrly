Template.requestsList.helpers({
  zeroRequests: function() {
  	if (Requests.find({acceptor: null}).count() === 0) {
  		return true;
  	}
  }
});