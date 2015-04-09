if (Requests.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var jonId = Meteor.users.insert({
    username: "jon"
  });
  var jon = Meteor.users.findOne(jonId);

  var connorId = Meteor.users.insert({
    username: "connor"
  });
  var connor = Meteor.users.findOne(connorId);

  var neighborlyId = Requests.insert({
    title: "Welcome to Neighborly!",
    distance: "5 miles",
    dueDate: "5/5/15",
    author: jon.username,
    completed: false,
    acceptor: null,
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2
  });

  Comments.insert({
    requestId: neighborlyId,
    userId: connor._id,
    author: connor.username,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: "Hey Jon, how can I help?"
  });

  Comments.insert({
    requestId: neighborlyId,
    userId: jon._id,
    author: jon.username,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: "Hey Connor, give me a call at 123-456-7890!"
  });

  Requests.insert({
    title: "Help please",
    distance: "5 miles",
    dueDate: "5/6/15",
    author: connor.username,
    completed: false,
    acceptor: jon._id,
    submitted: new Date(now - 10 * 3600 * 1000),
    commentsCount: 0
  });
  Requests.insert({
    title: "Need help!",
    distance: "10 miles",
    dueDate: "6/7/15",
    author: connor.username,
    completed: false,
    acceptor: null,
    submitted: new Date(now - 12 * 3600 * 1000),
    commentsCount: 0
  });
}