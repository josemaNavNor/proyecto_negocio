import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { category_id, name, description, subcategory_id } = req.body;

        try {
            const result = await query(`
                UPDATE Category
                SET name = ?, description = ?, subcategory_id = ? WHERE category_id = ?`,
                [name, description, subcategory_id, category_id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Categoria no encontrada' });
            }

            res.status(200).json({ message: 'Categoria actualizada exitosamente' });
        } catch (error) {
            console.error('Error al actualizar la Categoria:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
