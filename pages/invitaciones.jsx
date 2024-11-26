// pages/invitaciones.jsx
import LayoutProducto from '../components/layout-productos';
import Layout from '../components/layout-header';
import Subcategory from '../components/subcategory-products';
import { query } from '../lib/db';

// Función para obtener los datos de la base de datos
export async function getStaticProps() {
  const rows = await query('SELECT name FROM category WHERE subcategory_id = 1'); // Asegúrate de ajustar el ID de la categoría según sea necesario
  const products = JSON.parse(JSON.stringify(rows));
  
  return {
    props: {
      products,
    },
  };
}


export default function Invitaciones({ products }) {
  return (
    <>
      <Layout
        title="Invitaciones"
        description="Pagina de invitaciones"
        icon="/img/icono-invitacion.ico"
      />
      <LayoutProducto nombreCategoria="Invitaciones">
        <Subcategory products={products} category="invitaciones" />
      </LayoutProducto>
    </>
  );
}
