// components/LayoutComun.jsx
import styles from '../styles/Categoria.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function LayoutCarrito({ children, nombreCategoria }) {
    return (
        <div className={styles.body}>
            <div className={styles.buttonInicio}>
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
            </div>
            <div>
                <h1 className={styles.h1}>{nombreCategoria}</h1>
            </div>

            <div className={styles.raya}>
                <p className={styles.raya}>‎</p>
            </div>

            <div>{children}</div>
        </div>
    );
}
