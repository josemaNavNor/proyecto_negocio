// Importación de componentes y librerías necesarios
import Layout from '../../components/layout-header'; // Componente de diseño para el encabezado
import LayoutProducto from '../../components/layout-productos'; // Componente de diseño para productos
import connection from '../../lib/db'; // Conexión a la base de datos
import Image from 'next/image'; // Componente para mostrar imágenes en Next.js
import styles from '../../styles/Home.module.css'; // Estilos CSS del componente

// Función para generar rutas estáticas para el pre-renderizado de páginas de productos
export async function getStaticPaths() {
    // Realiza una consulta a la base de datos para obtener el ID y la categoría de los productos
    const [rows] = await connection.query('SELECT product_id, category_id FROM product');
    // Mapea los resultados de la consulta para generar rutas dinámicas basadas en el ID del producto
    const paths = rows.map((product) => ({
        params: { id: product.product_id.toString() }, // Convierte el ID del producto a cadena
    }));

    // Retorna las rutas generadas y especifica que no habrá rutas no manejadas (fallback: false)
    return { paths, fallback: false };
}

// Función para obtener datos específicos del producto basándose en el ID de la URL
export async function getStaticProps({ params }) {
    // Realiza una consulta a la base de datos para obtener todos los datos del producto correspondiente al ID
    const [rows] = await connection.query('SELECT * FROM product WHERE product_id = ?', [params.id]);
    // Convierte los datos obtenidos en un objeto JSON
    const product = JSON.parse(JSON.stringify(rows[0]));

    // Retorna los datos del producto como propiedades (props) para el componente
    return { props: { product } };
}

// Componente React para mostrar los detalles del producto
export default function ProductoDetalle({ product }) {

    let category_name = '';

    // Asigna un nombre de categoría basado en el ID de la categoría del producto
    if (product.category_id === 1) {
        category_name = 'Invitaciones';
    } else if (product.category_id === 2) {
        category_name = 'Souvenirs';
    } else if (product.category_id === 3) {
        category_name = 'Papeleria';
    } else if (product.category_id === 4) {
        category_name = 'Creativa';
    } else if (product.category_id === 5) {
        category_name = 'Recuerdos';
    }
    
    return (
        <>
            <Layout title={product.name} description={product.description} icon="/img/icon.ico" />
            <div className={styles.body}>
                <h1>{product.name}</h1>
                <Image
                    src={`/img/${category_name}/${product.name}.png`}
                    alt={product.name}
                    width={200}
                    height={200}
                />
                <p>Precio: ${product.price}</p>
                <p>Descripción: {product.description}</p>
                <p>Tamaño: {product.size}</p>
            </div>
        </>
    );
}
