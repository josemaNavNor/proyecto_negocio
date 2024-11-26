import LayoutProducto from '../../components/layout-productos';
import Layout from '../../components/layout-header';
import Productos from '../../components/productos';
import { query } from '../../lib/db';

// Función para obtener los datos de la base de datos
export async function getStaticProps() {
  const rows = await query('SELECT product_id, name, price, description, size, category_id FROM product WHERE name LIKE "%peluche%"'); // Asegúrate de ajustar el ID de la categoría según sea necesario
  const products = JSON.parse(JSON.stringify(rows));
  
  return {
    props: {
      products,
    },
  };
}


export default function Peluches({ products }) {
  return (
    <>
      <Layout
        title="Peluches"
        description="Pagina de Peluches"
        icon="/img/icono-invitacion.ico"
      />
      <LayoutProducto nombreCategoria="Peluches">
        <Productos products={products} category="Souvenirs" />
      </LayoutProducto>
    </>
  );
}
