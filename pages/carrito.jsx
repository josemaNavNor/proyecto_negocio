import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LayoutCarrito from '../components/layout-carrito'
import Image from "next/image"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import styles from "../styles/Login.module.css"
import Swal from 'sweetalert2'
import { query } from '../lib/db'

export async function getStaticProps() {
    const products = await query('SELECT name, category_id FROM product')

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        },
    }
}

export default function Carrito({ products }) {
    const [isRegistered, setIsRegistered] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const email = localStorage.getItem('userEmail');
            const password = localStorage.getItem('userPassword');
            if (!email || !password) {
                router.push('/login');
                return;
            }

            try {
                const response = await fetch('/api/checkUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (data.success) {
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
                const email = localStorage.getItem('userEmail')

                try {
                    const response = await fetch(`/api/getCartItems?email=${encodeURIComponent(email)}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`)
                    }

                    const data = await response.json()
                    setCartItems(data)
                    updateTotalAmount(data)
                } catch (error) {
                    console.error('Error al recuperar los productos del carrito:', error)
                }
            }

            fetchCartItems()
        }
    }, [isRegistered])

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return

        const updatedCart = cartItems.map(item =>
            item.product_id === productId ? { ...item, cantidad: newQuantity } : item
        )
        setCartItems(updatedCart)
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        updateTotalAmount(updatedCart)
    }

    const updateTotalAmount = (items) => {
        const total = items.reduce((sum, item) => {
            const price = parseFloat(item.price)
            const cantidad = parseInt(item.cantidad, 10)
            return sum + (price * cantidad)
        }, 0).toFixed(2)
        setTotalAmount(total)
    }

    const removeItem = async (productId) => {
        try {
            const email = localStorage.getItem('userEmail')

            const response = await fetch('/api/removeFromCart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, productId }),
            })

            if (response.ok) {
                const updatedCart = cartItems.filter(item => item.product_id !== productId)
                setCartItems(updatedCart)
                localStorage.setItem("cart", JSON.stringify(updatedCart))
                updateTotalAmount(updatedCart)
                Swal.fire({
                    icon: 'success',
                    title: 'Producto eliminado',
                    text: 'El producto ha sido eliminado del carrito.',
                })
            } else {
                const data = await response.json()
                console.error('Error al eliminar el producto del carrito:', data)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message || 'Hubo un problema al eliminar el producto del carrito.',
                })
            }
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al eliminar el producto del carrito.',
            })
        }
    }

    const handlePaymentSuccess = async (details) => {
        const email = localStorage.getItem('userEmail')

        try {
            const response = await fetch('/api/registrarOrden', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, cartItems, totalAmount }),
            })

            if (response.ok) {
                const updateInventoryResponse = await fetch('/api/updateInventory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cartItems }),
                })

                if (updateInventoryResponse.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Pago completado!',
                        text: 'Tu compra ha sido realizada exitosamente.',
                    })
                    console.log('Transaction completed by', details.payer.name.given_name)
                } else {
                    const data = await updateInventoryResponse.json()
                    console.error('Error al actualizar la existencia:', data)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message || 'Hubo un problema al actualizar la existencia.',
                    })
                }
            } else {
                const data = await response.json()
                console.error('Error al registrar la orden:', data)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message || 'Hubo un problema al registrar la orden.',
                })
            }
        } catch (error) {
            console.error('Error al manejar el pago:', error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al manejar el pago.',
            })
        }
    }

    if (!isRegistered) {
        return (
            <LayoutCarrito nombreCategoria="Mi carrito">
                <div className={styles.divh1}>
                    <h2>Necesitas iniciar sesión primero.</h2>
                </div>
            </LayoutCarrito>
        )
    }

    return (
        <LayoutCarrito nombreCategoria="Mi carrito">
            <div className={styles.body}>
                {cartItems.length > 0 ? (
                    <div className={styles.cartItems}>
                        {cartItems.map((item) => (
                            <div key={item.product_id} className={styles.cartItem}>
                                <Image
                                    src={`/img/${item.name}.png`}
                                    alt={item.name}
                                    width={100}
                                    height={100}
                                    className={styles.productImage}
                                />
                                <p className={styles.productName}>Nombre: {item.name}</p>
                                <p className={styles.productPrice}>Precio: ${item.price}</p>
                                <p>Has agregado {item.cantidad} de {item.name} al carrito</p>
                                <button className={styles.removeButton} onClick={() => removeItem(item.product_id)}>Eliminar</button>
                            </div>
                        ))}
                        <div className={styles.totalContainer}>
                            <h3>Total: ${totalAmount}</h3>
                        </div>
                        <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
                            <PayPalButtons
                                style={{ layout: 'vertical' }}
                                createOrder={async (data, actions) => {
                                    try {
                                        // Llamada a la API para validar existencias
                                        const response = await fetch('/api/checkStock', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ cartItems }),
                                        });

                                        const result = await response.json();

                                        if (!response.ok) {
                                            const issues = Object.entries(result.results || {})
                                                .map(([id, issue]) => `Producto ID ${id}: ${issue}`)
                                                .join('\n');
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Error de existencias',
                                                text: `No se puede proceder con el pago:\n${issues}`,
                                            });
                                            return Promise.reject(); // Detiene el flujo de creación de orden
                                        }

                                        // Continuar con la creación de la orden
                                        return actions.order.create({
                                            purchase_units: [{
                                                amount: { value: totalAmount },
                                            }],
                                        });
                                    } catch (error) {
                                        console.error('Error al verificar existencias:', error);
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Error',
                                            text: 'No se pudo verificar las existencias. Intenta nuevamente más tarde.',
                                        });
                                        return Promise.reject(); // Detiene el flujo
                                    }
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then(async (details) => {
                                        try {
                                            await handlePaymentSuccess(details);
                                            Swal.fire({
                                                icon: 'success',
                                                title: '¡Pago completado!',
                                                text: 'Tu compra ha sido realizada exitosamente.',
                                            });
                                        } catch (error) {
                                            console.error('Error al manejar el pago:', error);
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Error',
                                                text: 'Hubo un problema al registrar la orden.',
                                            });
                                        }
                                    });
                                }}
                            />
                        </PayPalScriptProvider>
                    </div>
                ) : (
                    <div className={styles.divh1}>
                        <h2>No hay productos en el carrito.</h2>
                    </div>
                )}
            </div>
        </LayoutCarrito>
    )
}
