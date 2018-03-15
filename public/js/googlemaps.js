var markerName = ""
var map;
var markers = []
var hotMarker = []
var restMarker = []
var barMarker = []
var musMarker = []
var input = ""
var popularity = ""
var veryBestPic = ""
var placeId = ""
var placeMarker = []
var geocoder;
var lat;
var lng;

$(document).ready(function() {

  $("#addPost").on("click", function(event) {
      event.preventDefault();
      var jobTitInput = $("#jobTit");
      var jobDescInput = $("#jobDesc");
      var jobAdrsInput = $("#jobAdr");
      var jobCityInput = $("#jobCity")
      var jobStateInput = $("#jobState");
      var jobZipInput = $("#jobZip");
      var address = "'" + jobAdrsInput.val().trim() + "," + " " + jobCityInput.val().trim() + "," + " " + jobStateInput.val().trim() + " " + jobZipInput.val().trim() + "'"
      function geocodeAddress() {
              geocoder.geocode({address: address}, function(results, status) {
                  lat = results[0].geometry.location.lat()
                  lng = results[0].geometry.location.lng()
                  console.log(lat,lng)
                  newPost(lat,lng)
                })
            }
      geocodeAddress()
      function newPost(lat,lng) {
        var newPost = {
          jobTitle: jobTitInput.val().trim(),
          jobDescription: jobDescInput.val().trim(),
          address: jobAdrsInput.val().trim(),
          city: jobCityInput.val().trim(),
          state: jobStateInput.val().trim(),
          zipCode: jobZipInput.val().trim(),
          latitude: lat,
          longitude: lng
        };
        if (newPost != {}) {
          submitPost(newPost);
        }
      }
    function submitPost(newPost) {
      $.post("/api/posts", newPost, function() {
        console.log(newPost)
      });
    }
  });
});

function googleMaps() {
  var washingtonDC = new google.maps.LatLng(38.9072, -77.0369)
  //Creates map in HTML centered on Washington, D.C.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 38.9072,
      lng: -77.0369
    },
    zoom: 13,
  });
  geocoder = new google.maps.Geocoder();
  // Create the search box and link it to the UI element.
  input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
    //when bounds change, reset marker names and array
    markerName = ""
    markersNameArray = []
  });;
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    })
    // Clear out the old markers from modul
    placeMarker.forEach(function(marker) {
      marker.setMap(null);
    })
    markers = [];
    //empty out the location query divs when new search occurs
    $("#locQueryDivs").empty()

    //Store the bounds when panning around
    var bounds = new google.maps.LatLngBounds();
    searchBox.setBounds(bounds)

    // For each place, get the icon, name and location.
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location,
        placeId: place.place_id
      })
            var service = new google.maps.places.PlacesService(map);
            service.getDetails({
              placeId: marker.placeId
            }, function(place, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
              //grabs marker lat/long
              var lat = marker.getPosition().lat()
              var lng = marker.getPosition().lng()

              var divContainer = $("<div class='col-md-12 text-white bg-secondary mb-3 margin'>")
              var divHeader = $("<h4 class='card-header bg-primary margin2'>")
              var divBody = $("<div class='card-body'>")
              var placeDetailsTitle = (place.name)
              var zoomToLocationBtn = $("<button class='btn btn-primary special fa fa-search-plus'>")
              zoomToLocationBtn.attr('id', placeDetailsTitle)
              zoomToLocationBtn.attr('data-lat', lat)
              zoomToLocationBtn.attr('data-lng', lng)
              var placeDetailsModal = ('<div><img src="' + place.photos["0"].getUrl({
                  'maxWidth': 200,
                  'maxHeight': 200
                }) + '">' + '<br>' +
                place.formatted_address + '<br>' + 'Average User Rating: ' + place.rating + '/5' + '<br>' + 'Price Level: ' + place.price_level + '/5' + '<br>' + 'Phone Number: ' + place.international_phone_number + '<br>' + 'Official site: ' + '<a href="' + place.website + '">' + place.website + '</a>' + '<br>' + 'User Feedback: ' + place.reviews["0"].author_name + '<br>' + 'Comments: ' + place.reviews["0"].text + '</div>');

                divHeader.append(placeDetailsTitle)
                divHeader.append(zoomToLocationBtn)
                divContainer.append(divHeader)
                divBody.append(placeDetailsModal)
                divContainer.append(divBody)
                $("#locQueryDivs").append(divContainer)
                //newly created zoom icon button
                $(".special").on("click", function(){
                  //grabs lat/long attribution from new element
                  var thisLat = ($(this).attr('data-lat'))
                  var thisLng = ($(this).attr('data-lng'))
                  map.setCenter(new google.maps.LatLng(thisLat, thisLng));
                  map.setZoom(16)
                  //scrolls to top of page on button click
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                })

                }
              })
      //Push marker to markers array
      markers.push(marker);
      console.log(markers)


      //Click event to add Marker name to array to link with FourSquare & Place Details Function
      google.maps.event.addListener(marker, 'click', function(location) {
        placeId = place.place_id
        console.log("placeID", placeId)
        markerName = marker.title
        placeDetails(placeId)

        location = location.latLng
        console.log("location name: ", markerName)
      })
      //When creating markers, the zoom extent is adjusted to fit all markers in viewport
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
//Google Maps Place Details//
function placeDetails(placeId) {
  // Clear out the old markers.
  placeMarker.forEach(function(marker) {
    marker.setMap(null);
  })
  var service = new google.maps.places.PlacesService(map);
  //Service request for Place Details, use placeId generated from googleMaps function when marker is clicked
  service.getDetails({
    placeId: placeId
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {

      var icon = {
        url: place.icon,
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      marker = new google.maps.Marker({
        map: map,
        icon: icon,
        position: place.geometry.location,
        zIndex: 9999999
      });
      placeMarker.push(marker)
      google.maps.event.addListener(marker, 'click', function() {
        var placeDetailsInfo = ('<div><img src="' + place.photos["0"].getUrl({
            'maxWidth': 200,
            'maxHeight': 200
          }) + '">' + '<br>' +
          place.formatted_address + '<br>' + 'Average User Rating: ' + place.rating + '/5' + '<br>' + 'Price Level: ' + place.price_level + '/5' + '<br>' + 'Phone Number: ' + place.international_phone_number + '<br>' + 'Official site: ' + '<a href="' + place.website + '">' + place.website + '</a>' + '<br>' + 'User Feedback: ' + place.reviews["0"].author_name + '<br>' + 'Comments: ' + place.reviews["0"].text + '</div>');

        var contentString = '<h2>'+(place.name)+'</h2>' + placeDetailsInfo
;
        var infowindow = new google.maps.InfoWindow({
            content: contentString
          });
        infowindow.open(map, marker);
      });
    }
    console.log(place.reviews)
  });
}
