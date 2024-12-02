import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const orders = await query(`
                SELECT 
                    co.order_id,
                    c.username, 
                    s.status, 
                    co.order_date, 
                    co.total_amount
                FROM 
                    Customer_order co
                JOIN 
                    Customer c ON co.customer_id = c.customer_id
                JOIN 
                    Status s ON co.status_id = s.status_id;
            `);

            if (!Array.isArray(orders)) {
                console.error('La respuesta no es un array');
                return res.status(500).json({ error: 'La respuesta no es un array' });
            }

            res.status(200).json(orders);
        } catch (error) {
            console.error('Error al recuperar las órdenes de compra:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
