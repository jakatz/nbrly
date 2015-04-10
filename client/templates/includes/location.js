Meteor.startup(function() {
	Tracker.autorun(function () {
		var lat = Geolocation.latLng();
		var geo = Geolocation.currentLocation();
		Session.set('lat', lat);
		Session.set('geo', geo);
	});
});