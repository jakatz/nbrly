Template.requestsList.helpers({
  requests: function() {
    return Requests.find({}, {sort: {submitted: -1}});
  }
});