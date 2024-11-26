import LayoutProducto from '../components/layout-productos';
import Layout from '../components/layout-header';
import Subcategory from '../components/subcategory-products';
import { query } from '../lib/db';

// Función para obtener los datos de la base de datos
export async function getStaticProps() {
  const rows = await query('SELECT name FROM category WHERE subcategory_id = 4'); // Asegúrate de ajustar el ID de la categoría según sea necesario
  const products = JSON.parse(JSON.stringify(rows));
  
  return {
    props: {
      products,
    },
  };
}


export default function Creativa({ products }) {
  return (
    <>
      <Layout
        title="Creativa"
        description="Pagina de creativa"
        icon="/img/icono-invitacion.ico"
      />
      <LayoutProducto nombreCategoria="Creativa">
        <Subcategory products={products} category="creativa" />
      </LayoutProducto>
    </>
  );
}
