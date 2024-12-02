import { useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Image from 'next/image';
import styles from '../styles/Login.module.css';
import Layout from '../components/layout-header';
import Link from 'next/link';

export default function ActualizarUsuario() {
    const router = useRouter();
    const [userId, setUserId] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        city: '',
        country: '',
        phone_number: ''
    });

    const handleIdChange = (e) => {
        setUserId(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFetchUser = async () => {
        if (!userId) {
            Swal.fire({
                title: 'Error',
                text: 'ID del usuario es requerido',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        try {
            const response = await fetch(`/api/getUser?customer_id=${userId}`);
            if (!response.ok) {
                throw new Error('Error al obtener el usuario');
            }
            const data = await response.json();
            setFormData({
                username: data.username || '',
                email: data.email || '',
                password: '',
                city: data.city || '',
                country: data.country || '',
                phone_number: data.phone_number || ''
            });
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo obtener el usuario. Verifica el ID e intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/updateUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...formData, customer_id: userId })
        });

        if (res.ok) {
            Swal.fire({
                title: 'Actualización exitosa',
                text: 'El usuario ha sido actualizado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                router.push('/usuarios');
            });
        } else {
            Swal.fire({
                title: 'Error en la actualización',
                text: 'Hubo un problema al actualizar el usuario. Inténtelo nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <div className={styles.body}>
            <Layout
                title="Actualizar Usuario"
                description="Página de actualización de usuario"
                icon="/img/login-icono.ico"
            ></Layout>


            <div className={styles.contenedor}>
                <div className={styles.divImage}>
                    <Link href="/indexAdmin">
                        <Image
                            src="/img/logo.png"
                            alt="logo del negocio"
                            width={200}
                            height={170}
                        />
                    </Link>
                </div>

                <h2>Interfaz de actualizar Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.divInputCorreo}>
                        <input
                            type="text"
                            placeholder="Ingrese ID del usuario"
                            value={userId}
                            onChange={handleIdChange}
                            className={styles.inputCorreo}
                            required
                        />
                        <button type="button" onClick={handleFetchUser}>
                            Obtener Usuario
                        </button>
                    </div>
                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="text" name="username" placeholder="Ingrese Nombre de usuario" required value={formData.username} onChange={handleChange} />
                    </div>
                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="email" name="email" placeholder="Ingrese correo" required value={formData.email} onChange={handleChange} />
                    </div>
                    <div className={styles.divInputPass}>
                        <input className={styles.inputPass} type="password" name="password" placeholder="Ingrese contraseña" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="text" name="city" placeholder="Ingrese ciudad" required value={formData.city} onChange={handleChange} />
                    </div>
                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="text" name="country" placeholder="Ingrese pais" required value={formData.country} onChange={handleChange} />
                    </div>
                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="text" name="phone_number" placeholder="Ingrese numero de telefono" required value={formData.phone_number} onChange={handleChange} />
                    </div>
                    <div className={styles.divInputButton}>
                        <button className={styles.inputButton} type="submit">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
