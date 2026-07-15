import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
  AlertCircle,
  Timer,
} from "lucide-react";

import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../services/firebase";

import styles from "./Login.module.css";

/* ─── Constants ─── */
const MAX_ATTEMPTS  = 5;
const LOCKOUT_MS    = 5 * 60 * 1000; // 5 minutes

/* ─── sessionStorage helpers ─── */
function getAttempts()    { return Number(sessionStorage.getItem("la") ?? 0); }
function setAttempts(n)   { sessionStorage.setItem("la", n); }
function getLockUntil()   { return Number(sessionStorage.getItem("lu") ?? 0); }
function setLockUntil(ts) { sessionStorage.setItem("lu", ts); }
function clearLockout()   { sessionStorage.removeItem("la"); sessionStorage.removeItem("lu"); }

function fmt(ms) {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function Login() {
  const navigate = useNavigate();

  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Lockout
  const [locked, setLocked]           = useState(false);
  const [lockRemaining, setLockRemaining] = useState(0);
  const [attempts, setAttemptState]    = useState(getAttempts());

  /* Countdown ticker */
  useEffect(() => {
    let interval;

    const tick = () => {
      const until = getLockUntil();
      const remaining = until - Date.now();
      if (remaining <= 0) {
        clearLockout();
        setLocked(false);
        setAttemptState(0);
        setLockRemaining(0);
        clearInterval(interval);
      } else {
        setLockRemaining(remaining);
      }
    };

    // Check on mount
    const until = getLockUntil();
    if (until && Date.now() < until) {
      setLocked(true);
      setLockRemaining(until - Date.now());
      interval = setInterval(tick, 500);
    }

    return () => clearInterval(interval);
  }, []);

  const startLockout = useCallback(() => {
    const until = Date.now() + LOCKOUT_MS;
    setLockUntil(until);
    setAttempts(MAX_ATTEMPTS);
    setAttemptState(MAX_ATTEMPTS);
    setLocked(true);
    setLockRemaining(LOCKOUT_MS);

    const interval = setInterval(() => {
      const remaining = until - Date.now();
      if (remaining <= 0) {
        clearLockout();
        setLocked(false);
        setAttemptState(0);
        setLockRemaining(0);
        clearInterval(interval);
      } else {
        setLockRemaining(remaining);
      }
    }, 500);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || locked) return;

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      clearLockout();
      setLoginSuccess(true);
      toast.success("Welcome back, Admin! 👋");
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2500);
    } catch (err) {
      const newAttempts = getAttempts() + 1;
      setAttempts(newAttempts);
      setAttemptState(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        startLockout();
        setError(`Too many failed attempts. Locked for 5 minutes.`);
        toast.error("Account temporarily locked.");
      } else {
        const remaining = MAX_ATTEMPTS - newAttempts;
        let msg = "";
        switch (err.code) {
          case "auth/invalid-credential":
          case "auth/wrong-password":
            msg = "Invalid email or password."; break;
          case "auth/user-not-found":
            msg = "Admin account not found."; break;
          case "auth/too-many-requests":
            msg = "Too many attempts. Try again later."; break;
          default:
            msg = "Login failed. Please try again.";
        }
        setError(msg);
        toast.error(msg);
      }
    } finally {
      if (!loginSuccess) {
        setLoading(false);
      }
    }
  };

  const attemptsLeft = MAX_ATTEMPTS - attempts;

  // Render Fullscreen Success Welcome Transition Screen
  if (loginSuccess) {
    return (
      <div className={styles.welcomeScreen}>
        <div className={styles.welcomeAuras}>
          <div className={styles.aura1} />
          <div className={styles.aura2} />
        </div>
        <div className={styles.welcomeContent}>
          <div className={styles.welcomeBadge}>🕌</div>
          <h1 className={styles.welcomeTitle}>Welcome to Alif Perfumes</h1>
          <p className={styles.welcomeSubtitle}>Authorized Admin Session Secured | Loading Panel...</p>
          <div className={styles.welcomeTrack}>
            <div className={styles.welcomeFill} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* ── Left Branding Panel ── */}
      <div className={styles.left}>
        <div className={styles.brandLogo}>🕌</div>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--secondary)", letterSpacing: "2px", fontSize: "28px", textTransform: "uppercase", marginBottom: "8px" }}>Alif Perfumes</h2>
        <p>
          Manage your luxury fragrance store with ease from a single dashboard.
        </p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <span>📦</span>
            <p>Manage Products & Inventory</p>
          </div>
          <div className={styles.feature}>
            <span>🗂️</span>
            <p>Organize Categories</p>
          </div>
          <div className={styles.feature}>
            <span>⚙️</span>
            <p>Control Store Settings</p>
          </div>
          <div className={styles.feature}>
            <span>💬</span>
            <p>Manage Customer Testimonials</p>
          </div>
        </div>
      </div>

      {/* ── Right Login Panel ── */}
      <div className={styles.right}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.iconWrap}>
              <ShieldCheck size={30} />
            </div>
            <h1>Admin Login</h1>
            <p>Sign in to access the Alif Perfumes Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Email */}
            <div className={styles.inputGroup}>
              <label htmlFor="login-email">Email Address</label>
              <div className={styles.inputBox}>
                <Mail size={18} />
                <input
                  id="login-email"
                  type="email"
                  placeholder="admin@alifperfumes.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={locked}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className={styles.inputGroup}>
              <label htmlFor="login-password">Password</label>
              <div className={styles.inputBox}>
                <Lock size={18} />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={locked}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.eye}
                  aria-label={showPassword ? "Hide" : "Show"}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={locked}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Attempts counter — show after first failure */}
            {!locked && attempts > 0 && attemptsLeft > 0 && (
              <div className={styles.attemptsBar}>
                <div
                  className={styles.attemptsTrack}
                  style={{ "--pct": `${(attemptsLeft / MAX_ATTEMPTS) * 100}%` }}
                />
                <span>
                  {attemptsLeft} attempt{attemptsLeft !== 1 ? "s" : ""} remaining
                </span>
              </div>
            )}

            {/* Error / Lockout message */}
            {error && (
              <div className={locked ? styles.lockoutBox : styles.errorBox}>
                {locked ? (
                  <>
                    <Timer size={16} />
                    <span>
                      Locked — try again in <strong>{fmt(lockRemaining)}</strong>
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={15} />
                    <span>{error}</span>
                  </>
                )}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading || locked}
            >
              {locked ? (
                <>
                  <Timer size={18} />
                  Locked · {fmt(lockRemaining)}
                </>
              ) : loading ? (
                "Signing In..."
              ) : (
                <>
                  <LogIn size={18} />
                  Login to Dashboard
                </>
              )}
            </button>
          </form>

          <p className={styles.footerText}>
            🔒 Session expires when you close this tab
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;