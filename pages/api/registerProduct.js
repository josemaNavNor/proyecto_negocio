import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, price, description, category_id, size, existencia } = req.body;

        try {
            const result = await query(`
                INSERT INTO Product (name, price, description, category_id, size, existencia)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [name, price, description, category_id, size, existencia]);

            res.status(200).json({ message: 'Producto registrado exitosamente' });
        } catch (error) {
            console.error('Error al registrar el producto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
