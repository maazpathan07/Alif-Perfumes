import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Admin/Sidebar/Sidebar";
import Topbar from "../components/Admin/Topbar/Topbar";

import styles from "./AdminLayout.module.css";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

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

        <main className={styles.main}>
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

    </div>
  );
}

export default AdminLayout;