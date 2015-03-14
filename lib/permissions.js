// check if the user has write permission for this note
hasWritePermission = function(userId, doc) {
	return ownsDocument(userId, doc) || isSharedForWriting(doc, userId);
}

// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}

// check that the document is shared for writing with userId
isSharedForWriting = function(doc, userId) {
  var shares = Shares.find({friendId: userId, noteId: doc._id, write: true});
  return !! shares.count();
}