import { motion } from "framer-motion";

function Navbar({ user, onLoginClick, onLogout, links = [] }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full fixed top-0 left-0 z-50"
      style={{
        background: "rgba(8, 12, 16, 0.75)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, rgba(200,200,210,0.1), rgba(180,180,190,0.08))",
              border: "1px solid rgba(200,200,210,0.15)",
              boxShadow: "0 0 20px rgba(200,200,210,0.04)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#logo-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e0e0e8" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <span
            style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
          >
            Code<span style={{ color: "var(--accent-light)" }}>Sensei</span>
          </span>
        </div>

        {/* Nav Links */}
        {links.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {links.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--text-tertiary)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "var(--text-primary)";
                  e.target.style.background = "rgba(255, 255, 255, 0.04)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "var(--text-tertiary)";
                  e.target.style.background = "transparent";
                }}
              >
                {item}
              </a>
            ))}
          </div>
        )}

        {/* Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {user ? (
            <>
              <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                Hi, {user.name || user.email}
              </span>
              <button
                onClick={onLogout}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--text-tertiary)",
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              style={{
                padding: "8px 18px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#0a0a0d",
                background: "#f0f0f5",
                border: "none",
                cursor: "pointer",
              }}
            >
              Log In
            </button>
          )}
        </div>

      </div>
    </motion.nav>
  );
}

export default Navbar;
