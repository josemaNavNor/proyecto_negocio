import { query } from '../../lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            // Verifica si el usuario existe en la base de datos
            const rows = await query('SELECT * FROM customer WHERE email = ?', [email]);

            if (rows.length > 0) {
                const user = rows[0];

                // Verifica si la contraseña es correcta
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    res.status(200).json({ success: true });
                } else {
                    res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos. Por favor, intente de nuevo.' });
                }
            } else {
                res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos. Por favor, intente de nuevo.' });
            }
        } catch (error) {
            console.error('Error al verificar el usuario:', error);
            res.status(500).json({ success: false, message: 'Error al verificar el usuario. Por favor, intente de nuevo.' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
