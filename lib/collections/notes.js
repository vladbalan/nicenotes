// Create new Mongo Collection
Notes = new Mongo.Collection('notes');

// Configure easySearch
Notes.initEasySearch(['name', 'tags'], {
    'limit' : 20,
    'use' : 'minimongo'
});


// allow and deny rules
Notes.allow({
  update: function(userId, note) { return hasWritePermission(userId, note); },
  remove: function(userId, note) { return hasWritePermission(userId, note); },
});

// Validate Note fields
validateNote = function (attributes) {
	var validator = {};

	// Validation rules
	if (!attributes.name) {
		validator.name = "The note must have a name";
	}
	if (!attributes.content) {
		validator.content = "The note must have a content";
	}

	return validator;
}

// Random color generator (inspired by http://www.paulirish.com/2009/random-hex-color-code-snippets/)
randomColor = function () {
	return (function (m, s, c) {
		return (c ? arguments.callee(m, s, c - 1)  : '#') +
			s[m.floor(m.random() * s.length)]
	}) (Math, 'DEF', 5)
}

// Meteor methods to be invoked from the client
Meteor.methods({
	noteInsert: function (attributes) {
		// Check for errors
		var validator = validateNote(attributes);
		if (validator.name) {
			throw new Meteor.Error('invalid-note', validator.name);
		}
		if (validator.content) {
			throw new Meteor.Error('invalid-note', validator.content);
		}

		// Create note document
		var user = Meteor.user();
		var note = _.extend(attributes, {
			userId: user._id, 
			dateCreated: new Date(),
			dateModified: new Date(),
			color: randomColor()
		});

		// Insert document into collection
		var noteId = Notes.insert(note);

		return {
			_id: noteId
		};
	}
});