import { motion } from "framer-motion";

const features = [
  {
    title: "AI Code Review",
    description: "Gemini-powered analysis that thinks like a senior engineer. Get deep insights into architecture, patterns, and best practices.",
    color: "#6366f1",
    bgColor: "rgba(99, 102, 241, 0.08)",
    borderColor: "rgba(99, 102, 241, 0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22" />
        <path d="M12 2a4 4 0 0 0-4 4c0 1.95 1.4 3.58 3.25 3.93" />
        <path d="M16 16c0-2.21-1.79-4-4-4s-4 1.79-4 4" />
      </svg>
    ),
  },
  {
    title: "Bug Detection",
    description: "Identify potential bugs, null pointer risks, and logic errors before they reach production. Static + AI analysis combined.",
    color: "#8b5cf6",
    bgColor: "rgba(139, 92, 246, 0.08)",
    borderColor: "rgba(139, 92, 246, 0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2l1.88 1.88" /><path d="M14.12 3.88 16 2" />
        <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
        <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
        <path d="M12 20v-9" /><path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
        <path d="M6 13H2" /><path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
        <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" /><path d="M22 13h-4" />
        <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
      </svg>
    ),
  },
  {
    title: "Performance Audit",
    description: "Detect inefficient algorithms, unnecessary allocations, and complexity bottlenecks. Get actionable optimization advice.",
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.08)",
    borderColor: "rgba(245, 158, 11, 0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Code Improvement",
    description: "Receive fully rewritten, production-ready code with applied best practices, improved naming, and cleaner architecture.",
    color: "#34d399",
    bgColor: "rgba(52, 211, 153, 0.08)",
    borderColor: "rgba(52, 211, 153, 0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

function FeatureCards() {
  return (
    <section id="features" style={{ padding: "60px 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "40px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
            <div style={{ height: "2px", width: "32px", borderRadius: "999px", background: "var(--gradient-accent)" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent-light)" }}>
              Features
            </span>
          </div>
          <h2 style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "8px" }}>
            Built for serious engineering
          </h2>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Everything you need to ship high-quality Java code.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass glass-hover"
              style={{
                borderRadius: "16px",
                padding: "28px 24px",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "18px",
                  background: feature.bgColor,
                  border: `1px solid ${feature.borderColor}`,
                  color: feature.color,
                }}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "10px" }}>
                {feature.title}
              </h3>

              {/* Description */}
              <p style={{ fontSize: "13px", lineHeight: 1.65, color: "var(--text-tertiary)" }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FeatureCards;