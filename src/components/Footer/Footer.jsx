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

import { Link } from "react-router-dom";

import { Reveal } from "../../animations";
import useSettings from "../../hooks/useSettings";

import styles from "./Footer.module.css";

function Footer() {
  const { settings } = useSettings();

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">

        <Reveal>

          <div className={styles.grid}>

            {/* Brand */}

            <div>

              <h2>
                {settings?.businessName ||
                  "ALIF PERFUMES"}
              </h2>

              <p>
                {settings?.footerDescription ||
                  "Premium Arabic perfumes and Islamic lifestyle products crafted with quality, elegance and trust. Experience luxury fragrances delivered with simplicity."}
              </p>

            </div>

            {/* Quick Links */}

            <div>

              <h3>Quick Links</h3>

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

            </div>

            {/* Categories */}

            <div>

              <h3>Categories</h3>

              <p>Arabic Perfumes</p>

              <p>Attars</p>

              <p>Tasbeeh</p>

              <p>Islamic Caps</p>

              <p>Bakhoor</p>

              <p>Gift Sets</p>

            </div>

            {/* Contact */}

            <div>

              <h3>Contact</h3>

              <p>

                <MessageCircle
                  size={18}
                  strokeWidth={2.2}
                />

                {settings?.whatsapp ||
                  "+91 78743 78413"}

              </p>

              <p>

                <PhoneCall
                  size={18}
                  strokeWidth={2.2}
                />

                {settings?.whatsapp ||
                  "+91 78743 78413"}

              </p>

              <p>

                <Mail
                  size={18}
                  strokeWidth={2.2}
                />

                {settings?.email ||
                  "info@alifperfumes.com"}

              </p>

              <p>

                <MapPin
                  size={18}
                  strokeWidth={2.2}
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
                    aria-label="Instagram"
                  >
                    <FaInstagram size={18} />
                  </a>
                )}

                {settings?.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                  >
                    <FaFacebookF size={18} />
                  </a>
                )}

                {settings?.youtube && (
                  <a
                    href={settings.youtube}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                  >
                    <FaYoutube size={18} />
                  </a>
                )}

                {settings?.website && (
                  <a
                    href={settings.website}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Website"
                  >
                    <FaGlobe size={18} />
                  </a>
                )}

              </div>

            </div>

          </div>

        </Reveal>

        <div className={styles.bottom}>

          <p>

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