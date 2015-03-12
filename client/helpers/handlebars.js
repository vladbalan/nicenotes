Handlebars.registerHelper('errorMessage', function(field, templateName) {
	return Session.get(templateName + 'Validator')[field];
});

Handlebars.registerHelper('errorClass', function(field, templateName) {
	return !!Session.get(templateName + 'Validator')[field] ? 'has-error' : '';
});