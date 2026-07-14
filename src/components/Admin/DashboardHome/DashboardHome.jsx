import {
  Package,
  Grid2x2,
  ShoppingCart,
  MessageSquare,
} from "lucide-react";

import styles from "./DashboardHome.module.css";

const stats = [
  {
    title: "Products",
    value: 0,
    icon: <Package size={28} />,
  },
  {
    title: "Categories",
    value: 0,
    icon: <Grid2x2 size={28} />,
  },
  {
    title: "Orders",
    value: 0,
    icon: <ShoppingCart size={28} />,
  },
  {
    title: "Testimonials",
    value: 0,
    icon: <MessageSquare size={28} />,
  },
];

function DashboardHome() {
  return (
    <>

      <div className={styles.header}>

        <h1>Dashboard</h1>

        <p>
          Welcome back! Here's an overview of your store.
        </p>

      </div>

      <div className={styles.grid}>

        {stats.map((item) => (
          <div
            key={item.title}
            className={styles.card}
          >

            <div className={styles.icon}>
              {item.icon}
            </div>

            <h2>{item.value}</h2>

            <span>{item.title}</span>

          </div>
        ))}

      </div>

    </>
  );
}

export default DashboardHome;