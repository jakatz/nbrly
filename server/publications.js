Meteor.publish("requests", function() {
	  return Requests.find({neighbor: null});
});