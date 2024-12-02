import React, { useEffect, useState } from 'react';
import styles from '../styles/Admin.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Importa los iconos adicionales

export default function IndexAdmin() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/getCategoria');
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className={styles.body}>
            <h2>Interfaz de administrador</h2>
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
                {['Usuarios', 'Productos', 'Categoria', 'Inventario'].map((item, index) => (
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
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Subcategoria</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(orders) && orders.map((order) => (
                            <tr key={order.category_id}>
                                <td>{order.category_id}</td>
                                <td>{order.name}</td>
                                <td>{order.description}</td>
                                <td>{order.subcategory_id}</td>
                                <td>
                                    <Link href="/agregarUsuario">
                                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: '10px', cursor: 'pointer' }} />
                                    </Link>
                                    <Link href={`/actualizarUsuario/${order.customer_id}`}>
                                        <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px', cursor: 'pointer' }} />
                                    </Link>
                                    <Link href={`/eliminarUsuario/${order.customer_id}`}>
                                        <FontAwesomeIcon icon={faTrashAlt} style={{ cursor: 'pointer' }} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
