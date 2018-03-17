var markerName = ""
var map;
var markers = []
var input = ""
var popularity = ""
var veryBestPic = ""
// var placeId = ""
var placeMarker = []
//recruiter adding information
var geocoder;
var lat;
var lng;
//markers below related to search query for jobs submition
var searchMarkersLatLng = []
var searchMarkerAry = []
var image;
var placePostId;
var service;
var jobId;
var queryURL;
var gMarkers = [];

//Someone needs to work on getting query working for Job Search--then posting those items to /api/SearchQuery
//Need to make small table for the location information
// $("#locationVal")
//Multi-stage approach,logic from url---
  //1. Post data using $("#addPost") template for initial location
  //2. Get markers from the $("#test") template, add functionality to post them into an array called gMarkers
  //3. Run code from URL
    //   function codeAddress() {
    // var address = document.getElementById('address').value;
    // var radius = parseInt(document.getElementById('radius').value, 10)*1000;
    // geocoder.geocode( { 'address': address}, function(results, status) {
    //   if (status == google.maps.GeocoderStatus.OK) {
    //     map.setCenter(results[0].geometry.location);
    //     var marker = new google.maps.Marker({
    //       map: map,
    //       position: results[0].geometry.location
    //     });
    //     if (circle) circle.setMap(null);
    //     circle = new google.maps.Circle({center:marker.getPosition(),
    //                                    radius: radius,
    //                                    fillOpacity: 0.35,
    //                                    fillColor: "#FF0000",
    //                                    map: map});
    //     var bounds = new google.maps.LatLngBounds();
    //     for (var i=0; i<gmarkers.length;i++) {
    //       if (google.maps.geometry.spherical.computeDistanceBetween(gmarkers[i].getPosition(),marker.getPosition()) < radius) {
    //         bounds.extend(gmarkers[i].getPosition())
    //         gmarkers[i].setMap(map);
    //       } else {
    //         gmarkers[i].setMap(null);
    //       }
    //     }
    //     map.fitBounds(bounds);
    //
    //   } else {
    //     alert('Geocode was not successful for the following reason: ' + status);
    //   }
    // });
    // }


//User search--- if they put in a Location
//Gather information from the distance query
//Geometry Library google.maps.geometry.spherical.computeDistanceBetween
//array of objects lat/longs from the api/posts
//Nice to have-- Doing loctions based on autocomplete

