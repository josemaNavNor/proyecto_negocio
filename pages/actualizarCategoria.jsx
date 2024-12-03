import { useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Image from 'next/image';
import styles from '../styles/Login.module.css';
import Layout from '../components/layout-header';
import Link from 'next/link';

export default function ActualizarProducto() {
    const router = useRouter();
    const [categoryId, setCategoryId] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        subcategory_id: ''
    });

    const handleIdChange = (e) => {
        setCategoryId(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFetchProduct = async () => {
        if (!categoryId) {
            Swal.fire({
                title: 'Error',
                text: 'ID del producto es requerido',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        try {
            const response = await fetch(`/api/getCategoriaID?category_id=${categoryId}`);
            if (!response.ok) {
                throw new Error('Error al obtener el producto');
            }
            const data = await response.json();
            setFormData({
                name: data.name || '',
                description: data.description || '',
                subcategory_id: data.subcategory_id || ''
            });
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo obtener el producto. Verifica el ID e intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/actualizarCategoria', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...formData, category_id: categoryId })
        });

        if (res.ok) {
            Swal.fire({
                title: 'Actualización exitosa',
                text: 'La categoria ha sido actualizada correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                router.push('/categoria');
            });
        } else {
            Swal.fire({
                title: 'Error en la actualización',
                text: 'Hubo un problema al actualizar la categoria. Inténtelo nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <div className={styles.body}>
            <Layout
                title="Actualizar categoria"
                description="Página de actualización de categoria"
                icon="/img/login-icono.ico"
            ></Layout>

            <div className={styles.contenedor}>
                <div className={styles.divImage}>
                    <Link href="/categoria">
                        <Image
                            src="/img/logo.png"
                            alt="logo del negocio"
                            width={200}
                            height={170}
                        />
                    </Link>
                </div>

                <h2>Interfaz de actualizar categoria</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.divInputCorreo}>
                        <input
                            type="text"
                            placeholder="Ingrese ID de la categoria"
                            value={categoryId}
                            onChange={handleIdChange}
                            className={styles.inputCorreo}
                            required
                        />
                        <button type="button" onClick={handleFetchProduct}>
                            Obtener categoria
                        </button>
                    </div>
                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="text" name="name" placeholder="Ingrese Nombre de la categoria" required value={formData.name} onChange={handleChange} />
                    </div>
                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="text" name="description" placeholder="Ingrese descripción" required value={formData.description} onChange={handleChange} />
                    </div>
                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="number" name="subcategory_id" placeholder="Ingrese la subcategoria" required value={formData.subcategory_id} onChange={handleChange} />
                    </div>
                    <div className={styles.divInputButton}>
                        <button className={styles.inputButton} type="submit">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
