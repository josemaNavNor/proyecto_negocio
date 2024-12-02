import { query } from '../../lib/db';

export default async function handler(req, res) {
    const { product_id } = req.query;

    if (!product_id) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    try {
        const results = await query(`
            SELECT * FROM product WHERE product_id = ?
        `, [product_id]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json(results[0]);
    } catch (error) {
        console.error('Error al obtener el Producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
