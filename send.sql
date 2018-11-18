DROP DATABASE IF EXISTS sendit_db;
CREATE DATABASE sendit_db;

\c sendit_db;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  phone INTEGER,
  country VARCHAR,
  password VARCHAR
);

INSERT INTO users (name, email, phone, country, password)
  VALUES ('Ben', 'rexben.rb@gmail.com', 345678, 'Lagos', '3erdf0');