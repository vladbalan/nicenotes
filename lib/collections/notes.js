// Create new Mongo Collection
Notes = new Mongo.Collection('notes');

// Server side validation function
serverValidation = function (note) {
	var errors = {};

	// Validation rules
	if (!note.name) {
		errors.name = "The note must have a name";
	}
	if (!note.content) {
		errors.content = "The note must have a content";
	}

	return errors;
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
		var errors = serverValidation(attributes);
		if (errors.name) {
			throw new Meteor.Error('invalid-note', errors.name);
		}
		if (errors.content) {
			throw new Meteor.Error('invalid-note', errors.content);
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