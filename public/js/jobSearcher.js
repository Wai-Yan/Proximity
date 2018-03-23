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
var keyWordSearch=[];
var keywordInput =[];
var marker;
var circlCenter;
var circleCenterLat;
var circleCenterLng;
var finalSearchQuary = [];
var resultsToAdd = [];
var testCounter = 0;
var otherCounter= 0;
var apiResults;
var check;



$(document).ready(function() {

  $("#mapviewclick").on("click", function(){
      map.setZoom(8)
  })
  //job Searcher request this will need to be taken from results page of query post
  $("#sendSearch").on("click", function(event) {
  event.preventDefault();
  //emptySearchMarkersArray
  searchMarkersLatLng = []
  searchMarkerAry = []
  gMarkers = []
  radiusMarkers=[]
  marker;
  testCounter = 0;
  otherCounter= 0;
  apiResults;
  check=false
  keywordInput = $("#keywordVal").val().trim();


    $.ajax({
    url: "api/results/" + keywordInput,
    method: "GET",
    }).done(function(results) {
    $(".jobRow").remove()
    console.log(results)
    apiResults = results
    console.log("apiResults", apiResults)
    var address = $('#locationVal').val().trim();
    var radius = parseInt($('.search-radius').val())*(1609.34);
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(res, status) {
      // console.log("geocode results", results)
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(res[0].geometry.location);
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
          position: res[0].geometry.location
        });
        googleMaps()
        googleMapsMarkers(marker,radius)
        for (var e = 0; e < results.length; e++ ) {
            for (var j = 0; j < radiusMarkers.length; j++){
              if ((radiusMarkers[j].position.lat() === parseFloat(results[e].latitude)) && (radiusMarkers[j].position.lng() === parseFloat(results[e].longitude))) {
              finalSearchQuary.indexOf(results[e].id) === -1 ? finalSearchQuary.push(results[e].id) : console.log("This item already exists");
              console.log(finalSearchQuary)
                                                  }
                                                }
                                            }
      }
      addList()
    })
    })
  })

function googleMapsMarkers(marker,radius){
        if (circle) circle.setMap(null);
        circle = new google.maps.Circle({center:marker.getPosition(),
                                       radius: radius,
                                       fillOpacity: 0.35,
                                       fillColor: "#FFA07A", //https://developers.google.com/maps/documentation/javascript/examples/circle-simple
                                       map: map});
        circleCenter = circle.center
        circleCenterLat = circle.center.lat()
        circleCenterLng = circle.center.lng()
        // console.log("Circle Lat/Lng:", circleCenterLat, circleCenterLng)
        // var bounds = new google.maps.LatLngBounds();
        for (var m=0; m < gMarkers.length; m++) {
          if (google.maps.geometry.spherical.computeDistanceBetween(gMarkers[m].getPosition(),marker.getPosition()) < radius) {
            // bounds.extend(gMarkers[i].getPosition())
            gMarkers[m].setMap(map);
            radiusMarkers.push(gMarkers[m])


            // console.log("radius Markers selection:", radiusMarkers)
          } else {
            gMarkers[m].setMap(null);
          }
        }
        map.fitBounds(circle.getBounds());
      }


      // } else {
      //   alert('Geocode was not successful for the following reason: ' + status);
      // } 2538 N. Greenbrier St. ARlington, VA 22207

