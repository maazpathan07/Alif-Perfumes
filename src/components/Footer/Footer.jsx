import { useEffect, useState } from "react";
import {
  MessageCircle,
  PhoneCall,
  Mail,
  MapPin,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaGlobe,
} from "react-icons/fa6";

import { Link, useNavigate } from "react-router-dom";

import { Reveal } from "../../animations";
import useSettings from "../../hooks/useSettings";
import { getCategories } from "../../services/categoryService";

import styles from "./Footer.module.css";

function Footer() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let active = true;
    getCategories()
      .then((data) => {
        if (active) {
          const activeCats = data.filter((c) => c.isActive !== false);
          setCategories(activeCats);
        }
      })
      .catch((err) => console.error("Failed to load footer categories:", err));
    return () => {
      active = false;
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">

        <Reveal>

          <div className={styles.grid}>

            {/* Brand */}

            <div>

              <p className={styles.brandTitle}>
                {settings?.businessName ||
                  "ALIF PERFUMES"}
              </p>

              <p>
                {settings?.footerDescription ||
                  "Premium Arabic perfumes and Islamic lifestyle products crafted with quality, elegance and trust. Experience luxury fragrances delivered with simplicity."}
              </p>

            </div>

            {/* Quick Links */}

            <nav aria-label="Footer Quick Links">

              <h2>Quick Links</h2>

              <Link to="/">Home</Link>

              <Link to="/products">
                Products
              </Link>

              <Link to="/about">
                About
              </Link>

              <Link to="/contact">
                Contact
              </Link>

            </nav>

            {/* Categories */}

            <nav aria-label="Footer Categories">

              <h2>Categories</h2>

              {categories.length > 0 ? (
                categories.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                  >
                    {cat.name}
                  </Link>
                ))
              ) : (
                <>
                  <Link to="/products?category=Arabic%20Perfumes">Arabic Perfumes</Link>
                  <Link to="/products?category=Attars">Attars</Link>
                  <Link to="/products?category=Bakhoor">Bakhoor</Link>
                  <Link to="/products?category=Gift%20Sets">Gift Sets</Link>
                </>
              )}

            </nav>

            {/* Contact */}

            <div>

              <h2>Contact</h2>

              <p>

                <MessageCircle
                  size={18}
                  strokeWidth={2.2}
                  aria-hidden="true"
                />

                {settings?.whatsapp ||
                  "+91 78743 78413"}

              </p>

              <p>

                <PhoneCall
                  size={18}
                  strokeWidth={2.2}
                  aria-hidden="true"
                />

                {settings?.whatsapp ||
                  "+91 78743 78413"}

              </p>

              <p>

                <Mail
                  size={18}
                  strokeWidth={2.2}
                  aria-hidden="true"
                />

                {settings?.email ||
                  "info@alifperfumes.com"}

              </p>

              <p>

                <MapPin
                  size={18}
                  strokeWidth={2.2}
                  aria-hidden="true"
                />

                {settings?.address ||
                  "Surat, Gujarat"}

              </p>

              <div className={styles.social}>

                {settings?.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram (opens in new tab)"
                  >
                    <FaInstagram size={18} aria-hidden="true" />
                  </a>
                )}

                {settings?.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook (opens in new tab)"
                  >
                    <FaFacebookF size={18} aria-hidden="true" />
                  </a>
                )}

                {settings?.youtube && (
                  <a
                    href={settings.youtube}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube (opens in new tab)"
                  >
                    <FaYoutube size={18} aria-hidden="true" />
                  </a>
                )}

                {settings?.website && (
                  <a
                    href={settings.website}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Website (opens in new tab)"
                  >
                    <FaGlobe size={18} aria-hidden="true" />
                  </a>
                )}

              </div>

            </div>

          </div>

        </Reveal>

        <div className={styles.bottom}>

          <p
            onClick={(e) => {
              if (e.detail === 2) {
                navigate("/login");
              }
            }}
            title="ALIF PERFUMES"
            style={{ cursor: "default", userSelect: "none" }}
          >

            © {currentYear}{" "}

            {settings?.businessName ||
              "ALIF PERFUMES"}

            . All Rights Reserved.

          </p>

          <p>
            Made with ❤️ in India
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;