import React from 'react';
import styles from '../styles/Modal.module.css';
import Image from 'next/image';

export default function Modal({ product, closeModal }) {
  let category_name = '';

  if(product.category_id === 1){
    category_name = 'Invitaciones';
  } else if (product.category_id === 2){
    category_name = 'Souvenirs';
  } else if (product.category_id === 3){
    category_name = 'Papeleria';
  } else if (product.category_id === 4){
    category_name = 'Creativa';
  } else if (product.category_id === 5){
    category_name = 'Recuerdos';
  }

  const handleAddToCart = async (product) => {
    try {
        const response = await fetch('/api/addToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cliente_id: /* ID del cliente */"",
                producto_id: product.product_id,
                cantidad: 1, // Puedes ajustar la cantidad según el caso
            }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(`${product.name} agregado al carrito.`);
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        alert('Hubo un problema al agregar el producto al carrito');
    }
};

// Usa este botón en el componente de detalle del producto
<button onClick={() => handleAddToCart(product)}>Agregar al carrito</button>

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={closeModal}>X</button>
        <div className={styles.modalBody}>
          <Image
            src={`/img/${category_name}/${product.name}.png`} // Ajusta la ruta según sea necesario
            alt={product.name}
            width={200}
            height={200}
          />
          <h2>{product.name}</h2>
          <p>Precio: ${product.price}</p>
          <p>Descripcion: {product.description}</p>
          <p>Tamaño: {product.size}</p>
        </div>
      </div>
    </div>
  );
}


