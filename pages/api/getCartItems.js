import connection from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const [rows] = await connection.query(
                `SELECT carrito_id, cantidad, producto_id, product.name, product.price, product.description, product.category_id 
                FROM carrito_de_compras 
                JOIN product ON carrito_de_compras.producto_id = product.product_id 
                WHERE carrito_de_compras.cliente_id = 100`
            );

            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Error al recuperar los productos del carrito', error });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
