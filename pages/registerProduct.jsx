import { useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import Layout from '../components/layout-header';

export default function RegistroProducto() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category_id: '',
        size: '',
        existencia: ''
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
        const res = await fetch('/api/registerProduct', {
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
                text: 'El producto ha sido registrado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                // Redirigir a la página de gestión de productos o cualquier otra página
                router.push('/indexAdmin');
            });
        } else {
            // Mostrar alerta de error
            Swal.fire({
                title: 'Error en el registro',
                text: 'Hubo un problema al registrar el producto. Inténtelo nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <div className={styles.body}>
            <Layout
                title="Registro de producto"
                description="Página de registro de producto"
                icon="/img/login-icono.ico"
            ></Layout>

            <div className={styles.contenedor}>
                <h2>Registro de productos</h2>

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
                        <input className={styles.inputCorreo} type="text" name="name" placeholder="Nombre del producto" required value={formData.name} onChange={handleChange} />
                    </div>

                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="number" name="price" placeholder="Precio" required value={formData.price} onChange={handleChange} />
                    </div>

                    <div className={styles.divInputPass}>
                        <input className={styles.inputPass} type="text" name="description" placeholder="Descripción" required value={formData.description} onChange={handleChange} />
                    </div>

                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="number" name="category_id" placeholder="ID de categoría" required value={formData.category_id} onChange={handleChange} />
                    </div>

                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="text" name="size" placeholder="Tamaño" required value={formData.size} onChange={handleChange} />
                    </div>

                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="number" name="existencia" placeholder="Cantidad en existencia" required value={formData.existencia} onChange={handleChange} />
                    </div>

                    <div className={styles.divInputButton}>
                        <button className={styles.inputButton} type="submit">Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
