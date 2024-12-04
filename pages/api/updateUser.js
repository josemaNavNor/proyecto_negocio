import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { customer_id, username, email, city, country, phone_number } = req.body;

        try {
            const result = await query(`
                UPDATE customer
                SET username = ?, email = ?, city = ?, country = ?, phone_number = ?
                WHERE customer_id = ?
            `, [username, email, city, country, phone_number, customer_id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
