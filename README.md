# Proximity

Proximity is an application built for job searchers looking for new employment with a specified location and radius of that address. The job's the user searches for are based on the recruiter's posting jobs opportunities for job searchers.

Designed to use the node.js & express.js for server-side code accessing information contained within mySQL using Sequelize to interact with the front-end user interactions and Heroku displaying the front-end deployment product:

## **Code Style**
 * Object-Oriented Programming (OOP)

## **Code Example**
  * Geo-Coding:
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
  * Local Storage Use:
		function fillProfilePic() {
		      var id = localStorage.getItem("id")
		      $.get("/api/users/" + id, function(data) {
			$(".profileimage").attr("src","https://" + data.profilePicLink);
		      });
		    }

## **Screen Shots**
  ![Home Page](Home Page.png?raw=true "Home Page")
  
  ![Map View](Map View.png?raw=true "Map View")
  
  ![Register & Login](Register Login.png?raw=true "Register Login")


## **Tech Used**
  - HTML
  - Bootstrap
  - Javascript
  - CSS
  - Node.js
  - Sequelize
  - MySQL
  - Express.js
  - jQuery
  - Heroku
  - Okta Authentication (API)
  - Google Maps API (API)
  - Gravatar
  - Request.js
  - Local Storage
  - Cookies

## **Architecture**
  ![Entity-Relationship Diagram(ERD)](ERD.jpg?raw=true "ERD")

## **MVC Compliance**
	├── config
	|     └── config.js
	├── db
	|     ├── schema.sql
	|     └── seeds.sql
	├── models
	|     ├── index.js
  |     ├── recruiterPost.js
	|     └── searcher.js
	├── public
	|     ├── css
  |           ├── styles.css
  |           └── etc.
  |     ├── images
  |           ├── contact.png
  |           └── etc.
	|     └── js
	|           ├── jobSearcher.js
  |           ├── recruiter.js
	|           └── etc.
	├── routes
	|     ├── jobSearch-routes.js
  |     ├── recruiterPost-routes.js
	|     └── etc.
	├── package.json
	└── server.js

## **Installation**
  - Deployed to Heroku, installation on local machine is not required: https://arcane-refuge-81320.herokuapp.com/

## **Tests**
  - Most tests for this application are run with a simple console.log() method. If the correct/expected information returns, then the team knows that the program is functioning as intended.

	    for (var e = 0; e < results.length; e++ ) {
		for (var j = 0; j < radiusMarkers.length; j++){
		  if ((radiusMarkers[j].position.lat() === parseFloat(results[e].latitude)) && (radiusMarkers[j].position.lng() === 					parseFloat(results[e].longitude))) {
		  finalSearchQuary.indexOf(results[e].id) === -1 ? finalSearchQuary.push(results[e].id) : console.log("This item already 			exists");
		  console.log(finalSearchQuary)
						      }
						    }
	    }

## **How to use?**

  The Website is divided into three main sections:

  1.    __Main Page__

  - While on the main page, the end-user can enter a search quarry, an address, and use one of the radius options(10-60 miles proximity). The Latest Jobs within the address's radius will be displayed either in List format or Map format.
  - Additional functionality includes 'Saving' a job posting, or 'Adding' job posting.
  - The user has two options, to either navigate the site as a job searcher or recruiter.


  2.    __Job Searcher__

  - The job searcher will need to register and obtain a new account.
  - They will then be able to save jobs for later viewing and update settings to their account once registered.
  - They will be able to apply to jobs through the job posting information that is saved.

  3.    __Recruiter__

  - The recruiter will need to register and obtain a new account.
  - Have the ability to create new job postings by entering the information that is request and the job post will be dynamically added to the mySQL database, that will be found through various job searches.

## **Credits**

  This application was built by [Wai](https://github.com/Wai-Yan), [Tak](https://github.com/tak009), [Angela](https://github.com/angkressin), [Sean](https://github.com/andersensm)
