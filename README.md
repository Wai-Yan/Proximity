# Proximity

Proximity is an application built for job searchers looking for new employment with a specified location and radius of that address. The job's the user searches for are based on the recruiter's posting jobs opportunities for job searchers.

Designed to use the node.js & express.js for server-side code accessing information contained within mySQL using Sequelize to interact with the front-end user interactions and Heroku displaying the front-end deployment product:

## **Code Style**
 * Object-Oriented Programming (OOP).

## **Code Example**
  The application allows users to also input gender, and they can be compared to their closest friends of similar gender.



## **Tech Used**
  -	HTML
  -	Bootstrap
  -	Javascript
  - CSS
  -	Node.js
  -	Sequelize
  -	MySQL
  -	Express.js
  -	jQuery
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
	|     └── recruiterPost.js
	├── public
	|     ├── css
	|           └── styles.css
	|     └── js
	|           ├── jobSearcher.js
	|           └── recruiter.js
	├── routes
	|     ├── jobSearch-routes.js
	|     └── recruiterPost-routes.js
	├── views
	|     ├── index.handlebars
	|     ├── partials
	|           ├── jobSearch.handlebars
	|           ├── recruiter.handlebars
	|           └── jobSearchAvgSalary.handlebars
	|     └── layouts
	|           └── main.handlebars
	├── package.json
	└── server.js


Proximity is an application built for job searchers looking for new employment in a specific area. The user is also able to save a job for later, and can view all saved jobs in their personal page.

Upon entering a job title, an address that will serve as the "center of the search", and a radius, a user can begin their search.

Code Style
Object-Oriented Programming (OOP)

Screenshots
Landing Page

Enter Trips

Technologies and frameworks used
Built with

Bootstrap and Custom CSS



Features
Secure, full-fledged authentication
Clean user interface

Users can search for a job within a given radius
Users are given a map view of that search
Users can save jobs for later

Recruiters are given a convenient interface to add jobs

Installation
Requirements:

Web Browser
Web Developer Tools
Text Editor
API Documentation

Google Maps API:


Usage:

First time visitors to the site can immediately search for jobs in either List View or Map View

Signing in allows regular users to press a star button to save that particular listing to their Saved Jobs List

If they are a recruiter, they can press the Posted Jobs link in the icon dropdown menu and click on "Add new Posting" on their Posted Jobs page

This application was built by Angela Kressin, Tak Nalut, Wai Yan, and Sean Andersen -- Full Stack Web Development Students at George Washington University's Coding Boot Camp.
