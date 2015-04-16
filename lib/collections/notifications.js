Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) && 
      fieldNames.length === 1 && fieldNames[0] === 'read';
  },

  insert: function() {
    return true;
  }
});

createCommentNotification = function(comment) {
  var request = Requests.findOne(comment.requestId);
  if (comment.userId !== request.userId) {
    Notifications.insert({
      userId: request.userId,
      requestId: request._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  }
};

createAcceptedRequestNotification = function(requestId) {
  var acceptedRequest = Requests.findOne(requestId);
  var acceptorName = Meteor.users.findOne(acceptedRequest.acceptor).username;
  
  Notifications.insert({
    userId: acceptedRequest.userId,
    requestId: acceptedRequest._id,
    acceptor: acceptedRequest.acceptor,
    acceptorName: acceptorName,
    read: false
  });
}