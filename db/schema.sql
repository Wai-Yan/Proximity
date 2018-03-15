DROP DATABASE IF EXISTS jobPostDB;
CREATE DATABASE jobPostDB;
USE jobPostDB;

INSERT INTO `jobpostdb`.`posts` (`jobTitle`, `jobDescription`, `address`, `city`, `state`, `zipCode`, `latitude`, `longitude`, `created_at`, `updated_at`) VALUES ('Web Developer', 'HTML5, CSS3, Javascript Skills', '1600 Amphitheatre Parkway', 'Mountain View', 'CA', '94043', '37.4224082','-122.0856086','2018-03-15 18:43:06','2018-03-15 18:43:06');

INSERT INTO `jobpostdb`.`posts` (`jobTitle`, `jobDescription`, `address`, `city`, `state`, `zipCode`, `latitude`, `longitude`, `created_at`, `updated_at`) VALUES ('Front-End Developer', 'Good Javascript & Python Skills', '15010 NE 36th St.', 'Redmond', 'WA', '98052', '47.6423109','-122.13684060000003','2018-03-15 18:43:06','2018-03-15 18:43:06');

INSERT INTO `jobpostdb`.`posts` (`jobTitle`, `jobDescription`, `address`, `city`, `state`, `zipCode`, `latitude`, `longitude`, `created_at`, `updated_at`) VALUES ('UX-UI Developer', 'Design background, Bootstrap Skills', '380 New York Street', 'Redlands', 'CA', '92373', '34.0560768','-117.19568559999999','2018-03-15 18:43:06','2018-03-15 18:43:06');

INSERT INTO `jobpostdb`.`posts` (`jobTitle`, `jobDescription`, `address`, `city`, `state`, `zipCode`, `latitude`, `longitude`, `created_at`, `updated_at`) VALUES ('Consulting Developer', 'Strong communication skills, Back-end Skills(Node.js,Express.js prefered)', '3130 Fairview Park Dr', 'Falls Church', 'VA', '22042', '38.8605487','-77.21817579999998','2018-03-15 18:43:06','2018-03-15 18:43:06');
