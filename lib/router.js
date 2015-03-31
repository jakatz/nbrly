Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('requests');
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


Router.onBeforeAction('dataNotFound',{ only: 'requestPage' });
Router.onBeforeAction(requireLogin, { only: 'requestSubmit' });
Router.onBeforeAction(function() {
  GoogleMaps.load();
  this.next();
}, { only: 'requestsList' });


