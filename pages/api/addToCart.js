import connection from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { cliente_id, producto_id, cantidad } = req.body;

        try {
            const [result] = await connection.query(
                'INSERT INTO Carrito_de_compras (cliente_id, producto_id, cantidad, fecha_agregada) VALUES (?, ?, ?, NOW())',
                [cliente_id, producto_id, cantidad]
            );

            res.status(200).json({ message: 'Producto agregado al carrito', carrito_id: result.insertId });
        } catch (error) {
            res.status(500).json({ message: 'Error al agregar producto al carrito', error });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
