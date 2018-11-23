import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../models/userdb';

const { pool } = config;


class UserController {
  static getUsers(req, res) {
    pool.connect((err, client, done) => {
      const query = 'SELECT * FROM users';
      client.query(query, (error, result) => {
        done();
        if (error) {
          res.json({ error : 'Error getting users'});
        }
        if (result.rows < 1) {
          res.status(404).send({
            status: 'Failed',
            message: 'No users information found',
          });
        } else {
          res.json({
            message: 'Users Information retrieved',
            users: result.rows,
          });
        }
      });
    });
  }


  static addUser(req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.json({
          message: 'Unable to hash password'
        });
      }
      const {
        firstname, lastname, othernames, username, email, phone,
      } = req.body;
      const user = {
        firstname,
        lastname,
        othernames,
        username,
        email,
        phone,
        password: hash,
      };
      pool.connect((err, client, done) => {
        const query = 'INSERT INTO users(firstname, lastname, othernames, username, email, phone, password, is_admin, registered) VALUES($1,$2,$3,$4,$5,$6,$7,false,NOW()) RETURNING *';
        const values = [user.firstname, user.lastname, user.othernames, user.username,
          user.email, user.phone, user.password];

        client.query(query, values, (error, result) => {
          done();
          if (error) {
            return res.json({
               error: 'Username or email already exists' });
          }
          const payload = {
            id: result.rows[0].user_id,
          };
          jwt.sign(payload, 'ertyuio', (err, token) => {
            res.json({
              result: 'Success',
              token
            });
          });
        });
      });
    });
  }

  static loginUser(req, res) {
    const { password, username } = req.body;
    pool.connect((err, client, done) => {
      const query = 'SELECT * FROM users WHERE username=$1';
      const values = [username];
      client.query(query, values, (error, result) => {
        done();
        if (result.rowCount === 0 || err) {
          return res.json({
            message: 'Pls, enter a valid username'
          });
        }
        
        if(err) return error;

        bcrypt.compare(password, result.rows[0].password, (err, hash) => {
          if (hash === false || error) {
            return res.json({
              message: 'Invalid password',
            });
          }

          return res.json({
            result: 'Welcome'
          });
        });
      });
    });
  }


  static userParcel(req, res) {
    const id = req.params.user_id;
    pool.connect((client, done) => {
      const query = `SELECT * FROM parcels WHERE user_id=${id}`;
      client.query(query, (error, result) => {
        done();
        if (error) {
          return res.json({
            result: 'An error occurred',
          });
        }
        if (result.rowCount === 0) {
          return res.json({
            message: 'No users information found',
          });
        }
        return res.json({
          result: result.rows[0]
        });
      });
    });
  }
}


export default UserController;
