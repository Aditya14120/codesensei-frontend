import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import HistoryPage from "./pages/HistoryPage";
import ReportDetailPage from "./pages/ReportDetailPage";
import AuthPage from "./pages/AuthPage";
import RequireAuth from "./components/auth/RequireAuth";

const SESSION_KEY = "codesensei_user";

function AppRoutes({ user, onAuthSuccess, onLogout }) {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LandingPage
              user={user}
              onLoginClick={() => navigate("/login")}
              onLogout={onLogout}
              onGetStarted={() => navigate("/signup")}
            />
          )
        }
      />

      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <AuthPage mode="login" onAuthSuccess={onAuthSuccess} />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/dashboard" replace /> : <AuthPage mode="signup" onAuthSuccess={onAuthSuccess} />}
      />

      <Route
        path="/dashboard"
        element={
          <RequireAuth user={user}>
            <Dashboard user={user} onLogout={onLogout} />
          </RequireAuth>
        }
      />
      <Route
        path="/history"
        element={
          <RequireAuth user={user}>
            <HistoryPage user={user} onLogout={onLogout} />
          </RequireAuth>
        }
      />
      <Route
        path="/history/:id"
        element={
          <RequireAuth user={user}>
            <ReportDetailPage user={user} onLogout={onLogout} />
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  const [user, setUser] = useState(null);

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
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    toast.success("Logged out.");
  };

  // Raised by the axios response interceptor (services/api.js) when the API
  // rejects a request with 401 — the token was missing, expired, or invalid.
  // Clearing user here lets RequireAuth (already mounted on the current
  // route) redirect to /login and remember the page the user was on.
  useEffect(() => {
    const handleUnauthorized = () => setUser(null);
    window.addEventListener("codesensei:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("codesensei:unauthorized", handleUnauthorized);
  }, []);

  return (
    <BrowserRouter>
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

      <AppRoutes user={user} onAuthSuccess={handleAuthSuccess} onLogout={handleLogout} />
    </BrowserRouter>
  );
}

export default App;
