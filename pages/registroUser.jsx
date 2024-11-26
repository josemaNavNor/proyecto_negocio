// Importación de componentes y librerías necesarios
import { useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import Layout from '../components/layout-header';

export default function Registro() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        city: '',
        country: '',
        phone_number: ''
    });

    // Manejador del cambio en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Manejador del envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Enviar los datos del formulario al servidor
        const res = await fetch('/api/registerUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            // Mostrar alerta de éxito
            Swal.fire({
                title: 'Registro exitoso',
                text: 'El usuario ha sido registrado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                // Redirigir al usuario a la página de inicio de sesión o cualquier otra página
                router.push('/login');
            });
        } else {
            // Mostrar alerta de error
            Swal.fire({
                title: 'Error en el registro',
                text: 'Hubo un problema al registrar el usuario. Inténtelo nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <div className={styles.body}>
            <Layout
                title="Registro de usuario"
                description="Pagina de registro de usuario"
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
                <form onSubmit={handleSubmit}>

                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="text" name="username" placeholder="Ingrese su Nombre de usuario" required value={formData.username} onChange={handleChange} />
                    </div>

                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="email" name="email" placeholder="Ingrese su correo" required value={formData.email} onChange={handleChange} />
                    </div>

                    <div className={styles.divInputPass}>
                        <input className={styles.inputPass} type="password" name="password" placeholder="Ingrese su contraseña" required value={formData.password} onChange={handleChange} />
                    </div>

                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="text" name="city" placeholder="Ingrese su ciudad" required value={formData.city} onChange={handleChange} />
                    </div>

                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="text" name="country" placeholder="Ingrese su pais" required value={formData.country} onChange={handleChange} />
                    </div>

                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="text" name="phone_number" placeholder="Ingrese su numero de telefono" required value={formData.phone_number} onChange={handleChange} />
                    </div>

                    <div className={styles.divInputButton}>
                        <button className={styles.inputButton} type="submit">Registrarme</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
