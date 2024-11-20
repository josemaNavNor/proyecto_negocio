import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Carrito.module.css";
import Layout from '../components/layout-header';
import { useEffect, useState } from 'react';

export default function Carrito() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('/api/getCartItems'); // Asegúrate de crear este endpoint para recuperar los productos
                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                console.error('Error al recuperar los productos del carrito:', error);
            }
        };

        fetchCartItems();
    }, []);

    // Función para actualizar la cantidad de un producto en el carrito
    const updateQuantity = (productId, cantidad) => {
        const updatedCart = cartItems.map(item =>
            item.product_id === productId ? { ...item, cantidad } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Guardar en almacenamiento local
    };

    // Función para calcular el total
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price); // Asegurarse de que el precio es un número
            const cantidad = parseInt(item.cantidad, 10); // Asegurarse de que la cantidad es un número
            return total + (price * cantidad);
        }, 0).toFixed(2);
    };


    return (
        <div className={styles.body}>
            <Layout
                title="Mi carrito"
                description="Carrito de compra"
                icon="/img/carrito-icono.ico"
            />

            <div className={styles.divButtonLogin}>
                <Link href="/login">
                    <button className={styles.button}>Iniciar sesión</button>
                </Link>
            </div>

            <Link href="/" legacyBehavior>
                <button className={styles.buttonInicioLink}>
                    <div className={styles.divImage}>
                        <Image
                            src="/img/logo.png"
                            alt="logo del negocio"
                            width={190}
                            height={170}
                        />
                    </div>
                </button>
            </Link>

            <div className={styles.divh1}>
                <h1>Mi carrito de compras</h1>
            </div>

            <div className={styles.raya}>
                <p className={styles.raya}>‎</p>
            </div>

            {/* Mostrar productos en el carrito */}
            {cartItems.length > 0 ? (
                <div className={styles.cartItems}>
                    {cartItems.map((item) => (
                        <div key={item.product_id} className={styles.cartItem}>
                            <Image
                                src={`/img/souvenirs/Peluche de Navidad.png`}
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
                    <h2>Inicie sesión para poder ver su carrito de compra!</h2>
                </div>
            )}
        </div>
    );
}
