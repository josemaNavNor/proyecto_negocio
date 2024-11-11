import connection from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const [rows] = await connection.query(
                'SELECT Carrito_de_compras.carrito_id, Carrito_de_compras.cantidad, Product.product_id, Product.name, Product.price, Product.category_id ' +
                'FROM Carrito_de_compras ' +
                'JOIN Product  ON Carrito_de_compras.producto_id = Product.product_id ' +
                'WHERE Carrito_de_compras.cliente_id = ?', 
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
