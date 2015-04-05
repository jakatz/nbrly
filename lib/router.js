Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('newRequests');
  }
});

// Home Page
Router.route('/',{ name: 'requestsList' });

// Single request page
Router.route('/requests/:_id', { 
  name: 'requestPage',
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
  data: function() {
    return Meteor.users.findOne(this.params._id);
  }
});

Router.onBeforeAction('dataNotFound',{ only: 'requestPage' });
Router.onBeforeAction(requireLogin, { only: 'requestSubmit' });
Router.onBeforeAction(function() {
  GoogleMaps.load();
  this.next();
}, { only: 'requestsList' });


