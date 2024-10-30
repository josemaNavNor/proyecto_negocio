const mysql = require("mysql");
const express = require("express");

const app = express();

// Establecer los parámetros de conexión a la base de datos 
let conn = mysql.createConnection({
    host: "localhost",
    database: "expresartebd",
    user: "Jose Navarro",
    password: "73883017"
});

conn.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
    }
    console.log("Conexión exitosa a la base de datos");
});

// Iniciar el servidor en el puerto deseado
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
