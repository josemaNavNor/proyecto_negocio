import bcrypt from 'bcrypt';
import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password, username, city, country, phone_number } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            await query('INSERT INTO customer (email, password, username, city, country, phone_number) VALUES (?, ?, ?, ?, ?, ?)', [email, hashedPassword, username, city, country, phone_number]);

            res.status(201).json({ success: true });
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).json({ success: false, message: 'Error al registrar el usuario. Por favor, intente de nuevo.' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
