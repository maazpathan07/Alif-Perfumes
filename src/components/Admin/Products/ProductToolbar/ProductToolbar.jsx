import {
  Search,
  Plus,
  Filter,
} from "lucide-react";

import styles from "./ProductToolbar.module.css";

function ProductToolbar({ onAdd }) {
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
          />

        </div>

        <select className={styles.select}>

          <option>All Categories</option>

          <option>Arabic Perfumes</option>

          <option>Attars</option>

          <option>Bakhoor</option>

          <option>Gift Sets</option>

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