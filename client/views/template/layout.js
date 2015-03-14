Template.layout.rendered = function() {
	$('[data-toggle=offcanvas]').click(function() {
		$('.row-offcanvas').toggleClass('active');
		$('.btn-toggle-sidebar').toggleClass('glyphicon-chevron-left').toggleClass('glyphicon-chevron-right')
	});
}