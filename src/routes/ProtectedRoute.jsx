import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "../services/firebase";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          try {
            const tokenResult = await currentUser.getIdTokenResult(true);
            const hasAdminClaim = !!tokenResult.claims.admin;
            const isAuthorizedAdminEmail = currentUser.email?.toLowerCase() === "pathanmaaz142@gmail.com";
            setIsAdmin(hasAdminClaim || isAuthorizedAdminEmail);
          } catch (error) {
            console.error("Failed to verify admin claim:", error);
            const isAuthorizedAdminEmail = currentUser.email?.toLowerCase() === "pathanmaaz142@gmail.com";
            setIsAdmin(isAuthorizedAdminEmail);
          }
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "120px",
        }}
      >
        Loading...
      </h2>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;