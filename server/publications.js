Meteor.publish('notes', function() {
  return Notes.find({userId: this.userId});
});

// TODO: find a better way to search through emails without publishing all users
Meteor.publish("allUsers", function () {
	return Meteor.users.find({}, {
		fields: {
			'emails': 1
		}
	});
});