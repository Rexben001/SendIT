/* eslint camelcase: "off" */
import config from '../models/parcelsdb';

const { pool } = config;


class ParcelController {
  static getParcels(req, res) {
    pool.connect((err, client, done) => {
      const query = 'SELECT * FROM parcels';
      client.query(query, (error, result) => {
        done();
        if (result.rows < 1 || error) {
          res.json({
            data: 'No parcels information found',
          });
        } else {
          res.json({
            message: 'parcels Information retrieved',
            data: result.rows,
          });
        }
      });
    });
  }

  static addParcelss(req, res) {
    const {
      weight, placedBy, weightmetric, from_address, to_address, receiver, phoneOfReceiver
    } = req.body;

    const parcel = {
      weight,
      placedBy,
      weightmetric,
      from_address,
      to_address,
      receiver,
      phoneOfReceiver,
    };

    pool.connect((err, client, done) => {
      const query = `INSERT INTO parcels(weight, weightmetric, from_address, to_address, receiver, status, phoneOfReceiver,  placedBy) VALUES($1,$2,$3,$4,$5,'pending',$6,$7) RETURNING *`;
      const values = [parcel.weight, parcel.weightmetric, parcel.from_address, parcel.to_address,
        parcel.receiver, parcel.phoneOfReceiver, parcel.placedBy];

      client.query(query, values, (error, result) => {
        done();
        console.log(error)
        if (error) {
          return res.json({ message: 'Unable to create parcel delivery order', error });
        }
        return res.json({
          result: result.rows,
        });
      });
    });
  }

  static getAParcel(req, res) {
    const id = req.params.parcel_id;
    pool.connect((err, client, done) => {
      const query = `SELECT * FROM parcels where parcel_id=${id}`;
      client.query(query, (error, result) => {
        done();
        if (error) {
          res.json({ error: 'Parcel does not exists' });
        }
        res.json({
          result: result.rows
        });
      });
    });
  }

  static changeDestination(req, res) {
    const id = req.params.parcel_id;
    const data = req.body.to_address;
    pool.connect((err, client, done) => {
      const query = ('UPDATE parcels SET to_address=$1 WHERE parcel_id=$2');
      const values = [data, id];
      client.query(query, values, (error, result) => {
        done();
        if (error) {
          return res.json({ error });
        }
        return res.status(201).json({
          message: 'Parcel updated successfully',
        });
      });
    });
  }

  static changeStatus(req, res) {
    const id = req.params.parcel_id;
    const data = req.body.status;
    pool.connect((err, client, done) => {
      const query = ('UPDATE parcels SET status=$1 WHERE parcel_id=$2');
      const value = [data, id];
      client.query(query, value, (error, result) => {
        done();
        if (error) {
          return res.json({ error: 'Encountered error trying to cancel a delivery parcel order' });
        }
        return res.json({
          message: 'Parcel updated successfully',

        });
      });
    });
  }

  static cancelParcel(req, res) {
    const id = req.params.parcel_id;
    pool.connect((err, client, done) => {
      const query = ('UPDATE parcels SET staus=cancel WHERE parcel_id=$1');
      const value = [id];
      client.query(query, value, (error, result) => {
        done();
        if (error) {
          return res.json({ error });
        }
        return res.json({      
              message: 'Parcel cancelled successfully',

        });
      });
    });

  }

  static presentLocation(req, res) {
    const id = req.params.parcel_id;
    const data = req.body.currentLocation;
    pool.connect((err, client, done) => {
      const query = ('UPDATE parcels SET currentLocation=$1 WHERE parcel_id=$2');
      const value = [data, id];
      client.query(query, value, (error, result) => {
        done();
        if (error) {
          return res.json({ error });
        }
        return res.status(200).json({
          message: 'Parcel updated successfully',

        });
      });
    });
  }
}

export default ParcelController;
