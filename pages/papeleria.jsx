import LayoutProducto from '../components/layout-productos';
import Layout from '../components/layout-header';
import styles from '../styles/Categoria.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Invitaciones() {
    return (
        <>
            <Layout
                title="Papeleria"
                description="Productos de papeleria"
                icon="/img/icono-invitacion.ico"
            >

            </Layout>

            <LayoutProducto nombreCategoria="Papeleria">
                <h2>No supe que poner crack</h2>
            </LayoutProducto>
        </>
    );
}