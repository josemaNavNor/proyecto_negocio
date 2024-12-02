import React, { useEffect, useState } from 'react';
import styles from '../styles/Admin.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Head from 'next/head';


export default function IndexAdmin() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/getUsers');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (customer_id) => {
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
                    const response = await fetch('/api/deleteUser', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ customer_id })
                    });

                    if (response.ok) {
                        Swal.fire(
                            '¡Eliminado!',
                            'El usuario ha sido eliminado.',
                            'success'
                        );
                        // Actualizar la lista de usuarios después de la eliminación
                        setUsers(users.filter(user => user.customer_id !== customer_id));
                    } else {
                        throw new Error('Error al eliminar el usuario');
                    }
                } catch (error) {
                    console.error('Error al eliminar el usuario:', error);
                    Swal.fire(
                        'Error',
                        'No se pudo eliminar el usuario. Inténtelo nuevamente.',
                        'error'
                    );
                }
            }
        });
    };

    return (
        <div className={styles.body}>
            <Head>
                <title>Gestion Usuarios</title>
            </Head>
            <h2>Gestion de usuarios</h2>
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
                            <th>Nombre de usuario</th>
                            <th>Email</th>
                            <th>Ciudad</th>
                            <th>País</th>
                            <th>Número de teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) && users.map((user) => (
                            <tr key={user.customer_id}>
                                <td>{user.customer_id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.city}</td>
                                <td>{user.country}</td>
                                <td>{user.phone_number}</td>
                                <td>
                                    <Link href="/registroUser">
                                        <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '10px', cursor: 'pointer' }} />
                                    </Link>
                                    <Link href={`/actualizarUsuario`}>
                                        <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px', cursor: 'pointer' }} />
                                    </Link>
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDelete(user.customer_id)}
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
