$(document).ready(function() {

$( ".dropdown-content" ).find("p:first").text(localStorage.getItem("firstName"));

$("#resultsRecreuiterPageTitleText").text("Your posted jobs")

function initializeRows(posts) {
  var latestPosts = posts.reverse();
  var rowsToAdd = [];
  for (var i = 0; i < posts.length; i++) {
    rowsToAdd.push(createNewRow(latestPosts[i]));
  }
  $("#postedJobs").append(rowsToAdd);
}
function getPosts() {
  $.get("/api/posts", function(data) {
    posts = data;
    initializeRows(posts);
    console.log(posts)
  });
}

function createNewRow(posts) {
  var date = moment(posts.created_at).format('MM/DD/YYYY');
  var tBody = $("tbody")
  var tRow = $("<tr>").addClass("jobRow")
  var titleTd = $("<td>").text(posts.jobTitle).addClass("jobData")
  var descriptionTd = $("<td>").text(posts.jobDescription).addClass("jobData description-td")
  var createdDateTd = $("<td>").text(date).addClass("jobData padding-table-left")
  var viewbtn = $("<td>")
  var btn = $('<input />', {
    type: "button",
    value: "View",
    class: "btn-view",
    id: "viewBtn",
    "data-toggle": "modal",
    "data-target": "#viewJobPostInfo",
    on: {
      click: function() {
        console.log("clicked button")
        // console.log ( posts.id );
        displayPost(posts.id)
      }
    }
  })
  viewbtn.append(btn)
  tRow.append(titleTd, descriptionTd, createdDateTd, viewbtn)
  tBody.append(tRow);
}
getPosts();

// print post info
function displayPost(id) {
  console.log("hi")
  queryURL = 'http://localhost:8080/api/posts/' + id
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
    $(".job-view-body").html(placeDetailsModal)
  })
};

//recruiter post, and taking address to geocode Latitude & Longitude in mySQL
$("#addPost").on("click", function(event) {
  event.preventDefault();
  //emptySearchMarkersArray
  searchMarkersLatLng = []
  googleMapsRecruiter();
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
    });
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
      console.log(newPost);
      console.log("This should only show up if you made a new job");
      location.reload();
    });
  }
});


$("#saveAccountbtn").on("click", function(event) {

  var alteredRecruiter = {
    firstName: $("#firstname").val().trim(),
    lastName: $("#lastname").val().trim(),
    email: $("#email").val().trim(),
    phone: $("#mobilephone").val().trim(),
    companyName: $("#companyname").val().trim(),
    companyWebsite: $("#companysite").val().trim(),
  };

  // Send to DB
  $.ajax({
    method: "PUT",
    url: "/api/users",
    data: alteredRecruiter
    });
});

fillGravatar();
fillProfilePic();
fillSettingsPage();

function fillGravatar() {

  var id = localStorage.getItem("id")

  $.get("/api/users/" + id, function(data) {

    $(".dropbtn").css('background-image', 'url("https://' + data.profilePicLink + '")');
  });
}

function fillProfilePic() {

  var id = localStorage.getItem("id")

  $.get("/api/users/" + id, function(data) {

    $(".profileimage").attr("src","https://" + data.profilePicLink);
  });
}

// function to prepopulate user information on account settings page (not working)
// function fillSettingsPage() {
//   var id = localStorage.getItem("id")
//   console.log("this is the id: " + id)
//   $.get("/api/users/" + id, function(data) {
//     console.log(data);
//     $("#firstname").val(data.firstName)
//     $("#lastname").val(data.lastName)
//     $("#email").val(data.email)
//     $("#mobilephone").val(data.phoneNo)
//     $("#companyname").val(data.companyName)
//     $("#companysite").val(data.companySiteLink)
//   });
// }



//------------------------------------------------------------------------------
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
function googleMapsRecruiter() {
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
});
