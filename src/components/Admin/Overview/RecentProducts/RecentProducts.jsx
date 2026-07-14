import {
  useEffect,
  useState,
} from "react";

import { getProducts } from "../../../../services/productService";

import styles from "./RecentProducts.module.css";

import EmptyState from "../../../UI/EmptyState/EmptyState";

function RecentProducts() {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();

      setProducts(data.slice(0, 5));

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.card}>

      <h2>Recent Products</h2>

      {products.length === 0 ? (
        <p>No Products Found</p>
      ) : (
        <table className={styles.table}>

          <thead>

            <tr>

              <th>Name</th>

              <th>Category</th>

              <th>Price</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr key={product.id}>

                <td>{product.name}</td>

                <td>{product.category}</td>

                <td>₹{product.price}</td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}

export default RecentProducts;