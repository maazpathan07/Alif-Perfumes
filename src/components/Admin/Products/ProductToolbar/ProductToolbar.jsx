import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Filter,
} from "lucide-react";

import { getCategories } from "../../../../services/categoryService";

import styles from "./ProductToolbar.module.css";

function ProductToolbar({
  search,
  setSearch,
  category,
  setCategory,
  onAdd,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let active = true;
    getCategories()
      .then((data) => {
        if (active) setCategories(data);
      })
      .catch((err) => console.error("Failed to load categories in toolbar:", err));
    return () => { active = false; };
  }, []);

  return (
    <section className={styles.toolbar}>

      <div className={styles.left}>

        <h1>Products</h1>

        <p>
          Manage all your store products.
        </p>

      </div>

      <div className={styles.right}>

        <div className={styles.searchBox}>

          <Search size={18} />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <select
          className={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All Categories">All Categories</option>
          {(categories.length > 0 ? categories.map(c => c.name) : ["Arabic Perfumes", "Attars", "Bakhoor", "Gift Sets"]).map((catName) => (
            <option key={catName} value={catName}>
              {catName}
            </option>
          ))}
        </select>

        <button
          className={styles.filter}
          type="button"
        >
          <Filter size={18} />
        </button>

        <button
          className={styles.add}
          type="button"
          onClick={onAdd}
        >

          <Plus size={18} />

          Add Product

        </button>

      </div>

    </section>
  );
}

export default ProductToolbar;