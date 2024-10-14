// components/LayoutComun.jsx
import styles from '../styles/Categoria.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function LayoutProducto({ children, nombreCategoria }) {
    return (
        <div className={styles.body}>
            <div className={styles.info}>

                <div className={styles.buttonInicio}>
                    <Link href="/" legacyBehavior>
                        <button className={styles.buttonInicioLink}>
                            <div className={styles.divImage}>
                                <Image
                                    src="/img/logo.png"
                                    alt="logo del negocio"
                                    width={170}
                                    height={100}
                                />
                            </div>
                        </button>
                    </Link>
                </div>

                <div className={styles.buttonsGroup}>
                    {/* <Link href="/">
      <button className={styles.button}>Volver al inicio</button>
    </Link> */}

                    <Link href="/login">
                        <button className={styles.button}>Iniciar sesión</button>
                    </Link>

                    <Link href="/carrito">
                        <button className={styles.button}>
                            <Image
                                src="/img/carrito.png"
                                alt="Carrito"
                                width={25}
                                height={25}
                            />
                            Mi Carrito
                        </button>
                    </Link>
                </div>
            </div>
            <div>
                <h1 className={styles.h1}>{nombreCategoria}</h1>
            </div>

            <div className={styles.raya}>
                <p className={styles.raya}>‎</p>
            </div>

            <div>{children}</div> {/* Aquí se mostrará el contenido específico de cada página */}
        </div>
    );
}
