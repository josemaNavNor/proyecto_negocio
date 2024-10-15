import LayoutProducto from '../components/layout-productos';
import Layout from '../components/layout-header';
import styles from '../styles/Categoria.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Invitaciones() {
    return (
        <>
            <Layout
                title="Recuerdos"
                description="Pagina de recuerdos"
                icon="/img/icono-invitacion.ico"
            >

            </Layout>

            <LayoutProducto nombreCategoria="Recuerdos">
                {/* Contenedor de productos */}
                <div className={styles.gridContainer}>
                    {/* Cumpleaños */}
                    <div className={styles.contenedor}>
                        <h3 className={styles.h3}>Adultos</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/recuerdos/recuerdo-vino.png"
                                alt="Recuerdo para adultos"
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
                        <h3 className={styles.h3}>Religion</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/recuerdos/recuerdo-biblia.png"
                                alt="Recuerdo de religion"
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
                        <h3 className={styles.h3}>Fiestas</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/recuerdos/recuerdo-xv.png"
                                alt="Recuerdos de fiestas"
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
                        <h3 className={styles.h3}>Dias festivos</h3>
                        <div className={styles.imagenProducto}>
                            <Image
                                src="/img/recuerdos/recuerdo-veladora.png"
                                alt="Recuerdos de dias festivos"
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