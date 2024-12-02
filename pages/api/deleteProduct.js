import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { product_id } = req.body;

        try {
            const result = await query(`
                DELETE FROM Product WHERE product_id = ?
            `, [product_id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            res.status(200).json({ message: 'Producto eliminado exitosamente' });
        } catch (error) {
            console.error('Error al eliminar el Producto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
