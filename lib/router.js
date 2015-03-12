// Router configuration
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

// Routes
Router.route('/', {
  name :'dashboard',
});
Router.route('/create', {
  name :'createNote',
});

// 'Before' checks
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

Router.before(requireLogin, {only: 'createNote'});
