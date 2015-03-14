Meteor.publish('notes', function(query) {
  return Notes.find(query);
});

Meteor.publish('sharedNotes', function(id) {
  var sharedNotesIds = [];
  var shares = Shares.find({friendId: id});
  shares.forEach(function (share) {
    sharedNotesIds.push(share.noteId);
  });
  return Notes.find({ _id: { $in: sharedNotesIds } });
});

Meteor.publish('note', function(id, userId) {

  var notes = Notes.find({_id: id, userId: userId});
  if (! notes.count()) {
    var shares = Shares.find({friendId: userId, noteId: id});
    if (shares.count()) {
      notes = Notes.find({_id: id});
    }
  }
  
  return notes;
});

// TODO: find a better way to search through emails without publishing all users
Meteor.publish("allUsers", function () {
	return Meteor.users.find({}, {
		fields: {
			'emails': 1
		}
	});
});