import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import API from "../../services/api";

function AuthModal({ open, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    setSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (mode === "register" && !name)) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setSubmitting(true);

      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const payload =
        mode === "login" ? { email, password } : { name, email, password };

      const response = await API.post(endpoint, payload);

      toast.success(mode === "login" ? "Welcome back!" : "Account created!");
      onAuthSuccess(response.data);
      resetForm();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(2, 2, 4, 0.7)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="glass"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "20px",
              padding: "32px",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                color: "var(--text-tertiary)",
                cursor: "pointer",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Heading */}
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
              {["login", "register"].map((tab) => (
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
              {mode === "register" && (
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
                {submitting
                  ? "Please wait..."
                  : mode === "login"
                  ? "Log In"
                  : "Create Account"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AuthModal;
