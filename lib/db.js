import mysql from 'mysql2/promise';

const connection = await mysql.createPool({
    host: "localhost",
    database: "expresartebd",
    user: "Jose Navarro",
    password: "73883017"
});

export default connection;
