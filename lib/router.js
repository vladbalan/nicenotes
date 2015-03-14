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

AllNotesListController = NotesListController.extend({
  waitOn: function() {
    if (!! Meteor.user()) {
      return [
        Meteor.subscribe('notes', {userId: Meteor.user()._id}),
        Meteor.subscribe('sharedNotes', Meteor.user()._id),
        Meteor.subscribe('shares', {friendId: Meteor.user()._id}),
        Meteor.subscribe('allUsers')
      ];
    }
  }
});
CreatedNotesListController = NotesListController.extend({
  waitOn: function() {
    if (!! Meteor.user()) {
      return [
        Meteor.subscribe('notes', {userId: Meteor.user()._id}),
        Meteor.subscribe('shares', {friendId: Meteor.user()._id}),
        Meteor.subscribe('allUsers')
      ];
    }
  }
});
SharedNotesListController = NotesListController.extend({
  waitOn: function() {
    if (!! Meteor.user()) {
      return [
        Meteor.subscribe('sharedNotes', Meteor.user()._id),
        Meteor.subscribe('shares', {friendId: Meteor.user()._id}),
        Meteor.subscribe('allUsers')
      ];
    }
  }
});

// Routes
Router.route('/', {
  name :'allNotes',
  controller: AllNotesListController
});
Router.route('/created', {
  name :'createdNotes',
  controller: CreatedNotesListController
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
    if (!! Meteor.user()) {
      return [
        Meteor.subscribe('note', this.params._id, Meteor.user()._id),
        Meteor.subscribe('shares', {friendId: Meteor.user()._id}),
        Meteor.subscribe('allUsers')
      ];
    }
  },
  data: function() { 
    var note = Notes.findOne(this.params._id); 
    if (! note) {
      this.render('notFound')
    } else {
      return note;
    }
  }
});
Router.route('/edit/:_id', {
  name :'editNote',
  waitOn: function() {
    if (!! Meteor.user()) {
      return Meteor.subscribe('note', this.params._id, Meteor.user()._id, true);
    }
  },
  data: function() { 
    var note = Notes.findOne(this.params._id); 
    if (! note) {
      this.render('notFound')
    } else {
      return note;
    }
  }
});

// 'Before' checks
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.layout("layoutEmpty");
      this.render('login');
    }
  } else {
    this.next();
  }
}

Router.before(requireLogin, {except: 'login'});
