import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { getFeaturedProducts } from "../../services/productService";

import ProductCard from "../ProductCard/ProductCard";
import Section from "../UI/Section";
import Title from "../UI/Title";

import styles from "./FeaturedProducts.module.css";

import useSettings from "../../hooks/useSettings";

function FeaturedProducts() {
  const { settings } = useSettings();
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let active = true;
    getFeaturedProducts()
      .then((data) => {
        if (active) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);


  const featuredProducts =
    useMemo(() => {

      return products
        .filter(
          (product) =>
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
        title={settings?.featuredTitle || "Featured Products"}
        subtitle={settings?.featuredSubtitle || "Discover our best selling luxury fragrances."}
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