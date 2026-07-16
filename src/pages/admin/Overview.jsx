import StatsCards from "../../components/Admin/Overview/StatsCards/StatsCards";
import RecentProducts from "../../components/Admin/Overview/RecentProducts/RecentProducts";
import RecentOrders from "../../components/Admin/Overview/RecentOrders/RecentOrders";
import styles from "./Overview.module.css";

function Overview() {
  return (
    <div className={styles.page}>
      <StatsCards />
      <div className={styles.bottomRow}>
        <RecentProducts />
        <RecentOrders />
      </div>
    </div>
  );
}

export default Overview;