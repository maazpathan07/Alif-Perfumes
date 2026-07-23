import { Link } from "react-router-dom";
import SEO from "../components/SEO/SEO";

function NotFound() {
  return (
    <main id="main-content" style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "60px 20px" }}>
      <SEO
        title="404 Page Not Found"
        description="The page you are looking for does not exist."
        robots="noindex, nofollow"
      />
      <span style={{ fontSize: "64px", marginBottom: "16px" }} aria-hidden="true">🕌</span>
      <h1 style={{ fontSize: "36px", color: "var(--primary)", marginBottom: "12px", fontFamily: "'Playfair Display', Georgia, serif" }}>
        404 — Page Not Found
      </h1>
      <p style={{ fontSize: "16px", color: "var(--text-light)", maxWidth: "460px", marginBottom: "28px" }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          to="/"
          style={{ padding: "12px 24px", background: "var(--primary)", color: "#fff", borderRadius: "12px", textDecoration: "none", fontWeight: 600 }}
        >
          Return to Home
        </Link>
        <Link
          to="/products"
          style={{ padding: "12px 24px", background: "rgba(26, 122, 88, 0.08)", color: "var(--primary)", borderRadius: "12px", textDecoration: "none", fontWeight: 600 }}
        >
          Browse Products
        </Link>
      </div>
    </main>
  );
}

export default NotFound;