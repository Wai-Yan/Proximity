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
var circle;
var radiusMarkers=[];

//TO DO LIST:
// Job Search query with jQueryUI--then posting those items to /api/SearchQuery with mySQL
//go back to the recruiter.html and make sure all the information is storing to mySQL properly

//WISH LIST:
//User search--- if they put in a Location
//Gather information from the distance query
//Geometry Library google.maps.geometry.spherical.computeDistanceBetween
//array of objects lat/longs from the api/posts
//Nice to have-- Doing loctions based on autocomplete

$(document).ready(function() {


  //job Searcher request this will need to be taken from results page of query post
  $("#sendSearch").on("click", function(event) {
    event.preventDefault();
    //emptySearchMarkersArray
    searchMarkersLatLng = []

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
        googleMaps()
        var address = $('#locationVal').val().trim();
        var radius = parseInt($('.search-radius').val())*(1609.34);
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var icon = {
              url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
              // https://developers.google.com/maps/documentation/javascript/markers#icons
              size: new google.maps.Size(50, 50),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
            var marker = new google.maps.Marker({
              map: map,
              icon: icon,
              position: results[0].geometry.location
            });
            if (circle) circle.setMap(null);
            circle = new google.maps.Circle({center:marker.getPosition(),
                                           radius: radius,
                                           fillOpacity: 0.35,
                                           fillColor: "#FFA07A", //https://developers.google.com/maps/documentation/javascript/examples/circle-simple
                                           map: map});
            var bounds = new google.maps.LatLngBounds();
            for (var i=0; i < gMarkers.length;i++) {
              if (google.maps.geometry.spherical.computeDistanceBetween(gMarkers[i].getPosition(),marker.getPosition()) < radius) {
                bounds.extend(gMarkers[i].getPosition())
                gMarkers[i].setMap(map);
                radiusMarkers.push(gMarkers[i])
                console.log("radius Markers selection:", radiusMarkers)
              } else {
                gMarkers[i].setMap(null);
              }
            }
            map.fitBounds(bounds);

          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        })
      }
      });
    });


  //recruiter post, and taking address to geocode Latitude & Longitude in mySQL
  $("#addPost").on("click", function(event) {
    event.preventDefault();
    //emptySearchMarkersArray
    searchMarkersLatLng = []
    googleMaps();
    var jobTitInput = $("#jobTit");
    var jobDescInput = $("#jobDesc");
    var jobQualInput = $("#jobQualDesc")
    var jobAddInfoInput = $("#jobAddInfoDesc")
    // var jobCompInput = $("#jobComp");
    var jobAdrsInput = $("#jobAdr");
    var jobCityInput = $("#jobCity");
    // var jobStateSelector = $("#jobState");
    var jobStateSelector = document.getElementById("jobState")
    var jobStateInput = jobStateSelector.options[jobStateSelector.selectedIndex].value
    console.log(jobStateInput)
    var jobZipInput = $("#jobZip");
    var address = "'" + jobAdrsInput.val().trim() + "," + " " + jobCityInput.val().trim() + "," + " " + String(jobStateInput) + " " + jobZipInput.val().trim() + "'"
    geocodeAddress()

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
    function newPost(lat, lng) {
      var newPost = {
        jobTitle: jobTitInput.val().trim(),
        jobDescription: jobDescInput.val().trim(),
        jobQualification: jobQualInput.val().trim(),
        additionalInfo: jobAddInfoInput.val().trim(),
        // companyName: jobCompInput.val().trim(),
        address: jobAdrsInput.val().trim(),
        city: jobCityInput.val().trim(),
        state: String(jobStateInput),
        zipCode: jobZipInput.val().trim(),
        placeID: placePostId,
        latitude: lat,
        longitude: lng
      };
      submitPost(newPost);

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
    zoom: 4,
  });
}
function googleRecruiter() {
  var washingtonDC = new google.maps.LatLng(38.9072, -77.0369)
  //Creates map in HTML centered on Washington, D.C.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 38.9072,
      lng: -77.0369
    },
    zoom: 4,
  });
}
function googleMaps() {
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

              var placeDetailsModal = ('<div>'+ 'Company: <COMPANY NAME>' + '<br>' + 'Job Description:'+ jobDesc + '<br>' + 'Job Address:'+ fullAddress + '<br>' +'Created At:'+ createdAt + '<br>' +'Updated At:'+ updatedAt+ '<br>' +'</div>');
              $("#markerName").text('Job Title: ' + jbTit)
              $("#markerCheckins").append(placeDetailsModal)
              $("#applyButton").append('<button type="submit" id="apply" class="btn btn-success">Apply</button>')
              jQuery.noConflict();
              $("#markerModal").modal()
          })
        });
    }
  }
}
