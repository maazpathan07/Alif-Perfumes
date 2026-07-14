import {
  Bell,
  Search,
  UserCircle,
  LogOut,
  Menu,
} from "lucide-react";

import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../../../services/firebase";

import styles from "./Topbar.module.css";

function Topbar({
  setSidebarOpen,
}) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header className={styles.topbar}>

      {/* Mobile Menu */}

      <button
        className={styles.menuButton}
        onClick={() =>
          setSidebarOpen(true)
        }
      >
        <Menu size={24} />
      </button>

      {/* Search */}

      <div className={styles.left}>

        <Search size={20} />

        <input
          type="text"
          placeholder="Search..."
        />

      </div>

      {/* Right */}

      <div className={styles.right}>

        <button className={styles.icon}>
          <Bell size={20} />
        </button>

        <div className={styles.profile}>

          <UserCircle size={34} />

          <div className={styles.profileInfo}>

            <h4>Admin</h4>

            <span>
              Alif Perfumes
            </span>

          </div>

        </div>

        <button
          className={styles.logout}
          onClick={handleLogout}
        >

          <LogOut size={18} />

          <span>Logout</span>

        </button>

      </div>

    </header>
  );
}

export default Topbar;