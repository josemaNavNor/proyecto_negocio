import LayoutProducto from '../../components/layout-productos';
import Layout from '../../components/layout-header';
import Productos from '../../components/productos';
import connection from '../../lib/db';

// Función para obtener los datos de la base de datos
export async function getStaticProps() {
    const [rows] = await connection.query('SELECT product_id, name, price, description, size, category_id FROM product WHERE name LIKE "%xv%"');
    const products = JSON.parse(JSON.stringify(rows));

    return {
        props: {
            products,
        },
    };
}

export default function InvitacionesXV({ products }) {
    return (
        <>
            <Layout
                title="Invitaciones"
                description="Página de invitaciones XV"
                icon="/img/icono-invitacion.ico"
            />
            <LayoutProducto nombreCategoria="Invitaciones">
                <Productos products={products} category="Invitaciones" />
            </LayoutProducto>
        </>
    );
}
