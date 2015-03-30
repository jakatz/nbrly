Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('requests');
  }
});
Router.route('/',{ name: 'requestsList' });
Router.route('/requests/:_id', { 
  name: 'requestPage',
  data: function() {
    return Requests.findOne(this.params._id);
  }
});