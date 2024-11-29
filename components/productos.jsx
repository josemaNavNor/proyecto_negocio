import styles from '../styles/Categoria.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Productos({ products, category }) {
  return (
    <div className={styles.gridContainer}>
      {products.map((product, index) => (
        <div key={index} className={styles.contenedor}>
          <h3 className={styles.h3}>{product.name}</h3>
          <div className={styles.imagenProducto}>
            <Image
              src={`/img/${category}/${product.name}.png`}
              alt={product.name}
              width={170}
              height={200}
            />
            <Link href={`/${product.product_id}`}>
              <button className={styles.buttonVerMas}>Ver detalles</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

