Meteor.publish("requests", function() {
	 return Requests.find({neighbor:null});
});

Meteor.publish("myRequests", function() {
	 return Requests.find({neighbor:this.userId});
});