import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  Grid2x2,
  ShoppingCart,
  MessageSquare,
  Settings,
  X,
} from "lucide-react";

import styles from "./Sidebar.module.css";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Products",
    path: "/dashboard/products",
    icon: <Package size={20} />,
  },
  {
    name: "Categories",
    path: "/dashboard/categories",
    icon: <Grid2x2 size={20} />,
  },
  {
    name: "Orders",
    path: "/dashboard/orders",
    icon: <ShoppingCart size={20} />,
  },
  {
    name: "Testimonials",
    path: "/dashboard/testimonials",
    icon: <MessageSquare size={20} />,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <Settings size={20} />,
  },
];

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`${styles.sidebar} ${
        sidebarOpen ? styles.open : ""
      }`}
    >
      {/* Logo */}
      <div className={styles.logo}>

        <button
          className={styles.closeButton}
          onClick={() =>
            setSidebarOpen(false)
          }
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        <div className={styles.logoIcon}>A</div>

        <h2>ALIF PERFUMES</h2>

        <span>Admin Panel</span>

      </div>

      {/* Navigation */}
      <nav className={styles.nav}>

        {menuItems.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/dashboard"}
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${styles.link} ${
                isActive
                  ? styles.active
                  : ""
              }`
            }
          >
            {item.icon}

            <span>{item.name}</span>

          </NavLink>

        ))}

      </nav>

      {/* Footer Status Badge */}
      <div className={styles.footer}>
        <div className={styles.footerBadge}>
          <div className={styles.footerDot} />
          <div className={styles.footerText}>
            <strong>Alif Perfumes</strong>
            System Active
          </div>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;