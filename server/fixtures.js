if(Requests.find().count() === 0) {
  Requests.insert({
    title: "Steve",
    distance: "5 miles"
  });
  Requests.insert({
    title: "Andrew",
    distance: "10 miles"
  });
}