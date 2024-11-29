import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    try {
        const products = await query('SELECT category_id FROM category');
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
