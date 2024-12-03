import React, { useEffect, useState } from 'react';
import styles from '../styles/Admin.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Importa los iconos adicionales
import Head from 'next/head';
import Swal from 'sweetalert2';

export default function IndexAdmin() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/obtenerProductos');
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleDelete = async (product_id) => { // Corregimos el parámetro a product_id
        Swal.fire({
            title: '¿Está seguro?',
            text: 'No podrás revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch('/api/deleteProduct', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ product_id }) // Aseguramos que se envíe el product_id
                    });

                    if (response.ok) {
                        Swal.fire(
                            '¡Eliminado!',
                            'El producto ha sido eliminado.',
                            'success'
                        );
                        // Actualizar la lista de productos después de la eliminación
                        setOrders(orders.filter(order => order.product_id !== product_id)); // Corregimos el uso del estado
                    } else {
                        throw new Error('Error al eliminar el producto');
                    }
                } catch (error) {
                    console.error('Error al eliminar el producto:', error);
                    Swal.fire(
                        'Error',
                        'No se pudo eliminar el producto. Inténtelo nuevamente.',
                        'error'
                    );
                }
            }
        });
    };

    return (
        <div className={styles.body}>
            <Head>
                <title>Gestión productos</title>
            </Head>
            <h2>Gestión de productos</h2>
            <div className={styles.divImage}>
                <Link href="/indexAdmin">
                    <p>
                        <Image
                            src="/img/logo.png"
                            alt="logo del negocio"
                            width={200}
                            height={170}
                        />
                    </p>
                </Link>
            </div>
            <div className={styles.nav}>
                {['Usuarios', 'Productos', 'Categoria'].map((item, index) => (
                    <Link href={`/${item.toLowerCase()}`} key={index} className={styles.navItem}>
                        <strong>{item}</strong>
                    </Link>
                ))}
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre del producto</th>
                            <th>Precio</th>
                            <th>Descripción</th>
                            <th>Categoría</th>
                            <th>Tamaño</th>
                            <th>En existencia</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(orders) && orders.map((order) => (
                            <tr key={order.product_id}>
                                <td>{order.product_id}</td>
                                <td>{order.name}</td>
                                <td>{order.price}</td>
                                <td>{order.description}</td>
                                <td>{order.category_id}</td>
                                <td>{order.size}</td>
                                <td className={order.existencia <= 10 ? styles.lowStock : ''}>
                                    {order.existencia}
                                </td>
                                <td>
                                    <Link href="/registerProduct">
                                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: '10px', cursor: 'pointer' }} />
                                    </Link>
                                    <Link href={`/actualizarProducto`}>
                                        <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px', cursor: 'pointer' }} />
                                    </Link>
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDelete(order.product_id)} // Corregimos el uso de orders.product_id a order.product_id
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
