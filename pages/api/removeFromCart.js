import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    try {
        const { email, productId } = req.body;

        if (!email || !productId) {
            return res.status(400).json({ message: 'Faltan parámetros requeridos' });
        }

        // Obtener el cliente_id basado en el email
        const customer = await query('SELECT customer_id FROM customer WHERE email = ?', [email]);

        if (customer.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        const customerId = customer[0].customer_id;

        // Eliminar el producto del carrito
        await query('DELETE FROM carrito_de_compras WHERE producto_id = ?', [productId]);

        res.status(200).json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
