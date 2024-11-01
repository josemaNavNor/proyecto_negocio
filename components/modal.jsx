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


