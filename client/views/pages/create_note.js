var templateName = 'createNote';
Template.createNote.created = function() {
  Session.set(templateName + 'Validator', {});
}

Template.createNote.rendered = function() {
  $('#tags').tagsInput();
}

Template.createNote.events({
  'submit form': function(e) {
    e.preventDefault();

    var note = {
      name: $(e.target).find('[name=name]').val(),
      content: $(e.target).find('[name=content]').val(),
      tags: $(e.target).find('[name=tags]').val()
    };

    var validator = validateNote(note);
    if (validator.name || validator.content)
      return Session.set(templateName + 'Validator', validator);

    Meteor.call('noteInsert', note, function(error, result) {
      if (! error) {
        Router.go('myNotes', {_id: result._id});  
      }
    });
  }
});