Template.note.events({
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this note?")) {
      var noteId = this._id;
      Notes.remove(noteId);
    }
  },
  'click .share': function(e) {
    e.preventDefault();
    
    $("#share-modal-name").html(this.name);
    $("#share-modal-note-id").val(this._id);
  }
});

Template.note.helpers({
	tagsArray: function() {
		return (!! this.tags && this.tags.length > 0) ? this.tags.split(',') : [];
	}
});