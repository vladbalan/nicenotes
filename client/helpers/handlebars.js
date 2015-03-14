Handlebars.registerHelper('errorMessage', function(field, templateName) {
	return Session.get(templateName + 'Validator')[field];
});

Handlebars.registerHelper('errorClass', function(field, templateName) {
	return !!Session.get(templateName + 'Validator')[field] ? 'has-error' : '';
});

Handlebars.registerHelper('activeRouteClass', function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.getName() === name
    });
    
    return active && 'active';
});