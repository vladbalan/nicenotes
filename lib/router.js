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
  waitOn: function() { return Meteor.subscribe('allUsers'); },
  data: function() {
    return {
      notes: Notes.find()
    };
  }
});
Router.route('/create', {
  name :'createNote',
});
Router.route('/note/:_id', {
  name :'note',
  waitOn: function() { return Meteor.subscribe('allUsers'); },
  data: function() { 
    return Notes.findOne(this.params._id); 
  }
});
Router.route('/edit/:_id', {
  name :'editNote',
  data: function() { return Notes.findOne(this.params._id); }
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
