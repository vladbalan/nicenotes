// Router configuration
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('notes'); }
});

// Routes
Router.route('/', {
  name :'dashboard',
  data: function() {
  	return {
  		notes: Notes.find()
  	};
  }
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
