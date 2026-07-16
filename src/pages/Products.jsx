import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

import ProductsHero from "../components/ProductsHero/ProductsHero";
import SearchFilter from "../components/SearchFilter/SearchFilter";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import Section from "../components/UI/Section";
import Button from "../components/Button/Button";
import EmptyState from "../components/UI/EmptyState/EmptyState";

import { getProducts } from "../services/productService";

import styles from "./Products.module.css";

import LoadingSpinner from "../components/UI/LoadingSpinner/LoadingSpinner";

function Products() {
  const [products, setProducts] =
    useState([]);

  const [searchParams] = useSearchParams();

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All Categories");

  const [sort, setSort] =
    useState("Sort By");

  useEffect(() => {
    const cat = searchParams.get("category");
    const q = searchParams.get("search");
    if (cat) {
      setCategory(cat);
    }
    if (q) {
      setSearch(q);
    }
  }, [searchParams]);

  useEffect(() => {
    let active = true;
    getProducts()
      .then((data) => {
        if (active) {
          setProducts(data);
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
  }, []);


  const filteredProducts =
    useMemo(() => {

      let data = [...products];

      data = data.filter((product) =>
        product.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );

      if (
        category !== "All Categories"
      ) {
        data = data.filter(
          (product) =>
            product.category === category
        );
      }

      switch (sort) {

        case "Price: Low to High":
          data.sort(
            (a, b) =>
              a.price - b.price
          );
          break;

        case "Price: High to Low":
          data.sort(
            (a, b) =>
              b.price - a.price
          );
          break;

        case "Highest Rating":
          data.sort(
            (a, b) =>
              b.rating - a.rating
          );
          break;

        default:
          break;

      }

      return data;

    }, [
      products,
      search,
      category,
      sort,
    ]);

  const categories = [
    "All Categories",
    ...new Set(
      products.map(
        (product) => product.category
      )
    ),
  ];

  const resetFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setSort("Sort By");
  };

  const isFiltered =
    search ||
    category !== "All Categories" ||
    sort !== "Sort By";

  return (
    <>
      <ProductsHero />

      <Section>

        <SearchFilter
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
          categories={categories}
        />

        <div className={styles.topBar}>

          <p className={styles.resultText}>
            Showing
            <strong>
              {" "}
              {filteredProducts.length}{" "}
            </strong>
            Product
            {filteredProducts.length !== 1
              ? "s"
              : ""}
          </p>

          {isFiltered && (
            <Button
              variant="secondary"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          )}

        </div>

            {loading ? (
        <LoadingSpinner text="Loading Products..." />
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          title="No Products Found"
          description="Try changing your search or filters."
        />
      ) : (
        <ProductGrid
          products={filteredProducts}
        />
      )}

      </Section>
    </>
  );
}

export default Products;