const pg = require('pg');

const config = {
  connectionString: 'postgres://zdrhktfw:GYE3NZkk6he9Uef8SiNd1BXnM-6b75BH@stampy.db.elephantsql.com:5432/zdrhktfw'

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
