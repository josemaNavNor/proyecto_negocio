import LayoutProducto from '../components/layout-productos';
import Layout from '../components/layout-header';
import styles from '../styles/Categoria.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Invitaciones() {
    return (
        <>
            <Layout
                title="Creativa"
                description="Pagina de productos creativos"
                icon="/img/icono-invitacion.ico" 
            >
                
            </Layout>

            <LayoutProducto nombreCategoria="Creativa">
                {/* Contenedor de productos */}
                <div className={styles.gridContainer}>
                    {/* Cumpleaños */}
                    <div className={styles.contenedor}>
                        <h3 className={styles.h3}>Cake toppers</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/creativa/happy-bithday-baseball.png"
                                alt="Cake topper"
                                width={170}
                                height={200}
                            />
                        </div>
                        <Link href="/">
                            <button className={styles.buttonVerMas}>Ver más</button>
                        </Link>
                    </div>

                    {/* Cenas */}
                    <div className={styles.contenedor}>
                        <h3 className={styles.h3}>Cajitas</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/creativa/cajita.png" 
                                alt="Cajita"
                                width={170}
                                height={200}
                            />
                        </div>
                        <Link href="/">
                            <button className={styles.buttonVerMas}>Ver más</button>
                        </Link>
                    </div>

                    {/* Bodas */}
                    <div className={styles.contenedor}>
                        <h3 className={styles.h3}>Tarjetas</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/creativa/tarjeta.png" 
                                alt="Diseños unico"
                                width={170}
                                height={200}
                            />
                        </div>
                        <Link href="/">
                            <button className={styles.buttonVerMas}>Ver más</button>
                        </Link>
                    </div>

                    {/* Baby Shower */}
                    <div className={styles.contenedor}>
                        <h3 className={styles.h3}>Decoraciones Temáticas</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/creativa/baseball decoracion.png" 
                                alt="Decoracion"
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