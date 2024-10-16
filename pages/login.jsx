import Link from "next/link"
import Image from "next/image"
import styles from "../styles/Login.module.css"
import Layout from '../components/layout-header';

export default function Login() {
    return (
        <div className={styles.body}>
            <Layout
                title="Inicio de sesion"
                description="Pagina de inicio de sesion"
                icon="/img/login-icono.ico"
            ></Layout>

            <div className={styles.contenedor}>
                <div className={styles.divImage}>
                    <Image
                        src="/img/logo.png"
                        alt="logo del negocio"
                        width={190}
                        height={170}
                    />
                </div>
                <form action="">
                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="text" name="" id="" placeholder="Ingrese su correo" />
                    </div>

                    <div className={styles.divInputPass}>
                        <input className={styles.inputPass} type="password" name="" id="" placeholder="Ingrese su contraseña" />
                    </div>

                    <Link href="/">
                        <div className={styles.divInputButton}>
                            <button className={styles.inputButton}>Iniciar sesion</button>
                        </div>
                    </Link>

                    <div>
                        <p>¿No tienes una cuenta? ¡Registrate Aqui!</p>
                    </div>
                </form>
            </div>

        </div>
    )
}
