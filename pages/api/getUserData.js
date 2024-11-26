// pages/api/getUserData.js
import { query } from '../../lib/db';

export default async function handler(req, res) {
    const { email } = req.body;

    try {
        const rows = await query('SELECT username, email, city, country, phone_number FROM customer WHERE email = ?', [email]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user data' });
    }
}
