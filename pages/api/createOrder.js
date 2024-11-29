import { PayPalClient } from '@paypal/checkout-server-sdk';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    try {
        const { amount } = req.body;
        const client = new PayPalClient(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET);

        const request = new PayPalClient.orders.OrdersCreateRequest();
        request.headers['Content-Type'] = 'application/json';
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: amount,
                },
                reference_id: uuidv4(),
            }]
        });

        const order = await client.execute(request);
        res.status(200).json(order.result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la orden' });
    }
}
