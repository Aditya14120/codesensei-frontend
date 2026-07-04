import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AuthModal from "./components/auth/AuthModal";

const SESSION_KEY = "codesensei_user";

function App() {
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  const handleAuthSuccess = (data) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(data));
    setUser(data);
    setAuthOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    toast.success("Logged out.");
  };

  return (
    <>
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111118",
            color: "#e5e5e5",
            border: "1px solid rgba(99,102,241,0.15)",
            fontSize: "13px",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(99,102,241,0.05)",
          },
        }}
      />

      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LandingPage
          user={user}
          onLoginClick={() => setAuthOpen(true)}
          onLogout={handleLogout}
          onGetStarted={() => setAuthOpen(true)}
        />
      )}

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}

export default App;
