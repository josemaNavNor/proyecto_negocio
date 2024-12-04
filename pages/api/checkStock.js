import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { cartItems } = req.body;

        if (!cartItems || !Array.isArray(cartItems)) {
            return res.status(400).json({ message: 'Datos inválidos' });
        }

        try {
            // Crear un mapa para almacenar resultados de la existencia
            const results = {};

            for (const item of cartItems) {
                const [product] = await query('SELECT existencia FROM Product WHERE product_id = ?', [item.product_id]);

                if (!product) {
                    results[item.product_id] = 'Producto no encontrado';
                } else if (product.existencia < item.cantidad) {
                    results[item.product_id] = `Existencia insuficiente: ${product.existencia}`;
                }
            }

            // Verificar si hay problemas
            const hasIssues = Object.values(results).some(value => typeof value === 'string');
            if (hasIssues) {
                return res.status(400).json({ results });
            }

            return res.status(200).json({ message: 'Existencia suficiente' });
        } catch (error) {
            console.error('Error al verificar existencias:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    } else {
        return res.status(405).json({ message: 'Método no permitido' });
    }
}
