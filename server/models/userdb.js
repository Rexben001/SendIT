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
  const userTable = `CREATE TABLE IF NOT EXISTS
				users(
				user_id SERIAL PRIMARY KEY,
				firstname VARCHAR(128) NOT NULL,
				lastname VARCHAR(128) NOT NULL,
				othernames VARCHAR(128) NOT NULL,
				phone VARCHAR(128) NOT NULL,
				username VARCHAR(128) NOT NULL,
				email VARCHAR(128) NOT NULL,
				password VARCHAR(128) NOT NULL,
				registered DATE,
				is_admin BOOLEAN,
				UNIQUE(username, email)
				)`;
  pool.query(userTable)
	  .then(() => {
			console.log('table created')
      pool.end();
	  })
	  .catch(() => {
      pool.end();
	  });
};


pool.on('remove', () => {
  process.exit(0);
});


module.exports = {
  createTables,
  pool,
};

require('make-runnable');
