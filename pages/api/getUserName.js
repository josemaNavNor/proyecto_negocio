// pages/api/getUserName.js
import { query } from '../../lib/db';

export default async function handler(req, res) {
    const { email } = req.body;

    try {
        const rows = await query('SELECT username FROM customer WHERE email = ?', [email]);
        if (rows.length > 0) {
            res.status(200).json({ username: rows[0].username });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener nombre de usuario' });
    }
}
