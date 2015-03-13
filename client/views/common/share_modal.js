var templateName = 'shareModal';
Template.shareModal.created = function() {
  Session.set(templateName + 'Validator', {});
}

Template.shareModal.events({
  'click #share-modal-submit': function(e) {
    e.preventDefault();
    
    var share = {
      email: $('#share-modal-email').val(),
      write: $('#share-modal input:radio:checked').val(),
      noteId: $('#share-modal-note-id').val()
    }

    var validator = validateShare(share);
    if (validator.email || validator.write)
      return Session.set(templateName + 'Validator', validator);

    Meteor.call('shareInsert', share, function(error, result) {
      console.log(error);
      console.log(result);
    });

    $('#share-modal-email').val('');
    $('#share-modal-note-id').val('');
    $('#share-modal').modal('hide');
  }
});