import { useMemo, useState } from "react";

import ProductsHero from "../ProductsHero/ProductsHero";
import SearchFilter from "../SearchFilter/SearchFilter";
import ProductGrid from "../ProductGrid/ProductGrid";
import Section from "../UI/Section";

import products from "../../data/products";

function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("Sort By");

  const filteredProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    let filtered = [...products];

    // Search
    if (searchTerm) {
      filtered = filtered.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm)
        );
      });
    }

    // Category
    if (category !== "All Categories") {
      filtered = filtered.filter(
        (product) => product.category === category
      );
    }

    // Sort
    switch (sort) {
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "Highest Rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;

      default:
        break;
    }

    return filtered;
  }, [search, category, sort]);

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
        />

        <ProductGrid
          products={filteredProducts}
        />

      </Section>
    </>
  );
}

export default Products;