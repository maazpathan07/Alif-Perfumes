import ProductCard from "../ProductCard/ProductCard";
import { Reveal } from "../../animations";
import styles from "./ProductGrid.module.css";

function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <Reveal>
        <div className={styles.empty}>
          <h2>No Products Found</h2>

          <p>
            Try searching with another product name
            or category.
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product, index) => (
        <Reveal
          key={product.id}
          delay={index * 0.08}
        >
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}

export default ProductGrid;