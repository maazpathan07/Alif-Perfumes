import { useEffect, useRef, useState, useCallback } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth } from "../services/firebase";

const IDLE_TIMEOUT   = 30 * 60 * 1000; // 30 min
const WARN_BEFORE    =  5 * 60 * 1000; //  5 min before logout

export function useInactivityLogout() {
  const navigate       = useNavigate();
  const idleTimer      = useRef(null);
  const warnTimer      = useRef(null);
  const countdownRef   = useRef(null);
  const showWarnRef    = useRef(false);

  const [showWarning, setShowWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(300);

  const clearAll = useCallback(() => {
    clearTimeout(idleTimer.current);
    clearTimeout(warnTimer.current);
    clearInterval(countdownRef.current);
  }, []);

  const handleLogout = useCallback(async () => {
    clearAll();
    setShowWarning(false);
    showWarnRef.current = false;
    try {
      await signOut(auth);
    } catch (_) { /* ignore */ }
    toast.error("Aap 30 min se inactive the — logout ho gaye.");
    navigate("/login", { replace: true });
  }, [clearAll, navigate]);

  const resetTimer = useCallback(() => {
    clearAll();

    // Warning fires at (30 - 5) = 25 min
    warnTimer.current = setTimeout(() => {
      showWarnRef.current = true;
      setShowWarning(true);
      setSecondsLeft(300);

      countdownRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) { clearInterval(countdownRef.current); return 0; }
          return s - 1;
        });
      }, 1000);
    }, IDLE_TIMEOUT - WARN_BEFORE);

    idleTimer.current = setTimeout(handleLogout, IDLE_TIMEOUT);
  }, [clearAll, handleLogout]);

  const stayLoggedIn = useCallback(() => {
    showWarnRef.current = false;
    setShowWarning(false);
    clearInterval(countdownRef.current);
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "click"];

    const onActivity = () => {
      if (showWarnRef.current) {
        showWarnRef.current = false;
        setShowWarning(false);
        clearInterval(countdownRef.current);
      }
      resetTimer();
    };

    events.forEach((ev) =>
      window.addEventListener(ev, onActivity, { passive: true })
    );

    resetTimer();

    return () => {
      clearAll();
      events.forEach((ev) => window.removeEventListener(ev, onActivity));
    };
  }, [resetTimer, clearAll]);

  return { showWarning, secondsLeft, stayLoggedIn };
}
