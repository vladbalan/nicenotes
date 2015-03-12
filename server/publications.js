Meteor.publish('notes', function() {
  return Notes.find({userId: this.userId});
});