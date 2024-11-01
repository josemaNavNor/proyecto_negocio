import LayoutProducto from '../components/layout-productos';
import Layout from '../components/layout-header';
import Subcategory from '../components/subcategory-products';
import connection from '../lib/db';

// Función para obtener los datos de la base de datos
export async function getStaticProps() {
  const [rows] = await connection.query('select name from category where subcategory_id = 2;'); // Asegúrate de ajustar el ID de la categoría según sea necesario
  const products = JSON.parse(JSON.stringify(rows));
  
  return {
    props: {
      products,
    },
  };
}


export default function Souvenirs({ products }) {
  return (
    <>
      <Layout
        title="Souvenirs"
        description="Pagina de Souvenirs"
        icon="/img/icono-invitacion.ico"
      />
      <LayoutProducto nombreCategoria="Souvenirs">
        <Subcategory products={products} category="Souvenirs" />
      </LayoutProducto>
    </>
  );
}
