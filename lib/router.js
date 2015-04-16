Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('notifications'), Meteor.subscribe('directory')];
  }
});

// Requests List Controller
RequestsListController = RouteController.extend({
  template: 'requestsList',
  increment: 5,
  requestsLimit: function() {
    return parseInt(this.params.requestsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {submitted: -1}, limit: this.requestsLimit()};
  },
  waitOn: function() {
    return Meteor.subscribe('allRequests', this.findOptions());
  },
  subscriptions: function() {
    this.requestsSub = Meteor.subscribe('allRequests', this.findOptions());
  },
  requests: function() {
    return Requests.find({acceptor: null}, this.findOptions());
  },
  data: function() {
    var hasMore = this.requests().count() === this.requestsLimit();
    var nextPath = this.route.path({requestsLimit: this.requestsLimit() + this.increment});
    return {
      requests: this.requests(),
      ready: this.requestsSub.ready,
      nextPath: hasMore ? nextPath: null
    };
  }
});

// Single request page
Router.route('/requests/:_id', { 
  name: 'requestPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singleRequest', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function() {
    return Requests.findOne(this.params._id);
  }
});

// User Profile Page
Router.route('/users/:_id', {
  name: 'userProfile',
  waitOn: function() {
    return [Meteor.subscribe('myAcceptedRequests', Meteor.user().username), Meteor.subscribe('myTasks', this.params._id)];
  },
  data: function() {
    return Meteor.users.findOne(this.params._id);
  }
});

// Edit request page
Router.route('/requests/:_id/edit', {
  name: 'requestEdit',
  waitOn: function() {
    return Meteor.subscribe('singleRequest', this.params._id);
  },
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

// Home Page
Router.route('/:requestsLimit?',{ 
  name: 'requestsList'
});

Router.onBeforeAction('dataNotFound',{ only: 'requestPage' });
Router.onBeforeAction(requireLogin, { only: 'requestSubmit' });
Router.onBeforeAction(function() {
  GoogleMaps.load();
  this.next();
}, { only: ['requestsList', 'requestPage'] });