function addList() {
  // if (otherCounter === finalSearchQuary.length){
  //   return;
  // } else {
    console.log("FINALSEARCH & TEST=TRUE:",finalSearchQuary )
  for (var q = 0; q < finalSearchQuary.length; q++) {
    queryURL = "/api/posts/" + finalSearchQuary[q]
      console.log(queryURL)
      // if (q === finalSearchQuary.length){
      //   return
      // }
      $.ajax({
        url: queryURL,
        method: "GET",
      }).done(function(results) {
        var tBody = $("tbody")
        var tRow = $("<tr>").addClass("jobRow")
        var titleTd = $("<td>").text(results.jobTitle)
        var star = $("<td id='" + results.id + "'>")
        var companyTd = $("<td>").text(results.companyName)
        var cityTd = $("<td>").text(results.city)
        var stateTd = $("<td>").text(results.state)
        var viewbtn = $("<td>")
        var btn = $('<input />', {
          type: "button",
          value: "View",
          class: "btn-viewPost",
          "data-toggle": "modal",
          "data-target": "#viewJobPostInfo",
          on: {
            click: function() {
              // console.log ( posts.id );
              displayPost(results.id)
            }
          }
        })
        var empty = true;
        var starbtn = $('<p />', {
          class: "star",
          on: {
            click: function() {
              if (empty) {
                var clickedJobId = $(this).parent().attr("id");
                starbtn.removeClass("star")
                starbtn.addClass("checkedStar")
                starJob(clickedJobId)
                console.log(clickedJobId)
                empty = false;
                // then store
              } else {
                starbtn.removeClass("checkedStar")
                starbtn.addClass("star")
                unstarJob()
                empty = true;
                // then remove
              }
            }
          }
        })
        viewbtn.append(btn)
        star.append(starbtn)
        tRow.append(titleTd, star, companyTd, cityTd, stateTd, viewbtn)
        tBody.append(tRow);
      })
    }
  }
  // }
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
  // console.log(jobStateInput)
  var jobZipInput = $("#jobZip");
  var address = "'" + jobAdrsInput.val().trim() + "," + " " + jobCityInput.val().trim() + "," + " " + String(jobStateInput) + " " + jobZipInput.val().trim() + "'"
  geocodeAddress()
})

  function geocodeAddress() {
    geocoder.geocode({
      address: address
    }, function(results, status) {
      // console.log("placeID", results[0].place_id)
      placePostId = results[0].place_id
      lat = results[0].geometry.location.lat()
      lng = results[0].geometry.location.lng()
      // console.log(lat, lng)
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
      // console.log(newPost)
      location.reload();
    });
  }

  var resultsArr = [];

  // initalize the latest jobs list
  getPosts();


  // hide map at default
  $("#mapview").hide();

  // hide map on click of list view
  $("#listviewclick").on("click", function() {
    $("#mapview").hide();
    $("#listview").show();
  })

  // hide list on click of map view
  $("#mapviewclick").on("click", function() {
    $("#mapview").show();
    $("#listview").hide();
  })

  // //grab value upon hitting submit button
  // $("#sendSearch").on("click", function(event) {
  //   event.preventDefault();
  //   var keywordInput = $("#keywordVal").val().trim();
  //   // var qstring= keywordInput.replace(/ /g,"+");
  //   // console.log("this is the query string" + qstring)
  //   getResults(keywordInput);
  //   // ("#keywordVal").val("")
  // });


  // print latest ten items to rows in the table
  function initializeRows(posts) {
    var latestPosts = posts.reverse();
    var rowsToAdd = [];
    for (var i = 0; i < 4; i++) {
      rowsToAdd.push(createNewRow(latestPosts[i]));
    }
    $("#recentJobs").append(rowsToAdd);
  }

  // // print all results that match the query
  // function initializeResultsRows(results) {
  //   var latestResults = results.reverse();
  //   console.log(latestResults)
  //   var resultsToAdd = [];
  //   console.log("here is the array" + resultsToAdd)
  //   for (var i = 0; i < latestResults.length; i++) {
  //     resultsToAdd.push(createNewRow(latestResults[i]));
  //   }
  //   console.log("new array" + JSON.stringify(resultsToAdd))
  //   $("#recentJobs").append(resultsToAdd);
  // }

  // get all posts with no limit on the query
  function getPosts() {
    $.get("/api/posts", function(data) {
      posts = data;
      initializeRows(posts);
      console.log(posts)
    });
    $("#latestJobsText").text("Latest jobs")
  }

  // // get posts based on the queries entered
  // function getResults(keywordInput) {
  //     queryURL = "/api/results/" + keywordInput
  //     console.log(queryURL)
  //     $.ajax({
  //       url: queryURL,
  //       method: "GET",
  //     }).done(function(results) {
  //       $(".jobRow").remove()
  //       initializeResultsRows(results)
  //       // pagination(results)
  //       console.log(results)
  //     });
  //     $("#sectionResultsTitle").text("Your search results for " + keywordInput + " jobs in " + "(variable)")
  //   }
  // }

  function createNewRow(posts) {
    var tBody = $("tbody")
    var tRow = $("<tr>").addClass("jobRow")
    var titleTd = $("<td>").text(posts.jobTitle)
    var star = $("<td id='" + posts.id + "'>")
    var companyTd = $("<td>").text(posts.companyName)
    var cityTd = $("<td>").text(posts.city)
    var stateTd = $("<td>").text(posts.state)
    var viewbtn = $("<td>")
    var btn = $('<input />', {
      type: "button",
      value: "View",
      class: "btn-viewPost",
      "data-toggle": "modal",
      "data-target": "#viewJobPostInfo",
      on: {
        click: function() {
          // console.log ( posts.id );
          displayPost(posts.id)
        }
      }
    })
    var empty = true;
    var starbtn = $('<p />', {
      class: "star",
      on: {
        click: function() {
          if (empty) {
            var clickedJobId = $(this).parent().attr("id");
            starbtn.removeClass("star")
            starbtn.addClass("checkedStar")
            starJob(clickedJobId)
            console.log(clickedJobId)
            empty = false;
            // then store
          } else {
            starbtn.removeClass("checkedStar")
            starbtn.addClass("star")
            unstarJob()
            empty = true;
            // then remove
          }
        }
      }
    })
    viewbtn.append(btn)
    star.append(starbtn)
    tRow.append(titleTd, star, companyTd, cityTd, stateTd, viewbtn)
    tBody.append(tRow);
  }

  // click action for view to pop up with modal on the job info
  function displayPost(id) {
    queryURL = "api/posts/" + id
    console.log(queryURL)
    $.ajax({
      url: queryURL,
      method: "GET",
    }).done(function(results) {
      console.log(results)
      var applybtn = $('<input />', {
        type: "button",
        value: "Apply",
        class: "apply-btn",
        on: {
          click: function() {
            window.open(postLink, '_blank');
            // window.open("http://www.facebook.com", '_blank');
            console.log("click to go to url")
          }
        }
      })
      $("#viewJobPostTitle").text(results.jobTitle)
      $("#apply-btn-area").html(applybtn)
      // var jbTit = results.jobTitle
      var cmpName = results.companyName
      var jobDesc = results.jobDescription
      var jobQual = results.jobQualification
      var addInfo = results.additionalInfo
      var adr1 = results.address
      var adr2 = results.city
      var adr3 = results.state
      var adr4 = results.zipCode
      var fullAddress = adr1 + " " + adr2 + " " + adr3 + " " + adr4
      var createdAt = results.created_at
      var updatedAt = results.updated_at

      var placeDetailsModal = ('<div>' + cmpName + '<br>' + '<br>' + '<h5>Job Description: </h5>' + jobDesc + '<br>' + '<br>' + '<h5>Qualifications: </h5>' + jobQual + '<br>' + '<br>' + '<h5>Additional Information: </h5>' + addInfo + '<br>' + '<br>' + '<h5>Job Address: </h5>' + adr1 + '<br>' + adr2 + ', ' + adr3 + ' ' + adr4 + '</div>');

      var noQualDetailsModal = ('<div>' + cmpName + '<br>' + '<br>' + '<h5>Job Description: </h5>' + jobDesc + '<br>' + '<br>' + '<h5>Additional Information: </h5>' + addInfo + '<br>' + '<br>' + '<h5>Job Address: </h5>' + adr1 + '<br>' + adr2 + ', ' + adr3 + ' ' + adr4 + '</div>');

      var noAddInfoDetailsModal = ('<div>' + cmpName + '<br>' + '<br>' + '<h5>Job Description: </h5>' + jobDesc + '<br>' + '<br>' + '<h5>Qualifications: </h5>' + jobQual + '<br>' + '<br>' + '<h5>Job Address: </h5>' + adr1 + '<br>' + adr2 + ', ' + adr3 + ' ' + adr4 + '</div>');

      var noQualorInfoDetailsModal = ('<div>' + cmpName + '<br>' + '<br>' + '<h5>Job Description: </h5>' + jobDesc + '<br>' + '<br>' + '<h5>Job Address: </h5>' + adr1 + '<br>' + adr2 + ', ' + adr3 + ' ' + adr4 + '</div>');

      if (addInfo === undefined && jobQual === undefined) {
        $(".job-view-body").html(noQualorInfoDetailsModal)
      } else if (addInfo === undefined) {
        $(".job-view-body").html(noAddInfoDetailsModal)
      } else if (jobQual === undefined) {
        $(".job-view-body").html(noQualDetailsModal)
      } else {
        $(".job-view-body").html(placeDetailsModal)
      }
    })
  };


  // need to include conditional if logged in
  // $("#recruiter-btn").on("click", function() {
  //   console.log("registering button click");
  //   window.location = "/recruiter";
  // })

  $(".checkedStar").on("click", function() {
    unstarJob();
      })
  // pagination function
  //   var table =  $('#myTable');
  // var b = (array of objects from the result)
  // var max_size=b.length;
  // var sta = 0;
  // var elements_per_page = 4;
  // var limit = elements_per_page;
  // goFun(sta,limit);
  // function goFun(sta,limit) {
  //  for (var i =sta ; i < limit; i++) {
  //
  //    var $nr = $('<tr><td>A-' + b[i]['play_id'] + '</td><td>B-' + b[i]['question1']  + '</td></tr>');
  //    table.append($nr);
  //  }
  //  }
  //  $('#nextValue').click(function(){
  //
  //  var next = limit;
  //  if(max_size>=next) {
  //  limit = limit+elements_per_page;
  //  table.empty();
  //  goFun(next,limit);
  //  }
  //  });
  //  $('#PreeValue').click(function(){
  //  var pre = limit-(2*elements_per_page);
  //  if(pre>=0) {
  //  limit = limit-elements_per_page;
  //  table.empty();
  //  goFun(pre,limit);
  //  }
  //  });
  //
  // });
  //


  function starJob(id) {

    console.log("You're about to star a job! Hopefully");
    var request = {
      id: id,
      change: "starring",
      okta: localStorage.getItem("id")
    }

    $.ajax({
      url: '/api/users/star',
      type: 'PUT',
      data: request
    });

  }

  function unstarJob(id) {
    console.log("You've unstarred a job");
    var request = {
      id: id,
      change: "unstarring",
      okta: localStorage.getItem("id")
    }

    $.ajax({
      url: '/api/users/star',
      type: 'PUT',
      data: request
    });
  }

  fillGravatar();

  function fillGravatar() {

    var id = localStorage.getItem("id")

    $.get("/api/users/" + id, function(data) {

      $(".dropbtn").css('background-image', 'url("https://' + data.profilePicLink + '")');
    });
  }

})


