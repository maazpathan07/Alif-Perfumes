import {
  useEffect,
  useState,
} from "react";

import {
  Package,
  Grid2X2,
  Star,
  TrendingUp,
} from "lucide-react";

import { getDashboardStats } from "../../../../services/dashboardService";

import styles from "./StatsCards.module.css";

function StatsCards() {
  const [stats, setStats] =
    useState({
      totalProducts: 0,
      totalCategories: 0,
      featuredProducts: 0,
    });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const data =
        await getDashboardStats();

      setStats(data);

    } catch (error) {

      console.error(error);

    }
  }

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
      title: "Featured",
      value: stats.featuredProducts,
      icon: <Star size={28} />,
    },
    {
      title: "Growth",
      value: "--",
      icon: <TrendingUp size={28} />,
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