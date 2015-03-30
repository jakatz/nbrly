var requestsData = [{
  title: "Steve",
  distance: "5 miles"
},
{
  title: "Andrew",
  distance: "10 miles"
}];

Template.requestsList.helpers({
  requests: requestsData
});