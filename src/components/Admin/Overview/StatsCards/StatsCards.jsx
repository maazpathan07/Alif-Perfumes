import {
  useEffect,
  useState,
} from "react";

import {
  Package,
  Grid2X2,
  ShoppingCart,
  MessageSquare,
} from "lucide-react";

import { getDashboardStats } from "../../../../services/dashboardService";

import styles from "./StatsCards.module.css";

function StatsCards() {
  const [stats, setStats] =
    useState({
      totalProducts: 0,
      totalCategories: 0,
      totalOrders: 0,
      totalTestimonials: 0,
    });

  useEffect(() => {
    let active = true;
    getDashboardStats()
      .then((data) => {
        if (active) {
          setStats(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      active = false;
    };
  }, []);


  const cards = [
    {
      title: "Products",
      value: stats.totalProducts,
      icon: <Package size={28} />,
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      icon: <Grid2X2 size={28} />,
    },
    {
      title: "Enquiries (WhatsApp)",
      value: stats.totalOrders,
      icon: <ShoppingCart size={28} />,
    },
    {
      title: "Testimonials",
      value: stats.totalTestimonials,
      icon: <MessageSquare size={28} />,
    },
  ];

  return (
    <div className={styles.grid}>

      {cards.map((item) => (

        <div
          key={item.title}
          className={styles.card}
        >

          <div className={styles.icon}>
            {item.icon}
          </div>

          <h2>{item.value}</h2>

          <p>{item.title}</p>

        </div>

      ))}

    </div>
  );
}

export default StatsCards;