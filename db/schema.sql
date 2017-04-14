CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers (

	id INT(10) AUTO_INCREMENT NOT NULL,
	burger_name VARCHAR(40) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	date TIMESTAMP NOT NULL,
	PRIMARY KEY (id)
	);