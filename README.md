
[![Build Status](https://travis-ci.org/Rexben001/SendIT.svg?branch=develop)](https://travis-ci.org/Rexben001/SendIT)
[![Coverage Status](https://coveralls.io/repos/github/Rexben001/SendIT/badge.svg?branch=master)](https://coveralls.io/github/Rexben001/SendIT?branch=develop)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/Rexben001/SendIT)

[![GitHub issues](https://img.shields.io/github/issues/Rexben001/SendIT.svg?style=plastic)](https://github.com/Rexben001/SendIT/issues) [![GitHub forks](https://img.shields.io/github/forks/Rexben001/SendIT.svg)](https://github.com/Rexben001/SendIT/network) [![GitHub stars](https://img.shields.io/github/stars/Rexben001/SendIT.svg)](https://github.com/Rexben001/SendIT/stargazers) [![GitHub license](https://img.shields.io/github/license/Rexben001/SendIT.svg)](https://github.com/Rexben001/SendIT) [![Twitter](https://img.shields.io/twitter/url/https/github.com/Rexben001/SendIT.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2FRexben001%2FSendIT) ![Andela](https://img.shields.io/badge/andela-good-blue.svg)


# SendIT
SendIT is a courier service that helps users deliver parcels to different destinations. SendIT provides courier quotes based on weight categories.

# Some of the features of the App
1. Users can create an account and log in.
2. Users can create a parcel delivery order.
3. Users can change the destination of a parcel delivery order.
4. Users can cancel a parcel delivery order.
5. Users can see the details of a delivery order.
6. Admin can change the status and present location of a parcel delivery order.

# Technologies used includes
Node 
Express
Mocha
Nyc
Travis
Coveralls
Babel

# How to install and test SendIT
To install all the dependencies
# npm install
To test the App
# npm start

# Details on API endpoints
GET /parcels              --- Fetch all parcel delivery orders

GET /parcels/<parcelId>   ---  Fetch a specific parcel delivery order
  
GET /users/<userId>/parcels  --- Fetch all parcel delivery orders by a specific user
  
PUT /parcels/<parcelId>/cancel ---  Cancel the specific parcel delivery order
  
POST /parcels                  ---   Create a parcel delivery order


>>>>>>> 85f0fc14ca5843460b7aa6220616a5b55c975dea
