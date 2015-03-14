Template.login.events({
  'click .dropdown-toggle-login': function(e) {
    e.preventDefault();

    if ($(".navbar-collapse").hasClass('in')) {
		if ($("#login-dropdown-list").hasClass('open')) {
			$("#login-dropdown-list").toggleClass('open');
    		$(".navbar-collapse").toggleClass('in');
		} else {
			$("#login-dropdown-list").toggleClass('open');
		}
    } else {
		if ($("#login-dropdown-list").hasClass('open'))	{
			$(".navbar-collapse").toggleClass('in');
		} else {
			$(".navbar-collapse").toggleClass('in');
			$("#login-dropdown-list").toggleClass('open');
		}
    }
  }
});