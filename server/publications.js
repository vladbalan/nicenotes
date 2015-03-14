Meteor.publish('notes', function(query) {
  return Notes.find(query);
});

Meteor.publish('shares', function(query) {
  return Shares.find(query);
});

Meteor.publish('sharedNotes', function(id) {
  var sharedNotesIds = [];
  // Find which notes are shared with user
  var shares = Shares.find({friendId: id});
  shares.forEach(function (share) {
    // Store shared notes ids
    sharedNotesIds.push(share.noteId);
  });
  // Find shared notes
  return Notes.find({ _id: { $in: sharedNotesIds } });
});

Meteor.publish('note', function(id, userId, checkIfEditable) {
  // Find users own note
  var notes = Notes.find({_id: id, userId: userId});
  if (! notes.count()) {
    if (checkIfEditable) {
      // Check if note is shared with user with write permission
      var shares = Shares.find({friendId: userId, noteId: id, write: true});
    } else {
      // Check if note is shared with user, regardless of write permission
      var shares = Shares.find({friendId: userId, noteId: id});
    }
    if (shares.count()) {
      // If share is registered in the database, find the note
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