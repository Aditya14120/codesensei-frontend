import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import API from "../services/api";
import SubtleGrid from "../components/effects/BackgroundEffects";

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: "10px",
  fontSize: "14px",
  background: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  color: "var(--text-primary)",
  outline: "none",
};

function AuthPage({ mode, onAuthSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const switchMode = (nextMode) => {
    navigate(nextMode === "login" ? "/login" : "/signup", {
      replace: true,
      state: location.state,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (mode === "signup" && !name)) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setSubmitting(true);

      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const payload = mode === "login" ? { email, password } : { name, email, password };

      const response = await API.post(endpoint, payload);

      toast.success(mode === "login" ? "Welcome back!" : "Account created!");
      onAuthSuccess(response.data);

      const redirectTo = location.state?.from?.pathname || "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <SubtleGrid />

      <Link
        to="/"
        style={{
          position: "absolute",
          top: "32px",
          left: "40px",
          fontSize: "18px",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
          textDecoration: "none",
          zIndex: 10,
        }}
      >
        Code<span style={{ color: "var(--accent-light)" }}>Sensei</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="glass"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "20px",
          padding: "32px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px" }}>
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "24px" }}>
          {mode === "login"
            ? "Sign in to keep track of your analyses."
            : "Sign up to start reviewing your code."}
        </p>

        {/* Tab switcher */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            padding: "4px",
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            marginBottom: "22px",
          }}
        >
          {["login", "signup"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => switchMode(tab)}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: "7px",
                fontSize: "13px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                background: mode === tab ? "rgba(255, 255, 255, 0.08)" : "transparent",
                color: mode === tab ? "var(--text-primary)" : "var(--text-tertiary)",
                transition: "all 0.2s ease",
              }}
            >
              {tab === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {mode === "signup" && (
            <div>
              <label style={{ fontSize: "12px", color: "var(--text-tertiary)", marginBottom: "6px", display: "block" }}>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                style={inputStyle}
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: "12px", color: "var(--text-tertiary)", marginBottom: "6px", display: "block" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", color: "var(--text-tertiary)", marginBottom: "6px", display: "block" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              marginTop: "8px",
              padding: "12px 0",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              background: submitting ? "rgba(255,255,255,0.04)" : "#f0f0f5",
              color: submitting ? "var(--text-tertiary)" : "#0a0a0d",
              border: "none",
              cursor: submitting ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {submitting ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default AuthPage;
