import { motion } from "framer-motion";

const sampleChips = [
  { label: "Security", detail: "0 issues found", color: "#6366f1" },
  { label: "Performance", detail: "Optimized loop bounds", color: "#f59e0b" },
  { label: "Bugs", detail: "None detected", color: "#34d399" },
];

function HeroSection({ onGetStarted }) {
  return (
    <section className="relative overflow-hidden" style={{ paddingTop: "150px", paddingBottom: "90px" }}>
      <div
        className="grid lg:grid-cols-[1.15fr_0.85fr] items-center"
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px", gap: "56px" }}
      >
        {/* Left column — pitch */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "32px" }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-accent)",
                border: "1px solid var(--border-accent)",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#34d399",
                  boxShadow: "0 0 8px #34d39990",
                }}
              />
              Groq Llama 3.3 · Static + AI Analysis
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 4vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
              marginBottom: "24px",
              color: "var(--text-primary)",
            }}
          >
            Code review that actually reads{" "}
            <span className="text-gradient-accent">your code</span>, not just its syntax.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              maxWidth: "480px",
              color: "var(--text-secondary)",
              marginBottom: "36px",
            }}
          >
            Paste Java, Python, C, or C++. CodeSensei runs it through static
            analysis and an LLM review pass, then hands back a scored
            breakdown — bugs, security gaps, performance issues, and a
            rewritten version you can diff line by line.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px" }}
          >
            <button
              onClick={onGetStarted}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 600,
                background: "#f0f0f5",
                color: "#0a0a0d",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(240,240,245,0.1), 0 4px 20px rgba(0,0,0,0.5)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f0f0f5";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Start Analyzing
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <a
              href="#features"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--text-secondary)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border-subtle)",
                paddingBottom: "2px",
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-accent)";
                e.currentTarget.style.borderColor = "var(--border-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.borderColor = "var(--border-subtle)";
              }}
            >
              See what it checks →
            </a>
          </motion.div>
        </div>

        {/* Right column — sample analysis preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="glass"
          style={{ borderRadius: "20px", padding: "28px", position: "relative" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-tertiary)",
              }}
            >
              Sample analysis
            </span>
            <span
              style={{
                fontSize: "11px",
                padding: "3px 10px",
                borderRadius: "999px",
                background: "rgba(52, 211, 153, 0.08)",
                color: "#4ade80",
              }}
            >
              Main.java
            </span>
          </div>

          {/* Score ring */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
            <div className="relative inline-flex items-center justify-center" style={{ flexShrink: 0 }}>
              <svg width="88" height="88" viewBox="0 0 88 88">
                <circle cx="44" cy="44" r="37" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                <motion.circle
                  cx="44" cy="44" r="37"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 37}
                  transform="rotate(-90 44 44)"
                  initial={{ strokeDashoffset: 2 * Math.PI * 37 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 37 * (1 - 0.84) }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center" style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
                8.4
              </div>
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "2px" }}>
                Good
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
                Minor readability suggestions
              </div>
            </div>
          </div>

          {/* Issue chips */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {sampleChips.map((chip) => (
              <div
                key={chip.label}
                className="surface"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "10px",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-secondary)" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: chip.color }} />
                  {chip.label}
                </span>
                <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>{chip.detail}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
