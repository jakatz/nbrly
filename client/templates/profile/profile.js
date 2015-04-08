Template.userProfile.helpers({
  yourTasks: function() {
    return Requests.find({ acceptor: this._id }, {sort: {submitted: -1}});
  },

  yourAcceptedRequests: function() {
		return Requests.find({ author: this.username, acceptor: { $ne: null } });
	}
});