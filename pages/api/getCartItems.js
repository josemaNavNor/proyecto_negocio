import connection from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const [rows] = await connection.query(
                'SELECT c.carrito_id, c.cantidad, p.product_id, p.name, p.price, p.category_id ' +
                'FROM Carrito_de_compras c ' +
                'JOIN Product p ON c.producto_id = p.product_id ' +
                'WHERE c.cliente_id = ?', 
                [/* ID del cliente */]
            );

            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Error al recuperar los productos del carrito', error });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
