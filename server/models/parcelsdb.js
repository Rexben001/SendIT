const pg = require('pg');

const config = {
  // connectionString: 'postgres://zdrhktfw:GYE3NZkk6he9Uef8SiNd1BXnM-6b75BH@stampy.db.elephantsql.com:5432/zdrhktfw'
  connectionString: 'postgres://localhost:5432/sendit_db'
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
});


const createParcelsTable = async () => {
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
        status VARCHAR(128),
        phoneOfReceiver VARCHAR NOT NULL,
        placedBy INTEGER REFERENCES users(user_id)
		);`;

  const result = await pool.query(parcelTable);
  console.log(result);
};


// export pool and createParcelsTable to be accessible  from an where within the application
module.exports = {
  createParcelsTable,
  pool,
};

require('make-runnable');
