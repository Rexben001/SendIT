const pg = require('pg');

const config = {
  // user: 'postgres', //this is the db user credential
  // database: 'sendit_db',
  // password: null,
  // port: 5432,
  // max: 10, // max number of clients in the pool
	// idleTimeoutMillis: 90000,
	connectionString: 'postgres://zdrhktfw:GYE3NZkk6he9Uef8SiNd1BXnM-6b75BH@stampy.db.elephantsql.com:5432/zdrhktfw'

};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});



const createTables = () => {
	const userTable = `
	CREATE TABLE IF NOT EXISTS
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
		is_admin BOOLEAN NOT NULL

	)`;
	pool.query(userTable)
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

	// createTables();