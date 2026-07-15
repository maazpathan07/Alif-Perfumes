import { Search } from "lucide-react";

import { Reveal } from "../../animations";

import styles from "./SearchFilter.module.css";

function SearchFilter({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  categories,
}) {
  return (
    <Reveal>

      <div className={styles.wrapper}>

        {/* Search */}

        <div className={styles.searchBox}>

          <Search
            size={18}
            strokeWidth={2.2}
            className={styles.icon}
          />

          <input
            type="search"
            placeholder="Search products..."
            className={styles.search}
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            aria-label="Search Products"
          />

        </div>

        {/* Category */}

        <div className={styles.selectBox}>
          <select
            className={styles.select}
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            aria-label="Select Category"
          >
            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}

        <div className={styles.selectBox}>
          <select
            className={styles.select}
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            aria-label="Sort Products"
          >
            <option value="Sort By">
              Sort By
            </option>
            <option value="Price: Low to High">
              Price: Low to High
            </option>
            <option value="Price: High to Low">
              Price: High to Low
            </option>
            <option value="Highest Rating">
              Highest Rating
            </option>
          </select>
        </div>


      </div>

    </Reveal>
  );
}

export default SearchFilter;