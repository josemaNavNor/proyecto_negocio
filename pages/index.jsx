import { query } from '../lib/db';
import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Modal from '../components/modal';
import Layout from '../components/layout-header';

export async function getStaticProps() {
  const products = await query('SELECT product_id, name, price, description, size, category_id FROM product');

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default function Catalogo({ products }) {
  const images = ['/img/slide1.jpeg', '/img/slide2.jpeg', '/img/slide3.jpeg']; // Rutas de las imágenes del carrusel
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);  // Estado para el producto seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false);  // Estado para abrir/cerrar el modal
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async (email) => {
      try {
        const response = await fetch('/api/getUserName', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);
          setUserName(data.username);
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      fetchUserName(userEmail);
    }
  }, []);

  const nextSlide = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);  // Seleccionamos el producto al hacer clic
    setIsModalOpen(true);  // Abrimos el modal
  };

  const closeModal = () => {
    setIsModalOpen(false);  // Cerramos el modal
  };

  const getCategoryName = (category_id) => {
    switch(category_id) {
      case 1: return 'Invitaciones';
      case 2: return 'Souvenirs';
      case 3: return 'Papeleria';
      case 4: return 'Creativa';
      case 5: return 'Recuerdos';
      default: return 'Productos';
    }
  };

  return (
    <div className={styles.body}>
      <Layout
        title="Catálogo"
        description="Página principal del catálogo"
        icon="/img/icon.ico" // Cambia esta ruta si es necesario
      />
      <div className={styles.info}>
        {userName ? (
          <Link href="/userData">
            <button className={styles.button}>{userName}</button>
          </Link>
        ) : (
          <Link href="/login">
            <button className={styles.button}>Iniciar sesión</button>
          </Link>
        )}
        <Link href="/carrito">
          <button className={styles.button}>
            <Image
              src="/img/carrito.png"
              alt="Carrito"
              width={25}
              height={25}
            />
            Mi Carrito
          </button>
        </Link>
      </div>
      <div className={styles.divImage}>
        <Image
          src="/img/logo.png"
          alt="logo del negocio"
          width={200}
          height={170}
        />
      </div>
      <div className={styles.nav}>
        {['Invitaciones', 'Souvenirs', 'Papeleria', 'Creativa', 'Recuerdos'].map((item, index) => (
          <Link href={`/${item.toLowerCase()}`} key={index} className={styles.navItem}>
            <strong>{item}</strong>
          </Link>
        ))}
      </div>
      <div className={styles.search}>
        <form action=''>
          <input className={styles.inputText} type="text" name="buscar" id="buscar" placeholder='Buscar en el catalogo' />
          <button type="submit" className={styles.buttonSearch} aria-label="Buscar">
            <Image
              src="/img/buscar.png"
              alt="Buscar"
              width={25}
              height={25}
              className={styles.image}
            />
          </button>
        </form>
      </div>
      {/* Sección del carrusel */}
      <div className={styles.carouselContainer}>
        <div className={styles.carousel}>
          <button className={styles.carouselButton} onClick={prevSlide} aria-label="Anterior">❮</button>
          <div className={styles.imageContainer}>
            <Image
              src={images[currentImage]}
              alt={`Slide ${currentImage + 1}`}
              width={500}
              height={300}
              className={styles.carouselImage}
            />
          </div>
          <button className={styles.carouselButton} onClick={nextSlide} aria-label="Siguiente">❯</button>
        </div>
      </div>
      {/* Catálogo de productos */}
      <div className={styles.catalog}>
        {products.map((product) => (
          <div key={product.product_id} className={styles.product} onClick={() => handleProductClick(product)} role="button" tabIndex={0} onKeyPress={(e) => { if (e.key === 'Enter') handleProductClick(product); }}>
            <Image
              src={`/img/${getCategoryName(product.category_id)}/${product.name}.png`}
              alt={product.name}
              width={150}
              height={150}
              className={styles.productImage}
            />
            <p className={styles.productName}>{product.name}</p>
            <p className={styles.productPrice}>${product.price}</p>
          </div>
        ))}
      </div>
      {/* Modal */}
      {isModalOpen && <Modal product={selectedProduct} closeModal={closeModal} />}
    </div>
  );
}
