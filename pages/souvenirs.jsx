import LayoutProducto from '../components/layout-productos';
import Layout from '../components/layout-header';
import styles from '../styles/Categoria.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Invitaciones() {
    return (
        <>
            <Layout
                title="Souvenirs"
                description="Pagina de souvenirs"
                icon="/img/icono-invitacion.ico" 
            >
                
            </Layout>

            <LayoutProducto nombreCategoria="Souvenirs">
                {/* Contenedor de productos */}
                <div className={styles.gridContainer}>
                    {/* Cumpleaños */}
                    <div className={styles.contenedor}>
                        <h3 className={styles.h3}>Muñecos</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/souvenirs/souvenir-peluche.png"
                                alt="Muñeco"
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
                        <h3 className={styles.h3}>Adornos</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/souvenirs/souvenir-mariposas.png" 
                                alt="Adorno"
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
                        <h3 className={styles.h3}>Diseños unicos</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/souvenirs/souvenir-botella.png" 
                                alt="Diseños unico"
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
                        <h3 className={styles.h3}>Otros productos</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/souvenirs/souvenir-correo.png" 
                                alt="Otros"
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