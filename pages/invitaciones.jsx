import LayoutProducto from '../components/layout-productos';
import Layout from '../components/layout-header';
import styles from '../styles/Categoria.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Invitaciones() {
    return (
        <>
            <Layout
                title="Invitaciones"
                description="Pagina de invitaciones"
                icon="/img/icono-invitacion.ico" 
            >
                
            </Layout>

            <LayoutProducto nombreCategoria="Invitaciones">
                {/* Contenedor de productos */}
                <div className={styles.gridContainer}>
                    {/* Cumpleaños */}
                    <div className={styles.contenedor}>
                        <h3 className={styles.h3}>Cumpleaños</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/invitacion1.jpg"
                                alt="Cumpleaños"
                                width={170}
                                height={200}
                            />
                        </div>
                        <Link href="/">
                            <button className={styles.button}>Ver más</button>
                        </Link>
                    </div>

                    {/* Cenas */}
                    <div className={styles.contenedor}>
                        <h3 className={styles.h3}>Cenas</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/invitaciones/happy-xv-pink.png" // Cambia la ruta de la imagen según sea necesario
                                alt="Cenas"
                                width={170}
                                height={200}
                            />
                        </div>
                        <Link href="/">
                            <button className={styles.button}>Ver más</button>
                        </Link>
                    </div>

                    {/* Bodas */}
                    <div className={styles.contenedor}>
                        <h3 className={styles.h3}>Bodas</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/invitaciones/invitacion-black.png" // Cambia la ruta de la imagen según sea necesario
                                alt="Bodas"
                                width={170}
                                height={200}
                            />
                        </div>
                        <Link href="/">
                            <button className={styles.button}>Ver más</button>
                        </Link>
                    </div>

                    {/* Baby Shower */}
                    <div className={styles.contenedor}>
                        <h3 className={styles.h3}>Baby Shower</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/shower.jpg" // Cambia la ruta de la imagen según sea necesario
                                alt="Baby Shower"
                                width={170}
                                height={200}
                            />
                        </div>
                        <Link href="/">
                            <button className={styles.button}>Ver más</button>
                        </Link>
                    </div>
                </div>
            </LayoutProducto>
        </>
    );
}