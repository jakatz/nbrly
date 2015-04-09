Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) && 
      fieldNames.length === 1 && fieldNames[0] === 'read';
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