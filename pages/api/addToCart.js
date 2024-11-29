import { query } from '../../lib/db';

export default async function handler(req, res) {
    // Verifica si el método es POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    try {
        // Obtén los datos del body de la solicitud
        const { email, producto_id, cantidad } = req.body;

        // Valida que los datos necesarios existan
        if (!email || !producto_id || !cantidad) {
            return res.status(400).json({ message: 'Faltan parámetros requeridos' });
        }

        // Obtener el cliente_id basado en el email
        const rows = await query('SELECT customer_id FROM customer WHERE email = ?', [email]);

        // Verifica si se encontró un cliente con el email proporcionado
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        // Extrae el cliente_id de la primera fila
        const customer_id = rows[0].customer_id;

        // Inserta el producto en el carrito
        const result = await query(
            'INSERT INTO carrito_de_compras (cliente_id, producto_id, cantidad, fecha_agregada) VALUES (?, ?, ?, NOW())',
            [customer_id, producto_id, cantidad]
        );

        // Responde con éxito
        res.status(200).json({ message: 'Producto agregado al carrito', carrito_id: result.insertId });
    } catch (error) {
        console.error('Error al agregar al carrito:', error.message);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
}
