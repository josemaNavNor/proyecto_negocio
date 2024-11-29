// pages/carrito.jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout-header';
import Image from "next/image";
import styles from "../styles/Carrito.module.css";

export default function Carrito() {
    const [isRegistered, setIsRegistered] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const email = localStorage.getItem('userEmail');
            if (!email) {
                router.push('/login');
                return;
            }

            try {
                const response = await fetch('/api/checkUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (data.registered) {
                    setIsRegistered(true);
                } else {
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error al verificar el usuario:', error);
                router.push('/login');
            }
        };

        checkUser();
    }, [router]);

    useEffect(() => {
        if (isRegistered) {
            const fetchCartItems = async () => {
                const email = localStorage.getItem('userEmail');
    
                if (!email) {
                    console.error('El email no está definido en localStorage');
                    return;
                }
    
                try {
                    const response = await fetch(`/api/getCartItems?email=${encodeURIComponent(email)}`, {
                        method: 'GET', // Cambiar a GET
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
    
                    const data = await response.json();
                    setCartItems(data);
                } catch (error) {
                    console.error('Error al recuperar los productos del carrito:', error);
                }
            };
    
            fetchCartItems();
        }
    }, [isRegistered]);
    
    
    
    const updateQuantity = (productId, cantidad) => {
        const updatedCart = cartItems.map(item =>
            item.product_id === productId ? { ...item, cantidad } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };


    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price);
            const cantidad = parseInt(item.cantidad, 10);
            return total + (price * cantidad);
        }, 0).toFixed(2);
    };

    if (!isRegistered) {
        return (
            <div className={styles.body}>
                <Layout
                    title="Mi carrito"
                    description="Carrito de compra"
                    icon="/img/carrito-icono.ico"
                />
                <div className={styles.divh1}>
                    <h2>Necesitas iniciar sesión primero.</h2>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.body}>
            <Layout
                title="Mi carrito"
                description="Carrito de compra"
                icon="/img/carrito-icono.ico"
            />

            {cartItems.length > 0 ? (
                <div className={styles.cartItems}>
                    {cartItems.map((item) => (
                        <div key={item.product_id} className={styles.cartItem}>
                            <Image
                                src={`/img/souvenirs/${item.name}.png`}
                                alt={item.name}
                                width={100}
                                height={100}
                                className={styles.productImage}
                            />
                            <p className={styles.productName}>{item.name}</p>
                            <p className={styles.productPrice}>${item.price}</p>
                            <div className={styles.quantityControls}>
                                <button onClick={() => updateQuantity(item.product_id, item.cantidad - 1)}>-</button>
                                <span>{item.cantidad}</span>
                                <button onClick={() => updateQuantity(item.product_id, item.cantidad + 1)}>+</button>
                            </div>
                            <p className={styles.totalPrice}>${(item.price * item.cantidad).toFixed(2)}</p>
                        </div>
                    ))}
                    <div className={styles.totalContainer}>
                        <h3>Total: ${calculateTotal()}</h3>
                    </div>
                </div>
            ) : (
                <div className={styles.divh1}>
                    <h2>No hay productos en el carrito.</h2>
                </div>
            )}
        </div>
    );
}
