if (ServiceConfiguration.configurations.find({service: 'facebook'}).count()===0) {
	ServiceConfiguration.configurations.insert({
		service: "facebook",
		appId: "405078386343467",
		secret: "5426371b9084da4fbf88b595eae92aed"
	});
}

Accounts.onCreateUser(function(options, user) {
	check(options, Object);
	check(user, Object);

	options.profile.email = user.services.facebook.email;
	options.profile.facebookId = user.services.facebook.id;

	user.profile = options.profile;

	return user;
});