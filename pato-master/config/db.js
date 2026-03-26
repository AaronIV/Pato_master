const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Creamos la conexión como la hizo el profe
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    // Esto es vital para que Render/Aiven no te rechacen la conexión
    ssl: process.env.DB_HOST ? { rejectUnauthorized: false } : false
});

// Conectar 
conexion.connect((err) => {
    if (err) {
        console.error("❌ Error de conexión:", err.stack);
        return;
    }
    console.log("✅ Conectado a la Base de Datos MySql (Estilo Profesor)");
});

// Exportar modulo (La forma tradicional)
module.exports = conexion;