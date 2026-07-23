import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./ScrollableTable.module.css";

/**
 * ScrollableTable
 * Wraps a horizontally-scrollable table with left/right arrow buttons.
 * Arrows auto-appear only when content overflows.
 */
function ScrollableTable({ children, className = "" }) {
  const wrapperRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const checkScroll = () => {
    const el = wrapperRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = wrapperRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: dir * 220, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.outer}>
      {/* Left Arrow */}
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowLeft} ${canLeft ? styles.arrowVisible : ""}`}
        onClick={() => scroll(-1)}
        aria-label="Scroll table left"
        tabIndex={canLeft ? 0 : -1}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Scrollable table container */}
      <div
        ref={wrapperRef}
        className={`${styles.wrapper} ${className}`}
      >
        {children}
      </div>

      {/* Right Arrow */}
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowRight} ${canRight ? styles.arrowVisible : ""}`}
        onClick={() => scroll(1)}
        aria-label="Scroll table right"
        tabIndex={canRight ? 0 : -1}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default ScrollableTable;
