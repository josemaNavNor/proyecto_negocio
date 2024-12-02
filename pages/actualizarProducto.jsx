import { useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Image from 'next/image';
import styles from '../styles/Login.module.css';
import Layout from '../components/layout-header';
import Link from 'next/link';

export default function ActualizarProducto() {
    const router = useRouter();
    const [productId, setProductId] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        size: '',
        existencia: ''
    });

    const handleIdChange = (e) => {
        setProductId(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFetchProduct = async () => {
        if (!productId) {
            Swal.fire({
                title: 'Error',
                text: 'ID del producto es requerido',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        try {
            const response = await fetch(`/api/getProduct?product_id=${productId}`);
            if (!response.ok) {
                throw new Error('Error al obtener el producto');
            }
            const data = await response.json();
            setFormData({
                name: data.name || '',
                price: data.price || '',
                description: data.description || '',
                size: data.size || '',
                existencia: data.existencia || ''
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

        const res = await fetch('/api/actualizarProducto', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...formData, product_id: productId })
        });

        if (res.ok) {
            Swal.fire({
                title: 'Actualización exitosa',
                text: 'El producto ha sido actualizado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                router.push('/productos');
            });
        } else {
            Swal.fire({
                title: 'Error en la actualización',
                text: 'Hubo un problema al actualizar el producto. Inténtelo nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <div className={styles.body}>
            <Layout
                title="Actualizar Producto"
                description="Página de actualización de producto"
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

                <h2>Interfaz de actualizar Producto</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.divInputCorreo}>
                        <input
                            type="text"
                            placeholder="Ingrese ID del producto"
                            value={productId}
                            onChange={handleIdChange}
                            className={styles.inputCorreo}
                            required
                        />
                        <button type="button" onClick={handleFetchProduct}>
                            Obtener Producto
                        </button>
                    </div>
                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="text" name="name" placeholder="Ingrese Nombre del producto" required value={formData.name} onChange={handleChange} />
                    </div>
                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="number" name="price" placeholder="Ingrese precio" required value={formData.price} onChange={handleChange} />
                    </div>
                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="text" name="description" placeholder="Ingrese descripción" required value={formData.description} onChange={handleChange} />
                    </div>
                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="text" name="size" placeholder="Ingrese tamaño" required value={formData.size} onChange={handleChange} />
                    </div>
                    <div className={styles.divInputCorreo}>
                        <input className={styles.inputCorreo} type="number" name="existencia" placeholder="Ingrese existencia" required value={formData.existencia} onChange={handleChange} />
                    </div>
                    <div className={styles.divInputButton}>
                        <button className={styles.inputButton} type="submit">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

