Template.requestsList.helpers({
  requests: function() {
    return Requests.find();
  }
});