import {
  Plus,
  Search,
  Filter,
} from "lucide-react";

import styles from "./CategoryToolbar.module.css";

function CategoryToolbar({ onAdd }) {
  return (
    <section className={styles.toolbar}>

      <div className={styles.left}>

        <h1>Categories</h1>

        <p>
          Manage all your product categories.
        </p>

      </div>

      <div className={styles.right}>

        <div className={styles.searchBox}>

          <Search size={18} />

          <input
            type="text"
            placeholder="Search categories..."
          />

        </div>

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

          Add Category

        </button>

      </div>

    </section>
  );
}

export default CategoryToolbar;