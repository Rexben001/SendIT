const pg = require('pg');

const config = {
  user: 'postgres', //this is the db user credential
  database: 'sendit_db',
  password: null,
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 90000,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});



const createTables = () => {
	const parcelTable = `CREATE TABLE IF NOT EXISTS
		parcels(
		  parcel_id SERIAL PRIMARY KEY,
          weight VARCHAR(128) NOT NULL,
          username VARCHAR(128) NOT NULL,
		  emailAddress VARCHAR(128) NOT NULL,
          pickup VARCHAR(128) NOT NULL,
          phone VARCHAR(128) NOT NULL,
          picker  VARCHAR(128) NOT NULL,
          emailOfPicker VARCHAR(128) NOT NULL,
          phoneOfPicker VARCHAR(128) NOT NULL,
          destination VARCHAR(128) NOT NULL,
          user_id SERIAL references users(user_id)
		)`;
	pool.query(parcelTable)
	  .then((res) => {
		console.log(res);
		pool.end();
	  })
	  .catch((err) => {
		console.log(err);
		pool.end();
	  });
  };


  pool.on('remove', () => {
	console.log('client removed');
	process.exit(0);
  });
  
  
  //export pool and createTables to be accessible  from an where within the application
  module.exports = {
	createTables,
	pool,
  };
  
  require('make-runnable');
  