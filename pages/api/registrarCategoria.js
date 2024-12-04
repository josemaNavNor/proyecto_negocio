import { query } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, description, subcategory_id } = req.body;

        try {
            const result = await query(`
                INSERT INTO category (name, description, subcategory_id)
                VALUES (?, ?, ?)
            `, [name, description, subcategory_id]);

            res.status(200).json({ message: 'Categoria registrada exitosamente' });
        } catch (error) {
            console.error('Error al registrar la categoria:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