$(document).ready(function() {
  //job Searcher request this will need to be taken from results page of query post
  $("#test").on("click", function(event) {
    event.preventDefault();
    //emptySearchMarkersArray
    searchMarkersLatLng = []
    var radius = $(".search-radius").val();
    console.log("job search radius: ", radius)

    $.ajax({
      url: 'http://localhost:8080/api/posts',
      method: "GET",
    }).done(function(results) {
      console.log(results)
      for (var i = 0; i < results.length; i++) {
        //work on adding custom information from mySQL to the markers!
        jobId = results[i].id
        var jbTit = results[i].jobTitle
        var cmpName = results[i].companyName
        var adr1 = results[i].address
        var adr2 = results[i].city
        var adr3 = results[i].state
        var adr4 = results[i].zipCode
        var fullAddress = adr1 + " " + adr2 + " " + adr3 + " " + adr4
        var latitude = results[i].latitude
        var longitude = results[i].longitude
        var placeIdentifier = results[i].placeID
        searchMarkersLatLng.push([parseFloat(latitude), parseFloat(longitude), placeIdentifier,fullAddress,cmpName,jbTit,jobId])
        console.log(searchMarkersLatLng)
        googleMaps();
      }
    })
  });
  //recruiter post, and taking address to geocode Latitude & Longitude in mySQL
  $("#addPost").on("click", function(event) {
    event.preventDefault();
    //emptySearchMarkersArray
    searchMarkersLatLng = []
    googleMaps();
    var jobTitInput = $("#jobTit");
    var jobDescInput = $("#jobDesc");
    var jobCompInput = $("#jobComp");
    var jobAdrsInput = $("#jobAdr");
    var jobCityInput = $("#jobCity");
    var jobStateInput = $("#jobState");
    var jobZipInput = $("#jobZip");
    var address = "'" + jobAdrsInput.val().trim() + "," + " " + jobCityInput.val().trim() + "," + " " + jobStateInput.val().trim() + " " + jobZipInput.val().trim() + "'"

    function geocodeAddress() {
      geocoder.geocode({
        address: address
      }, function(results, status) {
        console.log("placeID", results[0].place_id)
        placePostId = results[0].place_id
        lat = results[0].geometry.location.lat()
        lng = results[0].geometry.location.lng()
        console.log(lat, lng)
        newPost(lat, lng)
      })
    }
    geocodeAddress()
    function newPost(lat, lng) {
      var newPost = {
        jobTitle: jobTitInput.val().trim(),
        jobDescription: jobDescInput.val().trim(),
        companyName: jobCompInput.val().trim(),
        address: jobAdrsInput.val().trim(),
        city: jobCityInput.val().trim(),
        state: jobStateInput.val().trim(),
        zipCode: jobZipInput.val().trim(),
        placeID: placePostId,
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
        location.reload();
      });
    }
  });
});
function googleMain() {
  var washingtonDC = new google.maps.LatLng(38.9072, -77.0369)
  //Creates map in HTML centered on Washington, D.C.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 38.9072,
      lng: -77.0369
    },
    zoom: 13,
  });
}
function googleMaps() {
  var washingtonDC = new google.maps.LatLng(38.9072, -77.0369)
  //Creates map in HTML centered on Washington, D.C.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 38.9072,
      lng: -77.0369
    },
    zoom: 4,
  });
  //geocoder for recruiter posting for latitude/longitude
  geocoder = new google.maps.Geocoder();
  // Display Search Markers
  if (searchMarkersLatLng != []) {
    console.log("working!")
    image = {
      url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      size: new google.maps.Size(20, 32),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 32)
    };
    shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly'
    };
    var infowindow = new google.maps.InfoWindow();
    console.log("SEARCH", searchMarkersLatLng)
    for (var i = 0; i < searchMarkersLatLng.length; i++) {
      var marksLatLng = searchMarkersLatLng[i]
      var marker = new google.maps.Marker({
            position: {lat: marksLatLng[0], lng: marksLatLng[1]
            },
            map: map,
            placeId: marksLatLng[2],
            content: '<div><strong>' + marksLatLng[4] + '</strong><br>' +
              'Job Title: ' + marksLatLng[5] + '<br>' + 'Address: ' +
              marksLatLng[3] + '</div>' + 'More Info: ' + '<a class="moreInfoUrl" data-value='+marksLatLng[6]+'" href="api/posts/'+ marksLatLng[6]+'">testURL</a>' + '<br>',
            zIndex: 999999
          })
      gMarkers.push(marker);
      console.log("gMarkers array: ", gMarkers)
      google.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.setContent(this.content);
            infowindow.open(map, this);
      })
      google.maps.event.addListener(marker, 'click', function() {
          queryURL = 'http://localhost:8080/api/posts/' + $(".moreInfoUrl").data("value")
          console.log(queryURL)
          $.ajax({
            url: queryURL,
            method: "GET",
          }).done(function(results) {
            console.log(results)
              $("#markerName").empty()
              $("#markerCheckins").empty()
              $("#applyButton").empty()
              var jbTit = results.jobTitle
              var cmpName = results.companyName
              var jobDesc = results.jobDescription
              var adr1 = results.address
              var adr2 = results.city
              var adr3 = results.state
              var adr4 = results.zipCode
              var fullAddress = adr1 + " " + adr2 + " " + adr3 + " " + adr4
              var createdAt = results.created_at
              var updatedAt = results.updated_at

              var placeDetailsModal = ('<div>'+ 'Company:' + cmpName + '<br>' + 'Job Description:'+ jobDesc + '<br>' + 'Job Address:'+ fullAddress + '<br>' +'Created At:'+ createdAt + '<br>' +'Updated At:'+ updatedAt+ '<br>' +'</div>');
              $("#markerName").text('Job Title: ' + jbTit)
              $("#markerCheckins").append(placeDetailsModal)
              $("#applyButton").append('<button type="submit" id="apply" class="btn btn-success">Apply</button>')
              jQuery.noConflict();
              $("#markerModal").modal()
          })
        });
    }
  }

//--------------------Autocomplete search box information with google-----------
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
        $(".special").on("click", function() {
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
        var contentString = '<h2>' + (place.name) + '</h2>' + placeDetailsInfo
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        infowindow.open(map, marker);
      });
    }
    console.log(place.reviews)
  });
}
