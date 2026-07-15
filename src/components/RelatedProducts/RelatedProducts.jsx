import {
  useEffect,
  useState,
} from "react";

import Section from "../UI/Section";
import ProductCard from "../ProductCard/ProductCard";

import { getProductsByCategory } from "../../services/productService";

import { Reveal } from "../../animations";

import styles from "./RelatedProducts.module.css";

function RelatedProducts({
  currentProductId,
  category,
}) {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let active = true;
    if (!category) {
      Promise.resolve().then(() => {
        setLoading(false);
      });
      return;
    }
    getProductsByCategory(category)
      .then((data) => {
        if (active) {
          const filtered = data.filter(
            (product) => product.id !== currentProductId
          );
          setProducts(filtered);
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
  }, [category, currentProductId]);


  if (loading) return null;

  const relatedProducts = products.slice(0, 4);

  if (relatedProducts.length === 0) {
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