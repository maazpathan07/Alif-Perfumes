import { useEffect, useState } from "react";

import Section from "../UI/Section";
import Title from "../UI/Title";
import CategoryCard from "../CategoryCard/CategoryCard";

import { getCategories } from "../../services/categoryService";
import staticCategories from "../../data/categories";

import styles from "./Categories.module.css";

import useSettings from "../../hooks/useSettings";

function Categories() {
  const { settings } = useSettings();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getCategories()
      .then((data) => {
        if (active) {
          // Filter out inactive categories, sort by featured
          const sorted = data
            .filter((c) => c.isActive !== false)
            .sort((a, b) => Number(b.featured) - Number(a.featured));
          setCategories(sorted);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Failed to load database categories on homepage:", error);
        // Fallback to static data
        if (active) {
          const sortedStatic = staticCategories
            .filter((c) => c.isActive !== false)
            .sort((a, b) => Number(b.featured) - Number(a.featured));
          setCategories(sortedStatic);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  if (loading || categories.length === 0) {
    return null;
  }

  return (
    <Section>

      <Title
        title={settings?.categoriesTitle || "Shop by Category"}
        subtitle={settings?.categoriesSubtitle || "Explore our premium fragrance collections."}
      />

      <div className={styles.grid}>

        {categories.map((category) => (
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