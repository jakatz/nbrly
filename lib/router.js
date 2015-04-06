Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',

});

// Home Page
Router.route('/',{ 
  name: 'requestsList',
  waitOn: function() {
    return Meteor.subscribe('requests');
  }
});

// Single request page
Router.route('/requests/:_id', { 
  name: 'requestPage',
  waitOn: function() {
    return Meteor.subscribe('requests');
  },
  data: function() {
    return Requests.findOne(this.params._id);
  }
});

// Edit request page
Router.route('/requests/:_id/edit', {
  name: 'requestEdit',
  data: function() { return Requests.findOne(this.params._id); }
});

// Submit request page
Router.route('/submit', {name: 'requestSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

// User Profile Page
Router.route('/users/:_id', {
  name: 'userProfile',
  waitOn: function() {
    return Meteor.subscribe('myRequests');
  },

  data: function() {
    // console.log(this.params);
    return Meteor.users.findOne(this.params._id);
  }
});

Router.onBeforeAction('dataNotFound',{ only: 'requestPage' });
Router.onBeforeAction(requireLogin, { only: 'requestSubmit' });
Router.onBeforeAction(function() {
  GoogleMaps.load();
  this.next();
}, { only: 'requestsList' });


