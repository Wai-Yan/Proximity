var markerName = ""
var map;
var markers = []
var input = ""
// var placeId = ""
var placeMarker = []
//recruiter adding information
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
var circlCenter;
var circleCenterLat;
var circleCenterLng;
var mapLat;
var mapLng;
var jbTit;
var jobDesc;
var fullAddress;
var markerId;
var jobId;

$(document).ready(function() {

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
    displayMap()
  })

  $('body').tooltip({
    selector: '[class="checkedStar"]'
  });

  function initializeRows(posts) {
    var latestSaves = posts.reverse();
    var rowsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      rowsToAdd.push(createNewRow(latestSaves[i]));
    }
    $("#savedJobs").append(rowsToAdd);
  }
  function getPosts() {
    // $.get("/api/posts", function(data) {
    //   posts = data;
    //   initializeRows(posts);
    //   console.log(posts)
    // });

    $.get("/api/posts", function(data) {
      posts = data;
      initializeRows(posts);
      console.log(posts)
    });
  }

  // get posts that have been saved

  function createNewRow(posts) {
    // var date = moment(posts.created_at).format('MM/DD/YYYY');
    var tBody = $("tbody")
    var tRow = $("<tr>").addClass("jobRow")
    var titleTd = $("<td>").text(posts.jobTitle)
    var starTd = $("<td>")
    var starbtn = $("<p>", {
      class: "checkedStar",
      "data-toggle": "tooltip",
      "data-placement": "left",
      "title": "Click to unfavorite and remove from list",
      on: {
        click: function() {
          // call function to remove from the favorites list. delete post.id

        }
      }
    })
    starTd.append(starbtn)
    var companyTd = $("<td>").text(posts.companyName)
    var descriptionTd = $("<td>").text(posts.jobDescription).addClass("description-td overflow")
    var viewbtn = $("<td>")
    // var btnMap = $('<input />', {
    //   type: "button",
    //   value: "Map",
    //   class: "btn-viewPost",
    //   "data-toggle": "modal",
    //   "data-target": "#viewMapMarker",
    //   on: {
    //     click: function() {
    //       // console.log ( posts.id );
    //       displayMap(posts.id)
    //     }
    //   }
    // })
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
    // viewbtn.append(btnMap)
    viewbtn.append(btn)
    // var applybtn = $("<td>").text("View").addClass("btn-apply").attr("id", "applyBtn")
    tRow.append(titleTd, starTd, companyTd, descriptionTd, viewbtn)
    tBody.append(tRow);
  }

  // click action for view to pop up with modal on the job info
  function displayPost(id) {
    $("#mapview").hide();
    $("#listview").show();
    console.log("hi")
    queryURL = '/api/posts/' + id
    console.log(queryURL)
    $.ajax({
      url: queryURL,
      method: "GET",
    }).done(function(results) {
      console.log("btn click", results)
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
    })
  }

  function displayMap() {
    mapLat;
    mapLng;
    jbTit;
    jobDesc;
    fullAddress;
    jobId;
    console.log("hi")
    queryURL = '/api/posts/' + jobId
    console.log(queryURL)
    $.ajax({
      url: queryURL,
      method: "GET",
    }).done(function(results) {
      $("#markerName").empty()
      $("#markerCheckins").empty()
      $("#applyButton").empty()
      jbTit = results.jobTitle
      var cmpName = results.companyName
      jobDesc = results.jobDescription
      var createdAt = results.created_at
      var updatedAt = results.updated_at
      var adr1 = results.address
      var adr2 = results.city
      var adr3 = results.state
      var adr4 = results.zipCode
      mapLat = parseFloat(results.latitude)
      mapLng = parseFloat(results.longitude)
      markerId = results.id
      fullAddress = adr1 + " " + adr2 + " " + adr3 + " " + adr4
      googleMain();
      var placeDetailsModal = ('<div>'+ 'Company: <COMPANY NAME>' + '<br>' + 'Job Description:'+ jobDesc + '<br>' + 'Job Address:'+ fullAddress + '<br>' +'Created At:'+ createdAt + '<br>' +'Updated At:'+ updatedAt+ '<br>' +'</div>');
      $("#markerName").text('Job Title: ' + jbTit)
      $("#markerCheckins").append(placeDetailsModal)
      $("#applyButton").append('<button type="submit" id="apply" class="btn btn-success">Apply</button>')
      $("#markerModal").modal();
      googleMaps();
    })
  };
  getPosts();

  fillGravatar();

  function fillGravatar() {

    var id = localStorage.getItem("id")

    $.get("/api/users/" + id, function(data) {

      $(".dropbtn").css('background-image', 'url("https://' + data.profilePicLink + '")');
    });
  }

function googleMain() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: mapLat,
      lng: mapLng
    },
    zoom: 10,
  });
}
function googleMaps() {
  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
        position: {lat: mapLat, lng: mapLng},
        map: map,
        content: '<div><strong>' + jbTit + '</strong><br>' +
          'Job Desc: ' + jobDesc + '<br>' + 'Address: ' +
          fullAddress + '</div>',
        zIndex: 999999
      })
  google.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.setContent(this.content);
            infowindow.open(map, this);
  })
}
})
