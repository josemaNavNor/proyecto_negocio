import mysql from 'mysql2/promise';

const connection = await mysql.createPool({
    host: "localhost",
    database: "expresartebd",
    user: "kevin",
    password: "12345"
});

export default connection;
