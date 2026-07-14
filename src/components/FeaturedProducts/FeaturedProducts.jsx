import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { getProducts } from "../../services/productService";

import ProductCard from "../ProductCard/ProductCard";
import Section from "../UI/Section";
import Title from "../UI/Title";

import styles from "./FeaturedProducts.module.css";

function FeaturedProducts() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data =
        await getProducts();

      setProducts(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  const featuredProducts =
    useMemo(() => {

      return products
        .filter(
          (product) =>
            product.featured &&
            product.inStock
        )
        .slice(0, 8);

    }, [products]);

  if (loading) {
    return null;
  }

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <Section>

      <Title
        title="Featured Products"
        subtitle="Discover our best selling luxury fragrances."
      />

      <div className={styles.grid}>

        {featuredProducts.map(
          (product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          )
        )}

      </div>

    </Section>
  );
}

export default FeaturedProducts;