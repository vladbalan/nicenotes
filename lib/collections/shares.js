// Create new Mongo Collection
Shares = new Mongo.Collection('shares');

// Validate Share fields
validateShare = function (attributes) {
	var validator = {};

	// Validation rules
	if (!attributes.email) {
		validator.email = "Please enter your friend's email address!";
	} else {
		var friend = Meteor.users.findOne({ emails: { $elemMatch: { address: attributes.email } } });
		if (!! friend) {
			var user = Meteor.user();
			if (friend._id === user._id) {
				validator.email = "Why share with yourself when you can share with others?";
			}
		} else{
			validator.email = "We couldn't find your friend :(";
		}
	}
	if (!attributes.write) {
		validator.write = "Please select a permission type!";
	}
	if (!attributes.noteId) {
		validator.noteId = "Invalid note";
	}

	return validator;
}

// Meteor methods to be invoked from the client
Meteor.methods({
	shareInsert: function (attributes) {
		// Check for errors
		var validator = validateShare(attributes);
		if (validator.email) {
			throw new Meteor.Error('invalid-share', validator.email);
		}
		if (validator.write) {
			throw new Meteor.Error('invalid-share', validator.write);
		}
		if (validator.noteId) {
			throw new Meteor.Error('invalid-share', validator.noteId);
		}

		// Create share document
		var friend = Meteor.users.findOne({ emails: { $elemMatch: { address: attributes.email } } });
		if (!! friend) {
			var user = Meteor.user();
			var share = {
				ownerId: user._id, 
				friendId: friend._id, 
				noteId: attributes.noteId,
				dateCreated: new Date(),
				read: true,
				write: (attributes.write != 0) ? true : false
			};

			// Insert document into collection
			var shareId = Shares.insert(share);

			return {
				_id: shareId
			};
		}
	}
});