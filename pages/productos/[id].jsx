import Layout from '../../components/layout-header';
import LayoutProducto from '../../components/layout-productos';
import connection from '../../lib/db';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

export async function getStaticPaths() {
    const [rows] = await connection.query('SELECT product_id, category_id FROM product');
    const paths = rows.map((product) => ({
        params: { id: product.product_id.toString() },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const [rows] = await connection.query('SELECT * FROM product WHERE product_id = ?', [params.id]);
    const product = JSON.parse(JSON.stringify(rows[0]));

    return { props: { product } };
}

export default function ProductoDetalle({ product }) {

    let category_name = '';

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
                <p>Descripcion: {product.description}</p>
                <p>Tamaño: {product.size}</p>
            </div>
        </>
    );
}
