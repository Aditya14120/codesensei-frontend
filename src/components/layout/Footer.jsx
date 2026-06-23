function Footer() {
  return (
    <footer
      className="py-14 px-6 relative"
      style={{
        borderTop: "1px solid transparent",
        backgroundImage: "linear-gradient(var(--bg-primary), var(--bg-primary)), linear-gradient(90deg, transparent, rgba(99,102,241,0.2), rgba(139,92,246,0.2), transparent)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Main footer row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="url(#footer-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <defs>
                  <linearGradient id="footer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--text-secondary)" }}
            >
              Code<span style={{ color: "var(--accent-light)", opacity: 0.8 }}>Sensei</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {["GitHub", "Documentation", "API"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs font-medium transition-colors duration-200"
                style={{ color: "var(--text-tertiary)" }}
                onMouseEnter={(e) => e.target.style.color = "var(--text-accent)"}
                onMouseLeave={(e) => e.target.style.color = "var(--text-tertiary)"}
              >
                {link}
              </a>
            ))}
          </div>

          <p
            className="text-xs"
            style={{ color: "var(--text-tertiary)" }}
          >
            AI-powered code intelligence. Built with Gemini.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
