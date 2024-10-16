import Image from "next/image"
import Link from "next/link"
import styles from "../styles/Carrito.module.css"
import Layout from '../components/layout-header';

export default function Carrito() {
    return (
        <div className={styles.body}>
            <Layout
                title="Mi carrito"
                description="Carrito de compra"
                icon="/img/carrito-icono.ico"
            ></Layout>

            <div className={styles.divButtonLogin}>
                <Link href="/login">
                    <button className={styles.button}>Iniciar sesión</button>
                </Link>
            </div>

            <Link href="/" legacyBehavior>
                <button className={styles.buttonInicioLink}>
                    <div className={styles.divImage}>
                        <Image
                            src="/img/logo.png"
                            alt="logo del negocio"
                            width={190}
                            height={170}
                        />
                    </div>
                </button>
            </Link>

            <div className={styles.divh1}>
                <h1>Mi carrito de compras</h1>
            </div>

            <div className={styles.raya}>
                <p className={styles.raya}>‎</p>
            </div>

            <div className={styles.divh1}>
                <h2>Inicie sesion para poder ver su carrito de compra!</h2>
            </div>
        </div>
    )
}
