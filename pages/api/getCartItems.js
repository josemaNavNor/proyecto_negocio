import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { email } = req.query; // Obtener el email desde la query string

        try {
            console.log('Recuperando productos del carrito para email:', email); // Log de depuración

            // Verificación inicial del email
            if (!email) {
                console.error('No se proporcionó un email válido');
                return res.status(400).json({ error: 'Email no proporcionado' });
            }

            // Obtén el cliente_id a partir del email
            const customer = await query('SELECT customer_id FROM customer WHERE email = ?', [email]);

            if (customer.length === 0) {
                console.error('Usuario no encontrado');
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const customerId = customer[0].customer_id;
            console.log('customerId:', customerId); // Log de depuración

            // Obtén los productos del carrito para este cliente
            const cartItems = await query(`
                SELECT p.product_id, p.name, p.price, c.cantidad
                FROM carrito_de_compras c
                JOIN product p ON c.producto_id = p.product_id
                WHERE c.cliente_id = ?
            `, [customerId]);

            console.log('cartItems:', cartItems); // Log de depuración
            res.status(200).json(cartItems);
        } catch (error) {
            console.error('Error al recuperar los productos del carrito:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        console.error('Método no permitido');
        res.status(405).json({ error: 'Método no permitido' });
    }
}
