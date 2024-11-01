import LayoutProducto from '../../components/layout-productos';
import Layout from '../../components/layout-header';
import Productos from '../../components/productos';
import connection from '../../lib/db';

// Función para obtener los datos de la base de datos
export async function getStaticProps() {
    const [rows] = await connection.query('SELECT name, price, description, size FROM product where category_id = 1');
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
                title="XV"
                description="Pagina de invitaciones XV"
                icon="/img/icono-invitacion.ico"
            />
            <LayoutProducto nombreCategoria="Invitaciones XV">
                <Productos products={products} category="Invitaciones" />
            </LayoutProducto>
        </>
    );
}
