// lib/db.js
import mysql from 'mysql2/promise';

let connection;

async function connectToDatabase() {
    if (!connection) {
        connection = await mysql.createPool({
            host: "localhost",
            database: "expresartebd",
            user: "Jose Navarro",
            password: "73883017",
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }
    return connection;
}

export async function query(sql, params) {
    const conn = await connectToDatabase();
    const [results] = await conn.execute(sql, params);
    return results;
}
