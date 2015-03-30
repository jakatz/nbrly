Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('requests');
  }
});
Router.route('/',{ name: 'requestsList' });