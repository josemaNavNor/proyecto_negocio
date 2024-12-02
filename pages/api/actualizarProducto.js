import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { product_id, name, price, description, size, existencia } = req.body;

        try {
            const result = await query(`
                UPDATE product
                SET name = ?, price = ?, description = ?, size = ?, existencia = ? WHERE product_id = ?`,
                [name, price, description, size, existencia, product_id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            res.status(200).json({ message: 'Producto actualizado exitosamente' });
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
