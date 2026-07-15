import { useEffect, useState } from "react";
import { getOrders } from "../../../../services/orderService";
import styles from "./RecentOrders.module.css";

function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getOrders()
      .then((data) => {
        if (active) {
          setOrders(data.slice(0, 5));
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (loading) return null;

  return (
    <div className={styles.card}>
      <h2>Recent Lead Enquiries</h2>
      {orders.length === 0 ? (
        <p className={styles.empty}>No Enquiries Logged Yet</p>
      ) : (
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600 }}>{order.productName}</td>
                  <td>₹{order.price}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        order.status === "Completed"
                          ? styles.statusCompleted
                          : order.status === "Cancelled"
                          ? styles.statusCancelled
                          : styles.statusPending
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </td>
                  <td className={styles.date}>
                    {order.timestamp?.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RecentOrders;
