## **Tech Used**
  -	HTML
  -	Bootstrap
  -	Javascript
  -	Node.js
  -	Sequelize
  -	MySQL
  -	Handlebars
  -	Express.js
  -	jQuery UI
  -	Geocoder.js

## **API Docs**
	- Glassdoor API (for search comparison-possible other use)
	- Google Maps API(Markers added)

## **Architecture**

├── config
|     └── config.json
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
