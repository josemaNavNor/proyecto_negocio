import { query } from '../../lib/db';

export default async function handler(req, res) {
    const { customer_id } = req.query;

    if (!customer_id) {
        return res.status(400).json({ error: 'Customer ID is required' });
    }

    try {
        const results = await query(`
            SELECT * FROM customer WHERE customer_id = ?
        `, [customer_id]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(results[0]);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
