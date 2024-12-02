import { query } from '../../lib/db';

export default async function handler(req, res) {
    try {
        const rows = await query('SELECT * FROM Category');
        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({ message: 'No se encontraron usuarios' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al recuperar los datos de los usuarios' });
    }
}