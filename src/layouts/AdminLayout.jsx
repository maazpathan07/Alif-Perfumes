import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/Admin/Sidebar/Sidebar";
import Topbar from "../components/Admin/Topbar/Topbar";
import InactivityWarning from "../components/Admin/InactivityWarning/InactivityWarning";
import { useInactivityLogout } from "../hooks/useInactivityLogout";

import styles from "./AdminLayout.module.css";

function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const { showWarning, secondsLeft, stayLoggedIn } =
    useInactivityLogout();

  return (
    <div className={styles.layout}>

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className={styles.content}>

        <Topbar
          setSidebarOpen={setSidebarOpen}
        />

        <main className={styles.main} key={location.pathname}>
          <Outlet />
        </main>

      </div>

      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {showWarning && (
        <InactivityWarning
          secondsLeft={secondsLeft}
          onStay={stayLoggedIn}
        />
      )}

    </div>
  );
}

export default AdminLayout;