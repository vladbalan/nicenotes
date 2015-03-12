var templateName = 'editNote';
Template.editNote.created = function() {
  Session.set(templateName + 'Validator', {});
}

Template.editNote.rendered = function() {
  $('#tags').tagsInput();
}

Template.editNote.events({
  'submit form': function(e) {
    e.preventDefault();

    var noteId = this._id;

    var note = {
      name: $(e.target).find('[name=name]').val(),
      content: $(e.target).find('[name=content]').val(),
      tags: $(e.target).find('[name=tags]').val()
    };

    var validator = validateNote(note);
    if (validator.name || validator.content)
      return Session.set(templateName + 'Validator', validator);

    Notes.update(noteId, {$set: note}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('dashboard', {_id: noteId});
      }
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this note?")) {
      var noteId = this._id;
      Notes.remove(noteId);
      Router.go('dashboard');
    }
  }
});