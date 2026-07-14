import { useMemo } from "react";

import Section from "../UI/Section";
import Title from "../UI/Title";
import CategoryCard from "../CategoryCard/CategoryCard";

import categories from "../../data/categories";

import styles from "./Categories.module.css";

function Categories() {
  const displayCategories = useMemo(() => {
    return categories
      .filter((category) => category.isActive)
      .sort((a, b) => Number(b.featured) - Number(a.featured));
  }, []);

  return (
    <Section>

      <Title
        title="Shop by Category"
        subtitle="Explore our premium fragrance collections."
      />

      <div className={styles.grid}>

        {displayCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}

      </div>

    </Section>
  );
}

export default Categories;