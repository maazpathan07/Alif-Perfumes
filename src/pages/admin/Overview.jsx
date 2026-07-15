import StatsCards from "../../components/Admin/Overview/StatsCards/StatsCards";
import RecentProducts from "../../components/Admin/Overview/RecentProducts/RecentProducts";
import RecentOrders from "../../components/Admin/Overview/RecentOrders/RecentOrders";

function Overview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <StatsCards />
      <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
        <RecentProducts />
        <RecentOrders />
      </div>
    </div>
  );
}

export default Overview;