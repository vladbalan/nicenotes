Template.createNote.events({
  'submit form': function(e) {
    e.preventDefault();

    var note = {
      name: $(e.target).find('[name=name]').val(),
      content: $(e.target).find('[name=content]').val()
    };

    Meteor.call('noteInsert', note, function(error, result) {
      if (! error) {
        Router.go('dashboard', {_id: result._id});  
      }
    });
  }
});