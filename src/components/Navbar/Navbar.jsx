import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  MessageCircle,
  Menu,
  X,
} from "lucide-react";

import Button from "../Button/Button";
import { Hover } from "../../animations";
import useSettings from "../../hooks/useSettings";

import styles from "./Navbar.module.css";

import defaultLogo from "../../assets/logos/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const { settings } =
    useSettings();

  const handleWhatsApp = () => {
    const number =
      settings?.whatsapp ||
      "917874378413";

    window.open(
      `https://wa.me/${number}`,
      "_blank"
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    scrollToTop();
  };

  useEffect(() => {
    document.body.style.overflow =
      menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, [menuOpen]);

  return (
    <header className={styles.navbar}>
      <div className="container">

        {/* Logo */}

        <Hover
          scale={1.03}
          y={0}
        >
          <Link
            to="/"
            className={styles.logo}
            onClick={closeMenu}
          >
            <img
              src={
                settings?.logo ||
                defaultLogo
              }
              alt={
                settings?.businessName ||
                "Business Logo"
              }
            />

            <span>
              {settings?.businessName ||
                "ALIF PERFUMES"}
            </span>
          </Link>
        </Hover>

        {/* Desktop Navigation */}

        <nav className={styles.navLinks}>

          <NavLink
            to="/"
            onClick={scrollToTop}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            onClick={scrollToTop}
          >
            Products
          </NavLink>

          <NavLink
            to="/about"
            onClick={scrollToTop}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            onClick={scrollToTop}
          >
            Contact
          </NavLink>

        </nav>

        {/* Desktop WhatsApp */}

        <div
          className={
            styles.desktopButton
          }
        >
          <Button
            onClick={handleWhatsApp}
          >
            <MessageCircle
              size={18}
              strokeWidth={2.2}
            />

            &nbsp; WhatsApp

          </Button>
        </div>

        {/* Mobile Menu Button */}

        <button
          className={
            styles.menuButton
          }
          onClick={() =>
            setMenuOpen(
              (prev) => !prev
            )
          }
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <X
              size={28}
              strokeWidth={2.4}
            />
          ) : (
            <Menu
              size={28}
              strokeWidth={2.4}
            />
          )}
        </button>

        {/* Mobile Menu */}

        <div
          className={`${styles.mobileMenu} ${
            menuOpen
              ? styles.show
              : ""
          }`}
        >

          <NavLink
            to="/"
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            onClick={closeMenu}
          >
            Products
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMenu}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </NavLink>

          <Button
            onClick={handleWhatsApp}
          >
            <MessageCircle
              size={18}
              strokeWidth={2.2}
            />

            &nbsp; WhatsApp

          </Button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;