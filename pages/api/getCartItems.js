import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      // Obtén el cliente_id a partir del email
      const customer = await query('SELECT customer_id FROM customer WHERE email = ?', [email]);

      if (customer.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      const customerId = customer[0].customer_id;

      // Obtén los productos del carrito para este cliente
      const cartItems = await query(`
        SELECT p.product_id, p.name, p.price, c.cantidad
        FROM carrito_de_compras c
        JOIN product p ON c.producto_id = p.product_id
        WHERE c.cliente_id = ?
      `, [customerId]);

      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Error al recuperar los productos del carrito:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}

