import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        
        try {
            // Verifica si el usuario existe en la base de datos
            const rows = await query('SELECT * FROM customer WHERE email = ?', [email]);

            if (rows.length > 0) {
                res.status(200).json({ registered: true, success: true });
            } else {
                res.status(401).json({ registered: false, success: false, message: 'Usuario o contraseña incorrectos. Por favor, intente de nuevo.' });
            }
        } catch (error) {
            console.error('Error al verificar el usuario:', error);
            res.status(500).json({ registered: false, success: false, message: 'Error al verificar el usuario. Por favor, intente de nuevo.' });
        }
    } else {
        res.status(405).json({ registered: false, success: false, message: 'Método no permitido' });
    }
}
