import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { category_id } = req.body;

        try {
            const result = await query(`
                DELETE FROM Category WHERE category_id = ?
            `, [category_id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Categoria no encontrada' });
            }

            res.status(200).json({ message: 'Categoria eliminada exitosamente' });
        } catch (error) {
            console.error('Error al eliminar la Categoria:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
