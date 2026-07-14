import {
  useEffect,
  useState,
} from "react";

import Section from "../UI/Section";
import ProductCard from "../ProductCard/ProductCard";

import { getProducts } from "../../services/productService";

import { Reveal } from "../../animations";

import styles from "./RelatedProducts.module.css";

function RelatedProducts({
  currentProductId,
}) {
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

  if (loading) return null;

  const currentProduct =
    products.find(
      (product) =>
        product.id ===
        currentProductId
    );

  if (!currentProduct)
    return null;

  let relatedProducts =
    products.filter(
      (product) =>
        product.id !==
          currentProduct.id &&
        product.category ===
          currentProduct.category
    );

  if (
    relatedProducts.length < 4
  ) {
    const featuredProducts =
      products.filter(
        (product) =>
          product.id !==
            currentProduct.id &&
          !relatedProducts.some(
            (item) =>
              item.id ===
              product.id
          ) &&
          product.featured
      );

    relatedProducts = [
      ...relatedProducts,
      ...featuredProducts,
    ];
  }

  relatedProducts =
    relatedProducts.slice(0, 4);

  if (
    relatedProducts.length === 0
  ) {
    return null;
  }

  return (
    <Section>

      <Reveal>

        <section
          className={
            styles.related
          }
        >

          <h2>
            You May Also Like
          </h2>

          <div
            className={
              styles.grid
            }
          >

            {relatedProducts.map(
              (product) => (
                <ProductCard
                  key={
                    product.id
                  }
                  product={
                    product
                  }
                />
              )
            )}

          </div>

        </section>

      </Reveal>

    </Section>
  );
}

export default RelatedProducts;