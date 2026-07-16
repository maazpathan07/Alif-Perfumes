import { useState, useEffect, useRef } from "react";
import {
  Bell,
  Search,
  UserCircle,
  LogOut,
  Menu,
  Settings,
  Shield,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../services/firebase";
import styles from "./Topbar.module.css";

function Topbar({ setSidebarOpen }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className={styles.topbar}>
      {/* Mobile Menu */}
      <button
        className={styles.menuButton}
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Title / Brand Header text */}
      <div className={styles.left}>
        <button
          onClick={() => navigate("/dashboard")}
          className={styles.headerLabelBtn}
          title="Go to Dashboard Home"
          type="button"
        >
          Alif Admin Dashboard
        </button>
      </div>

      {/* Right Controls */}
      <div className={styles.right}>
        <button className={styles.icon} aria-label="Notifications">
          <Bell size={20} />
        </button>

        {/* Profile Dropdown Wrapper */}
        <div className={styles.profileContainer} ref={dropdownRef}>
          <button
            className={styles.profileTrigger}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            type="button"
          >
            <UserCircle size={32} />
            <div className={styles.profileInfo}>
              <h4>Admin</h4>
              <span>Alif Perfumes</span>
            </div>
          </button>

          {dropdownOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <h4>Alif Admin Panel</h4>
                <span>Active Session</span>
              </div>
              <div className={styles.dropdownDivider} />
              
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/dashboard/settings");
                }}
                className={styles.dropdownItem}
              >
                <Settings size={16} />
                Store Settings
              </button>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/dashboard/settings?tab=security");
                }}
                className={styles.dropdownItem}
              >
                <Shield size={16} />
                Change Password
              </button>
              
              <div className={styles.dropdownDivider} />
              
              <button
                onClick={handleLogout}
                className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;