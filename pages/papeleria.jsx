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
                
                <div className={styles.gridContainer}>
                    {/* Animales */}
                    <div className={styles.contenedor}>
                        <h3 className={styles.h3}>Animales</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/papeleria/papMariposa.jpg"
                                alt="Papeleria con animales"
                                width={170}
                                height={200}
                            />
                        </div>
                        <Link href="/">
                            <button className={styles.buttonVerMas}>Ver más</button>
                        </Link>
                    </div>

                    {/* Papeleria con forma de textos */}
                    <div className={styles.contenedor}>
                        <h3 className={styles.h3}>Textos</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/papeleria/papAna.jpg"
                                alt="Papeleria con textos o nombres"
                                width={170}
                                height={200}
                            />
                        </div>
                        <Link href="/">
                            <button className={styles.buttonVerMas}>Ver más</button>
                        </Link>
                    </div>
                </div>
            </LayoutProducto>
        </>
    );
}