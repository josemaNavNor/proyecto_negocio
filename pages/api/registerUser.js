// pages/api/register.js
import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, email, password, city, country, phone_number } = req.body;

        try {
            // Inserta los datos del usuario en la base de datos
            await query('INSERT INTO customer (username, email, password, city, country, phone_number) VALUES (?, ?, ?, ?, ?, ?)', [username, email, password, city, country, phone_number]);

            res.status(200).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el registro del usuario' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
