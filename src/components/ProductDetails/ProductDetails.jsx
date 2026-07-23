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
import SEO from "../SEO/SEO";

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
        <SEO title="Product Not Found" robots="noindex, nofollow" />
        <Reveal>

          <div className={styles.notFound}>

            <h1>
              Product Not Found
            </h1>

            <p>
              The product you&apos;re looking for does not exist.
            </p>

          </div>

        </Reveal>
      </Section>
    );
  }

  const productJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": product.image ? [product.image] : [],
      "category": product.category,
      "offers": {
        "@type": "Offer",
        "price": product.discountPrice || product.price,
        "priceCurrency": "INR",
        "availability": product.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "url": `https://alif-perfumes-b88e8.web.app/product/${product.id}`
      },
      ...(product.rating ? {
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": product.rating,
          "reviewCount": product.totalReviews || 1
        }
      } : {})
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://alif-perfumes-b88e8.web.app/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Products",
          "item": "https://alif-perfumes-b88e8.web.app/products"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": product.name,
          "item": `https://alif-perfumes-b88e8.web.app/product/${product.id}`
        }
      ]
    }
  ];

  return (
    <>
      <SEO
        title={product.name}
        description={product.description || `Buy ${product.name} luxury Arabic perfume at ALIF PERFUMES.`}
        canonical={`/product/${product.id}`}
        ogType="product"
        ogImage={product.image}
        jsonLd={productJsonLd}
      />
      <Section>

        <div className={styles.details}>

          <Reveal direction="left">

            <Hover>

              <div className={styles.imageBox}>

                {(product.image && product.image.trim() !== "") ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                ) : (
                  <div role="img" aria-label={product.name} />
                )}

              </div>

            </Hover>

          </Reveal>

          <Reveal direction="right">

            <div className={styles.content}>

              <span className={styles.category}>
                {product.category}
              </span>

              <h1>{product.name}</h1>

              <div className={styles.rating} aria-label={`Rating: ${product.rating} out of 5, ${product.totalReviews || 0} reviews`}>

                <Star
                  size={18}
                  fill="currentColor"
                  aria-hidden="true"
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
                    <p className={styles.currentPrice}>
                      <span className="visually-hidden">Current price: </span>
                      ₹{product.discountPrice}
                    </p>

                    <span className={styles.oldPrice}>
                      <span className="visually-hidden">Original price: </span>
                      ₹{product.price}
                    </span>
                  </>
                ) : (
                  <p className={styles.currentPrice}>
                    ₹{product.price}
                  </p>
                )}

              </div>

              <p>
                {product.description}
              </p>

              {(product.topNotes || product.middleNotes || product.baseNotes) && (
                <div className={styles.notesSection}>
                  <h2>Fragrance Profile</h2>
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
                      aria-hidden="true"
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
                  aria-hidden="true"
                />

                {product.inStock
                  ? "Buy on WhatsApp"
                  : "Out of Stock"}

              </Button>

            </div>

          </Reveal>

        </div>

      </Section>

      <RelatedProducts
        currentProductId={product.id}
        category={product.category}
      />
    </>
  );
}

export default ProductDetails;