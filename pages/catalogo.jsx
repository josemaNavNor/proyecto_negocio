import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Modal from './modal';
import Layout from '../components/layout';

export default function Catalogo() {
  const images = ['/img/slide1.jpeg', '/img/slide2.jpeg', '/img/slide3.jpeg']; // Rutas de las imágenes del carrusel
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);  // Estado para el producto seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false);  // Estado para abrir/cerrar el modal

  const products = [
    { id: 1, name: 'Producto 1', price: '50.00', image: '/img/products/p1.jpeg' },
    { id: 2, name: 'Producto 2', price: '155.00', image: '/img/products/p2.jpeg' },
    { id: 3, name: 'Producto 3', price: '1255.00', image: '/img/products/p3.jpeg' },
    { id: 4, name: 'Producto 4', price: '20555.00', image: '/img/products/p4.jpeg' }
  ];  // Lista de producto

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

  return (
    <div className={styles.body}>
      <Layout
        title="Catalogo"
        description="Pagina principal"
      >
        {/* Puedes incluir el contenido del Layout aquí si es necesario */}
      </Layout>

      <div className={styles.info}>
        <Link href="/login"> {/* Asegúrate de que el enlace apunte a la página correcta */}
          <button className={styles.button}>Iniciar sesión</button>
        </Link>
        <Link href="/carrito"> {/* Asegúrate de que el enlace apunte a la página correcta */}
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
          width={170}
          height={100}
        />
      </div>

      <div className={styles.nav}>
        {['Invitaciones', 'Souvenirs', 'Papelería', 'Creativa', 'Recuerdos'].map((item, index) => (
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
          <div key={product.id} className={styles.product} onClick={() => handleProductClick(product)} role="button" tabIndex={0} onKeyPress={(e) => { if (e.key === 'Enter') handleProductClick(product); }}>
            <Image
              src={product.image}
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
