if (Requests.find().count() === 0) {
  Requests.insert({
    title: "Help please",
    distance: "5 miles",
    dueDate: "5/6/15",
    author: "Jon"
  });
  Requests.insert({
    title: "Need help!",
    distance: "10 miles",
    dueDate: "6/7/15",
    author: "Connor"
  });
}