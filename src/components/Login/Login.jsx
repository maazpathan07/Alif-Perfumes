import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";

import { signInWithEmailAndPassword } from "firebase/auth";

import toast from "react-hot-toast";

import { auth } from "../../services/firebase";

import Button from "../Button/Button";

import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    setLoading(true);

    try {

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      toast.success(
        "Welcome back, Admin!"
      );

      navigate("/dashboard", {
        replace: true,
      });

    } catch (err) {

      switch (err.code) {

        case "auth/invalid-credential":

          setError(
            "Invalid email or password."
          );

          toast.error(
            "Invalid email or password."
          );

          break;

        case "auth/user-not-found":

          setError(
            "Admin account not found."
          );

          toast.error(
            "Admin account not found."
          );

          break;

        case "auth/wrong-password":

          setError(
            "Incorrect password."
          );

          toast.error(
            "Incorrect password."
          );

          break;

        case "auth/too-many-requests":

          setError(
            "Too many attempts. Please try again later."
          );

          toast.error(
            "Too many attempts. Please try again later."
          );

          break;

        default:

          setError(
            "Login failed."
          );

          toast.error(
            "Login failed."
          );

      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <section className={styles.login}>

      <div className={styles.card}>

        <div className={styles.header}>

          <h1>Admin Login</h1>

          <p>
            Sign in to access the
            Alif Perfumes Admin Dashboard.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >

          <div className={styles.inputGroup}>

            <label>Email Address</label>

            <div className={styles.inputBox}>

              <Mail size={20} />

              <input
                type="email"
                placeholder="admin@alifperfumes.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

          </div>

          <div className={styles.inputGroup}>

            <label>Password</label>

            <div className={styles.inputBox}>

              <Lock size={20} />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className={styles.eye}
                aria-label={
                  showPassword
                    ? "Hide Password"
                    : "Show Password"
                }
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {error && (
            <p className={styles.error}>
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
          >

            <LogIn size={18} />

            &nbsp;

            {loading
              ? "Signing In..."
              : "Login"}

          </Button>

        </form>

      </div>

    </section>
  );
}

export default Login;