import Layout from '../components/layout-header'; // Encabezado
import LayoutProducto from '../components/layout-productos'; // Diseño de productos
import { query } from '../lib/db';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';

// Función para generar rutas estáticas para productos
export async function getStaticPaths() {
    const rows = await query('SELECT product_id FROM product');
    const paths = rows.map((product) => ({
        params: { id: product.product_id.toString() },
    }));

    return { paths, fallback: false };
}

// Función para obtener datos del producto
export async function getStaticProps({ params }) {
    const rows = await query('SELECT * FROM product WHERE product_id = ?', [params.id]);
    const product = JSON.parse(JSON.stringify(rows[0]));
    return { props: { product } };
}

// Componente principal
export default function ProductoDetalle({ product }) {
    const router = useRouter();
    const [isAdded, setIsAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Asignación de categoría por ID
    const categoryNames = ['Invitaciones', 'Souvenirs', 'Papelería', 'Creativa', 'Recuerdos'];
    const category_name = categoryNames[product.category_id - 1] || 'Otros';

    // Manejar adición al carrito
    const addToCart = async () => {
        const email = localStorage.getItem('userEmail'); // Obtener email del almacenamiento local
        if (!email) {
            router.push('/login'); // Redirigir al login si no está logeado
            return;
        }

        const payload = {
            email,
            producto_id: product.product_id,
            cantidad: quantity,
        };

        // Registrar los datos enviados al servidor
        console.log('Datos enviados al servidor:', payload);

        try {
            const response = await fetch('/api/addToCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (data.message === 'Producto agregado al carrito') {
                setIsAdded(true);
                Swal.fire({
                    icon: 'success',
                    title: '¡Producto agregado!',
                    text: `El producto ${product.name} ha sido agregado al carrito.`,
                });
            } else {
                console.error('Error en la respuesta del servidor:', data);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message || 'Hubo un problema al agregar el producto al carrito.',
                });
            }
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al agregar el producto al carrito.',
            });
        }
    };

    return (
        <LayoutProducto nombreCategoria={category_name}>
            <Layout title={product.name} description={product.description} icon="/img/icon.ico" />
            <div className={styles.body}>
                <h1>{product.name}</h1>
                <Image
                    src={`/img/${category_name}/${product.name}.png`}
                    alt={product.name}
                    width={200}
                    height={200}
                />
                <p>Precio: ${product.price}</p>
                <p>Descripción: {product.description}</p>
                <p>Tamaño: {product.size}</p>

                <div className={styles.quantityContainer}>
                    <label htmlFor="quantity">Cantidad:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        min="1"
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className={styles.quantityInput}
                    />
                </div>

                <div className={styles.GridButtonLogin}>
                    <button className={styles.buttonAddToCart} onClick={addToCart}>
                        {isAdded ? 'Agregado' : 'Agregar al carrito'}
                    </button>
                </div>
            </div>
        </LayoutProducto>
    );
}
