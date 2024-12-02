import { query } from '../../lib/db'

export default async (req, res) => {
    const { cartItems } = req.body

    try {
        for (const item of cartItems) {
            await query('UPDATE product SET existencia = existencia - ? WHERE product_id = ?', [item.cantidad, item.product_id])
        }
        res.status(200).json({ message: 'Existencia actualizada exitosamente' })
    } catch (error) {
        console.error('Error al actualizar la existencia:', error)
        res.status(500).json({ message: 'Hubo un problema al actualizar la existencia' })
    }
}
