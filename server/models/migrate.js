import { createParcelsTable } from './parcelsdb';
import { createUsersTable, pool } from './userdb';

const dropTables = async () => {
    const userTable = `
       DROP TABLE IF EXISTS parcels;
       DROP TABLE IF EXISTS users;`;
    const result = await pool.query(userTable);
    console.log(result);
};

const migrate = async () => {
    await dropTables();
    await createUsersTable();
    await createParcelsTable();
}

migrate();