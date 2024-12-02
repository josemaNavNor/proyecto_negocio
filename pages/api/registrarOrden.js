import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, cartItems, totalAmount } = req.body;

        try {
            // Obtener el cliente_id a partir del email
            const customer = await query('SELECT customer_id FROM customer WHERE email = ?', [email]);

            if (customer.length === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const customerId = customer[0].customer_id;

            // Insertar la orden en la tabla Customer_order
            const result = await query(`
                INSERT INTO Customer_order (customer_id, status_id, order_date, total_amount)
                VALUES (?, ?, NOW(), ?)
            `, [customerId, 1, totalAmount]);

            const orderId = result.insertId;

            // Insertar cada detalle de la orden en la tabla Order_details
            for (const item of cartItems) {
                await query(`
                    INSERT INTO Order_details (order_id, product_id, quantity, unit_price)
                    VALUES (?, ?, ?, ?)
                `, [orderId, item.product_id, item.cantidad, item.price]);
            }

            res.status(200).json({ message: 'Orden registrada exitosamente' });
        } catch (error) {
            console.error('Error al registrar la orden:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
