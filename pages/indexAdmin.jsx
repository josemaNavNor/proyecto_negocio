import React, { useEffect, useState } from 'react';
import styles from '../styles/Admin.module.css';
import Layout from '../components/layout-header';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

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

    const handleStatusChange = async (orderId) => {
        try {
            const response = await fetch(`/api/actualizarEstado`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderId, newStatusId: 3 }) // 2 representando el ID del estado "Enviado"
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Estado actualizado',
                    text: 'La orden ha sido marcada como enviada.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });

                // Actualizar el estado local de las órdenes
                setOrders(prevOrders => prevOrders.map(order =>
                    order.order_id === orderId ? { ...order, status: 'Enviado' } : order
                ));
            } else {
                throw new Error('Error al actualizar el estado de la orden');
            }
        } catch (error) {
            console.error('Error al actualizar el estado de la orden:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo actualizar el estado de la orden. Intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <div className={styles.body}>
            <Layout
                title="Inicio Administrador"
                description="Inicio del administrador"
                icon="/img/icono-invitacion.ico"
            />
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
