

import {
  Eye,
  MessageCircle,
  Star,
} from "lucide-react";

import Button from "../Button/Button";
import styles from "./ProductCard.module.css";

import { handleWhatsAppOrder } from "../../utils/whatsapp";
import { Hover } from "../../animations";

function ProductCard({ product }) {
  return (
    <Hover>
      <article className={styles.card}>

        <div className={styles.imageWrapper}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className={styles.image}
              loading="lazy"
            />
          ) : (
            <div className={styles.image} role="img" aria-label={product.name} />
          )}
        </div>

        <div className={styles.content}>

          <span className={styles.category}>
            {product.category}
          </span>

          <h3>{product.name}</h3>

          <div className={styles.rating} aria-label={`Rating: ${product.rating} out of 5`}>
            <Star
              size={16}
              strokeWidth={2}
              fill="currentColor"
              aria-hidden="true"
            />
            <span>{product.rating}</span>
          </div>

          <div className={styles.priceContainer}>
            {product.discountPrice ? (
              <>
                <span className={styles.discountPrice}>₹{product.discountPrice}</span>
                <span className={styles.originalPrice}>
                  <span className="visually-hidden">Original price: </span>
                  ₹{product.price}
                </span>
              </>
            ) : (
              <span className={styles.price}>₹{product.price}</span>
            )}
          </div>

          <div className={styles.buttons}>

            <Button
              to={`/product/${product.id}`}
              className={styles.link}
            >
              <Eye
                size={18}
                strokeWidth={2.2}
                aria-hidden="true"
              />
              View
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                handleWhatsAppOrder(product)
              }
            >
              <MessageCircle
                size={18}
                strokeWidth={2.2}
                aria-hidden="true"
              />
              Buy
            </Button>

          </div>

        </div>

      </article>
    </Hover>
  );
}

export default ProductCard;