import { query } from '../../lib/db';

export default async function handler(req, res) {
    const { category_id } = req.query;

    if (!category_id) {
        return res.status(400).json({ error: 'Category ID is required' });
    }

    try {
        const results = await query(`
            SELECT * FROM Category WHERE category_id = ?
        `, [category_id]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Categoria no encontrada' });
        }

        res.status(200).json(results[0]);
    } catch (error) {
        console.error('Error al obtener la categoria:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
