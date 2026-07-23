import { useState, useEffect, useRef } from "react";
import {
  Bell,
  UserCircle,
  LogOut,
  Menu,
  Settings,
  Shield,
  Clock,
  Monitor,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../services/firebase";
import styles from "./Topbar.module.css";

/* ── helpers ── */
function getBrowserName() {
  const ua = navigator.userAgent;
  if (ua.includes("Edg")) return "Microsoft Edge";
  if (ua.includes("OPR") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  return "Browser";
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/Mobi|Android|iPhone|iPad/i.test(ua)) return "Mobile";
  if (/Tablet|iPad/i.test(ua)) return "Tablet";
  return "Desktop";
}

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function formatLoginTime(date) {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function Topbar({ setSidebarOpen }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Session tracking
  const sessionStartRef = useRef(new Date());
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const browserName = useRef(getBrowserName());
  const deviceType = useRef(getDeviceType());
  const loginTimeStr = useRef(formatLoginTime(sessionStartRef.current));

  // Live session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds(Math.floor((Date.now() - sessionStartRef.current) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
        aria-label="Open sidebar menu"
      >
        <Menu size={24} aria-hidden="true" />
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
          <Bell size={20} aria-hidden="true" />
        </button>

        {/* Profile Dropdown Wrapper */}
        <div className={styles.profileContainer} ref={dropdownRef}>
          <button
            className={styles.profileTrigger}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            type="button"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            aria-label="User menu"
            onKeyDown={(e) => { if (e.key === 'Escape') setDropdownOpen(false); }}
          >
            <UserCircle size={32} aria-hidden="true" />
            <div className={styles.profileInfo}>
              <span>Admin</span>
              <span>Alif Perfumes</span>
            </div>
          </button>

          {dropdownOpen && (
            <div className={styles.dropdown} role="menu">
              {/* ── Active Session Info ── */}
              <div className={styles.sessionCard}>
                <div className={styles.sessionTop}>
                  <span className={styles.sessionName}>Alif Admin Panel</span>
                  <span className={styles.sessionBadge}>
                    <span className={styles.sessionDot} />
                    Active
                  </span>
                </div>
                <div className={styles.sessionRow}>
                  <Clock size={12} />
                  <span>Logged in at {loginTimeStr.current}</span>
                </div>
                <div className={styles.sessionRow}>
                  <Monitor size={12} />
                  <span>{deviceType.current} · {browserName.current}</span>
                </div>
                <div className={styles.sessionDuration}>
                  Session: <strong>{formatDuration(sessionSeconds)}</strong>
                </div>
              </div>
              <div className={styles.dropdownDivider} />
              
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/dashboard/settings");
                }}
                className={styles.dropdownItem}
                role="menuitem"
              >
                <Settings size={16} aria-hidden="true" />
                Store Settings
              </button>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/dashboard/settings?tab=security");
                }}
                className={styles.dropdownItem}
                role="menuitem"
              >
                <Shield size={16} aria-hidden="true" />
                Change Password
              </button>
              
              <div className={styles.dropdownDivider} />
              
              <button
                onClick={handleLogout}
                className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
                role="menuitem"
              >
                <LogOut size={16} aria-hidden="true" />
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