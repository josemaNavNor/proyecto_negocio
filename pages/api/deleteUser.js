import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { customer_id } = req.body;

        try {
            const result = await query(`
                DELETE FROM customer WHERE customer_id = ?
            `, [customer_id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
