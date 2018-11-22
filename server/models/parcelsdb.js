const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  connectionString: process.env.DATABASE_URL
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
});


const createTables = () => {
  const parcelTable = `CREATE TABLE IF NOT EXISTS
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
    .then(() => {
      console.log('Table created')
      	pool.end();
	  })
	  .catch(() => {
      pool.end();
	  });
};


pool.on('remove', () => {
  process.exit(0);
});


// export pool and createTables to be accessible  from an where within the application
module.exports = {
  createTables,
  pool,
};

require('make-runnable');
