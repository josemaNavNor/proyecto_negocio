import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import Layout from '../components/layout-header';


export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/checkUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (email === 'admin@gmail.com' && password === '12345') {
                Swal.fire({
                    title: 'Inicio de sesión exitoso',
                    text: 'Has iniciado sesión correctamente a la interfaz administrador.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userPassword', password); // Guardar la contraseña
                    router.push('/indexAdmin'); // Redirigir a la página indexAdmin.jsx
                });
            } else if (data.success) {
                Swal.fire({
                    title: 'Inicio de sesión exitoso',
                    text: 'Has iniciado sesión correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userPassword', password); // Guardar la contraseña
                    router.push('/'); // Redirigir a la página index.jsx
                });
            } else {
                Swal.fire({
                    title: 'Error en el inicio de sesión',
                    text: data.message,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al intentar iniciar sesión. Por favor, inténtelo nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };
    
    return (
        <div className={styles.body}>
            <Layout
                title="Inicio de sesión"
                description="Página de inicio de sesión"
                icon="/img/login-icono.ico"
            />

            <div className={styles.contenedor}>
                <div className={styles.divImage}>
                    <Image
                        src="/img/logo.png"
                        alt="logo del negocio"
                        width={190}
                        height={170}
                    />
                </div>
                <form onSubmit={handleLogin}>
                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="text" name="email" placeholder="Ingrese su correo" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className={styles.divInputPass}>
                        <input className={styles.inputPass} type="password" name="password" placeholder="Ingrese su contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className={styles.divInputButton}>
                        <button className={styles.inputButton} type="submit">Iniciar sesión</button>
                    </div>

                    <div>
                        <p>¿No tienes una cuenta?
                            <Link href='/registroUser'>
                                ¡Regístrate Aquí!
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
