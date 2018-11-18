var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/sendit_db';
var db = pgp(connectionString);


function getUsers(req, res, next){
    db.any('select * from users')
    .then(function (data){
        res.status(200)
        .json({
            status: 'success',
            data: data,
            message: 'Users retrieved'
        })
    }).catch(function (err){
        return next(err);
    })
}

function getAUser(req, res, next){
    var id = parseInt(req.params.id);
    db.one('select * from users where id=$1', id)
    .then(function (data){
        res.status(200)
        .json({
            status: 'success',
            data: data,
            message: 'retrieved a user'
        })
    }).catch(function (err){
        return next(err);
    })
}

function addUsers(req, res, next){
    const data = req.body;
    db.none('insert into users(name, email, phone, country, password) values($1, $2, $3, $4, $5) RETURNING *', [data.name, data.email, data.phone, data.country, data.password])
    .then(function (){
        res.status(200)
        .json({
            status: 'success',
            message: 'created succesfully'
        })
    }).catch(function (err){
        return next(err);
    })
}

function deleteUser(req, res, next) {
    db.none('update users set name=$1, email=$2, phone=$3, country=$4, password=$5 where id=$6',
      [req.body.name, req.body.email, parseInt(req.body.phone),
        req.body.country, req.body.password, parseInt(req.params.id)])
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated puppy'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }


  function testing(req, res, next){
    db.none('INSERT INTO testing(id, name, class) VALUES(${id}, ${name}, ${class})' , req.body)
    .then(function (){
        res.status(200)
        .json({
            status: 'success',
            message: 'created succesfully'
        })
    }).catch(function (err){
        return next(err);
    })
}


module.exports = {
    getUsers: getUsers,
    getAUser: getAUser,
    addUsers: addUsers,
    // getUserParcels: getUserParcels,
    deleteUser: deleteUser,
    testing: testing
  };