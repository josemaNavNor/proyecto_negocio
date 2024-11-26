// pages/userData.jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout-header';
import styles from '../styles/Home.module.css'

export default function UserData() {
    const router = useRouter();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUserData = async (email) => {
            try {
                const response = await fetch('/api/getUserData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();
                if (response.ok) {
                    setUserData(data);
                } else {
                    console.error('User not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            fetchUserData(userEmail);
        } else {
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        router.push('/');
    };

    return (
        <div className={styles.body}>
            <Layout title="Datos del Usuario" description="Página con los datos del usuario" />
            <div className={styles.container}>
                <h1>Mis Datos</h1>
                <p><strong>Nombre de usuario:</strong> {userData.username}</p>
                <p><strong>Correo electrónico:</strong> {userData.email}</p>
                <p><strong>Ciudad:</strong> {userData.city}</p>
                <p><strong>País:</strong> {userData.country}</p>
                <p><strong>Número de teléfono:</strong> {userData.phone_number}</p>
                <button className={styles.button} onClick={handleLogout}>Cerrar sesión</button>
            </div>
        </div>
    );
}
