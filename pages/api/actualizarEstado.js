import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { orderId, newStatusId } = req.body;

        try {
            const result = await query(`
                UPDATE Customer_order
                SET status_id = ?
                WHERE order_id = ?
            `, [newStatusId, orderId]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Orden no encontrada' });
            }

            res.status(200).json({ message: 'Estado actualizado correctamente' });
        } catch (error) {
            console.error('Error al actualizar el estado de la orden:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
