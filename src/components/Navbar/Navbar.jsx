import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Menu,
  X,
  Search,
} from "lucide-react";

import Button from "../Button/Button";
import { Hover } from "../../animations";
import useSettings from "../../hooks/useSettings";

import styles from "./Navbar.module.css";

import defaultLogo from "../../assets/logos/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    navigate(`/products?search=${encodeURIComponent(searchVal.trim())}`);
    setSearchVal("");
    setMenuOpen(false);
  };

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
      {/* Skip to Content Link */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

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
              alt=""
              aria-hidden="true"
            />

            <span>
              {settings?.businessName ||
                "ALIF PERFUMES"}
            </span>
          </Link>
        </Hover>

        {/* Desktop Navigation */}

        <nav className={styles.navLinks} aria-label="Main navigation">

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

        {/* Desktop Search */}
        <form onSubmit={handleSearchSubmit} className={styles.searchForm} role="search" aria-label="Site search">
          <label htmlFor="desktop-search" className="visually-hidden">Search perfumes</label>
          <input
            id="desktop-search"
            type="text"
            placeholder="Search perfumes..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchBtn} aria-label="Search">
            <Search size={16} aria-hidden="true" />
          </button>
        </form>

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
              aria-hidden="true"
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
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
        >
          {menuOpen ? (
            <X
              size={28}
              strokeWidth={2.4}
              aria-hidden="true"
            />
          ) : (
            <Menu
              size={28}
              strokeWidth={2.4}
              aria-hidden="true"
            />
          )}
        </button>

        {/* Mobile Menu */}

        <nav
          id="mobile-nav-menu"
          className={`${styles.mobileMenu} ${
            menuOpen
              ? styles.show
              : ""
          }`}
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          inert={!menuOpen ? "" : undefined}
        >

          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className={styles.mobileSearchForm} role="search" aria-label="Mobile site search">
            <label htmlFor="mobile-search" className="visually-hidden">Search perfumes</label>
            <input
              id="mobile-search"
              type="text"
              placeholder="Search perfumes..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className={styles.mobileSearchInput}
              tabIndex={menuOpen ? 0 : -1}
            />
            <button type="submit" className={styles.mobileSearchBtn} aria-label="Search" tabIndex={menuOpen ? 0 : -1}>
              <Search size={16} aria-hidden="true" />
            </button>
          </form>

          <NavLink
            to="/"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            Products
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            Contact
          </NavLink>

          <Button
            onClick={handleWhatsApp}
          >
            <MessageCircle
              size={18}
              strokeWidth={2.2}
              aria-hidden="true"
            />

            &nbsp; WhatsApp

          </Button>

        </nav>

      </div>
    </header>
  );
}

export default Navbar;