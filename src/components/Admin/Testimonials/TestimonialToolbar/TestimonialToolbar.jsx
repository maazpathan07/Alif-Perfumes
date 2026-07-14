import {
  Search,
  Plus,
  Filter,
} from "lucide-react";

import styles from "./TestimonialToolbar.module.css";

function TestimonialToolbar({ onAdd }) {
  return (
    <section className={styles.toolbar}>

      <div className={styles.left}>

        <h1>Testimonials</h1>

        <p>
          Manage customer reviews and testimonials.
        </p>

      </div>

      <div className={styles.right}>

        <div className={styles.searchBox}>

          <Search size={18} />

          <input
            type="text"
            placeholder="Search testimonials..."
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

          Add Testimonial

        </button>

      </div>

    </section>
  );
}

export default TestimonialToolbar;