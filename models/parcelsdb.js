const pg = require('pg');

const config = {
  connectionString: 'postgres://zdrhktfw:GYE3NZkk6he9Uef8SiNd1BXnM-6b75BH@stampy.db.elephantsql.com:5432/zdrhktfw'
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});



const createTables = () => {
  const parcelTable = `DROP TABLE IF EXISTS parcels;
  CREATE TABLE IF NOT EXISTS
		parcels(
		      parcel_id SERIAL PRIMARY KEY,
          weight NUMERIC NOT NULL,
          weightmetric VARCHAR(128) NOT NULL,
          sentOn DATE NOT NULL DEFAULT CURRENT_DATE,
          deliveredOn DATE,
          from_address VARCHAR(128) NOT NULL,
          to_address VARCHAR(128) NOT NULL,
          currentLocation  VARCHAR(128),
          receiver VARCHAR(128) NOT NULL,
          status VARCHAR(128) NOT NULL,
          phoneOfReceiver VARCHAR NOT NULL,
          placedBy INTEGER REFERENCES users(user_id)
        		);`;
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
  
  