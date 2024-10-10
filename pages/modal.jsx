import React from 'react';
import styles from '../styles/Modal.module.css';
import Image from 'next/image';

export default function Modal({ product, closeModal }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={closeModal}>X</button>
        <div className={styles.modalBody}>
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
          />
          <h2>{product.name}</h2>
          <p>Precio: ${product.price}</p>
          <p>Invitacion para cumpleanos de infantes o preadolecentes.</p> {/* esto lo cambiare con el product.desc o product.description */}
        </div>
      </div>
    </div>
  );
}
