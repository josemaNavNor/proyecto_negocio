import React, { useEffect, useState } from 'react';
import styles from '../styles/Admin.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function IndexAdmin() {
    const [orders, setOrders] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/ordenesAdmin');
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
                <Image
                    src="/img/logo.png"
                    alt="logo del negocio"
                    width={200}
                    height={170}
                />
            </div>
            <div className={styles.nav}>
                {['Usuarios', 'Productos', 'Categoria'].map((item, index) => (
                    <Link href={`/${item.toLowerCase()}`} key={index}>
                        <p className={`${styles.navItem} ${router.pathname === `/${item.toLowerCase()}` ? styles.active : ''}`}>
                            <strong>{item}</strong>
                        </p>
                    </Link>
                ))}
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de usuario</th>
                            <th>Estado</th>
                            <th>Fecha de orden</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(orders) && orders.map((order) => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.username}</td>
                                <td>{order.status === 'Enviado' ? 'Enviado' : 'Pendiente'}</td>
                                <td>{order.order_date}</td>
                                <td>${order.total_amount}</td>
                                <td>
                                    {order.status !== 'Enviado' && (
                                        <button onClick={() => handleStatusChange(order.order_id)}>
                                            Marcar como Enviado
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
