Template.requestPage.helpers({
  requests: function() {
    return Requests.find();
  },
  mapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(37.7833, -122.4167),
        zoom: 12,
        disableDefaultUI: true,
        draggable:false,
        zoomControl: false,
        scrollwheel:false
      };
    }
  }
});

Template.requestPage.onCreated(function() {
// We can use the 'ready' callback to interact with the map API once the map is ready
  GoogleMaps.ready('mapBanner', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
})