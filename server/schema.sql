CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id int NOT NULL AUTO_INCREMENT,
  userid int NOT NULL,
  text varchar(150) NOT NULL,
  roomname varchar(20),
  PRIMARY KEY(ID)
);

/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT, 
  username VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);

-- CREATE TABLE rooms(
--   id int NOT NULL AUTO_INCREMENT,
--   roomname VARCHAR(20),
--   PRIMARY KEY (id)
-- );




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