//------------------------------------------------------------------------------

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
function googleMaps() {
  if (apiResults != []) {
    // console.log("working!")
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
    // console.log("SEARCH", searchMarkersLatLng)
    for (var p = 0; p < apiResults.length; p++) {
      var marksLatLng = apiResults[p]
      var marker = new google.maps.Marker({
            position: {lat: parseFloat(marksLatLng.latitude), lng: parseFloat(marksLatLng.longitude)
            },
                        map: map,
                        placeId: marksLatLng.placeID,
                        content: '<div><strong>' + marksLatLng.companyName + '</strong><br>' +
                          'Job Title: ' + marksLatLng.jobTitle + '<br>' + 'Address: ' +
                          marksLatLng.address + " " + marksLatLng.city + " " + marksLatLng.state + " " + marksLatLng.zipCode + '</div>' + 'More Info: ' + '<a class="moreInfoUrl" data-value='+ marksLatLng.id +'" href="api/posts/'+ marksLatLng.id +'">testURL</a>' + '<br>',
                        zIndex: 999999
          })
      gMarkers.push(marker)
      console.log("gMarkers array: ", gMarkers)
      google.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.setContent(this.content);
            infowindow.open(map, this);
      })
      google.maps.event.addListener(marker, 'click', function() {
          queryURL = '/api/posts/' + $(".moreInfoUrl").data("value")
          console.log(queryURL)
          $.ajax({
            url: queryURL,
            method: "GET",
          }).done(function(results) {
            console.log(results)
            var applybtn = $('<input />', {
              type: "button",
              value: "Apply",
              class: "apply-btn",
              on: {
                click: function() {
                  window.open(postLink, '_blank');
                  // window.open("http://www.facebook.com", '_blank');
                  console.log("click to go to url")
                }
              }
            })
            $("#markerName").text(results.jobTitle)
            $("#applyButton").html(applybtn)
            // var jbTit = results.jobTitle
            jobId = results.id
            var cmpName = results.companyName
            var jobDesc = results.jobDescription
            var jobQual = results.jobQualification
            var addInfo = results.additionalInfo
            var adr1 = results.address
            var adr2 = results.city
            var adr3 = results.state
            var adr4 = results.zipCode
            var fullAddress = adr1 + " " + adr2 + " " + adr3 + " " + adr4
            var createdAt = results.created_at
            var updatedAt = results.updated_at
            var placeDetailsModal = ('<div>' + '<h5>Job Description: </h5>' + jobDesc + '<br>' + '<br>' + '<h5>Qualifications: </h5>' + jobQual + '<br>' + '<br>' + '<h5>Additional Information: </h5>' + addInfo + '<br>' + '<br>' + '<h5>Job Address: </h5>' + adr1 + '<br>' + adr2 + ', ' + adr3 + ' ' + adr4 + '</div>');
            var noQualDetailsModal = ('<div>' + '<h5>Job Description: </h5>' + jobDesc + '<br>' + '<br>' + '<h5>Additional Information: </h5>' + addInfo + '<br>' + '<br>' + '<h5>Job Address: </h5>' + adr1 + '<br>' + adr2 + ', ' + adr3 + ' ' + adr4 + '</div>');
            var noAddInfoDetailsModal = ('<div>' + '<h5>Job Description: </h5>' + jobDesc + '<br>' + '<br>' + '<h5>Qualifications: </h5>' + jobQual + '<br>' + '<br>' + '<h5>Job Address: </h5>' + adr1 + '<br>' + adr2 + ', ' + adr3 + ' ' + adr4 + '</div>');
            var noQualorInfoDetailsModal = ('<div>' + '<h5>Job Description: </h5>' + jobDesc + '<br>' + '<br>' + '<h5>Job Address: </h5>' + adr1 + '<br>' + adr2 + ', ' + adr3 + ' ' + adr4 + '</div>');
            if (addInfo === undefined && jobQual === undefined) {
              $(".job-view-body").html(noQualorInfoDetailsModal)
            } else if (addInfo === undefined) {
              $(".job-view-body").html(noAddInfoDetailsModal)
            } else if (jobQual === undefined) {
              $(".job-view-body").html(noQualDetailsModal)
            } else {
              $(".job-view-body").html(placeDetailsModal)
            }
            $("#markerModal").modal()
          })
        });
    }



  }
}
