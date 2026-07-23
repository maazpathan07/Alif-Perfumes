import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Hover } from "../../animations";

import styles from "./CategoryCard.module.css";

function CategoryCard({ category }) {
  return (
    <Hover>

      <Link
        to={`/products?category=${encodeURIComponent(category.name)}`}
        className={styles.card}
      >

        <div className={styles.image}>

          {category.image ? (
            <img
              src={category.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
          ) : (
            <span aria-hidden="true">🧴</span>
          )}

        </div>

        <div className={styles.content}>

          <h3>{category.name}</h3>

          {category.description && (
            <p>{category.description}</p>
          )}

          <span className={styles.link}>

            Explore

            <ArrowRight
              size={18}
              strokeWidth={2.2}
              aria-hidden="true"
            />

          </span>

        </div>

      </Link>

    </Hover>
  );
}

export default CategoryCard;