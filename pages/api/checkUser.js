// pages/api/checkUser.js
import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            // Verifica si el usuario existe en la base de datos y si la contraseña coincide
            const rows = await query('SELECT * FROM customer WHERE email = ? AND password = ?', [email, password]);

            if (rows.length > 0) {
                res.status(200).json({ success: true });
            } else {
                res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos. Por favor, intente de nuevo.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error al verificar el usuario. Por favor, intente de nuevo.' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Método no permitido' });
    }
}
