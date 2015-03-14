// Router configuration
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

// Controllers
NotesListController = RouteController.extend({
  template: 'notesList',
  data: function() {
    return {
      notes: Notes.find()
    };
  }
});

MyNotesListController = NotesListController.extend({
  waitOn: function() {
    var user = Meteor.user();
    if (!! user) {
      return [
        Meteor.subscribe('notes', {userId: user._id}),
        Meteor.subscribe('allUsers')
      ];
    }
  }
});
SharedNotesListController = NotesListController.extend({
  waitOn: function() {
    var user = Meteor.user();
    if (!! user) {
      return [
        Meteor.subscribe('sharedNotes', user._id),
        Meteor.subscribe('allUsers')
      ];
    }
  }
});

// Routes
Router.route('/', {
  name :'myNotes',
  controller: MyNotesListController
});
Router.route('/shared', {
  name :'sharedNotes',
  controller: SharedNotesListController
});
Router.route('/create', {
  name :'createNote',
});
Router.route('/note/:_id', {
  name :'note',
  waitOn: function() {
    return [
      Meteor.subscribe('note', this.params._id),
      Meteor.subscribe('allUsers')
    ];
  },
  data: function() { 
    return Notes.findOne(this.params._id); 
  }
});
Router.route('/edit/:_id', {
  name :'editNote',
  waitOn: function() {
    return Meteor.subscribe('note', this.params._id);
  },
  data: function() { 
    return Notes.findOne(this.params._id); 
  }
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
