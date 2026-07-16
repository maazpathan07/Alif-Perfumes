import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Star,
  MessageCircle,
  CircleCheck,
} from "lucide-react";

import Section from "../UI/Section";
import Button from "../Button/Button";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

import {
  Reveal,
  Hover,
} from "../../animations";

import {
  getProductById,
} from "../../services/productService";

import {
  handleWhatsAppOrder,
} from "../../utils/whatsapp";

import styles from "./ProductDetails.module.css";

function ProductDetails() {
  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    let active = true;
    getProductById(id)
      .then((selected) => {
        if (active) {
          setProduct(selected);
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
  }, [id]);



  if (loading) {
    return (
      <Section>
        <LoadingSpinner text="Loading Product..." />
      </Section>
    );
  }

  if (!product) {
    return (
      <Section>
        <Reveal>

          <div className={styles.notFound}>

            <h2>
              Product Not Found
            </h2>

            <p>
              The product you're looking for does not exist.
            </p>

          </div>

        </Reveal>
      </Section>
    );
  }

  return (
    <>
      <Section>

        <section className={styles.details}>

          <Reveal direction="left">

            <Hover>

              <div className={styles.imageBox}>

                <img
                  src={
                    product.image ||
                    "/placeholder-product.png"
                  }
                  alt={product.name}
                  loading="lazy"
                />

              </div>

            </Hover>

          </Reveal>

          <Reveal direction="right">

            <div className={styles.content}>

              <span className={styles.category}>
                {product.category}
              </span>

              <h1>{product.name}</h1>

              <div className={styles.rating}>

                <Star
                  size={18}
                  fill="currentColor"
                />

                <span>
                  {product.rating}
                </span>

                <small>
                  (
                  {product.totalReviews || 0}
                  {" "}Reviews)
                </small>

              </div>

              <div className={styles.priceBox}>

                {product.discountPrice ? (
                  <>
                    <h2>
                      ₹{product.discountPrice}
                    </h2>

                    <span className={styles.oldPrice}>
                      ₹{product.price}
                    </span>
                  </>
                ) : (
                  <h2>
                    ₹{product.price}
                  </h2>
                )}

              </div>

              <p>
                {product.description}
              </p>

              {(product.topNotes || product.middleNotes || product.baseNotes) && (
                <div className={styles.notesSection}>
                  <h3>Fragrance Profile</h3>
                  <div className={styles.notesGrid}>
                    {product.topNotes && (
                      <div className={styles.noteCard}>
                        <span className={styles.noteLabel}>Top Notes</span>
                        <p>{product.topNotes}</p>
                      </div>
                    )}
                    {product.middleNotes && (
                      <div className={styles.noteCard}>
                        <span className={styles.noteLabel}>Heart Notes</span>
                        <p>{product.middleNotes}</p>
                      </div>
                    )}
                    {product.baseNotes && (
                      <div className={styles.noteCard}>
                        <span className={styles.noteLabel}>Base Notes</span>
                        <p>{product.baseNotes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <ul>

                {(Array.isArray(product.features)
                  ? product.features
                  : String(
                      product.features || ""
                    )
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean)
                ).map((feature, index) => (

                  <li key={index}>

                    <CircleCheck
                      size={18}
                    />

                    <span>
                      {feature}
                    </span>

                  </li>

                ))}

              </ul>

              <Button
                onClick={() =>
                  handleWhatsAppOrder(product)
                }
                disabled={!product.inStock}
              >

                <MessageCircle
                  size={18}
                />

                {product.inStock
                  ? "Buy on WhatsApp"
                  : "Out of Stock"}

              </Button>

            </div>

          </Reveal>

        </section>

      </Section>

      <RelatedProducts
        currentProductId={product.id}
        category={product.category}
      />
    </>
  );
}

export default ProductDetails;