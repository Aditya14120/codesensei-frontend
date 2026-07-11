import { motion } from "framer-motion";

const features = [
  {
    title: "AI Code Review",
    description:
      "Groq's Llama 3.3 reads your code the way a senior engineer would — flagging architecture and pattern issues static tools miss entirely, not just syntax.",
    color: "#6366f1",
    bgColor: "rgba(99, 102, 241, 0.08)",
    borderColor: "rgba(99, 102, 241, 0.15)",
    featured: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22" />
        <path d="M12 2a4 4 0 0 0-4 4c0 1.95 1.4 3.58 3.25 3.93" />
        <path d="M16 16c0-2.21-1.79-4-4-4s-4 1.79-4 4" />
      </svg>
    ),
  },
  {
    title: "Bug Detection",
    description: "Null pointer risks and logic errors, caught before they reach production.",
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
    description: "Inefficient loops and allocation patterns, with concrete fixes.",
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
    title: "Rewritten Code",
    description: "A production-ready rewrite, diffed side by side against your original.",
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
  const [banner, ...rest] = features;

  return (
    <section id="features" style={{ padding: "60px 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "32px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
            <div style={{ height: "2px", width: "32px", borderRadius: "999px", background: "var(--gradient-accent)" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent-light)" }}>
              Features
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "8px" }}>
            Built for serious engineering
          </h2>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Everything you need to ship high-quality code, in Java, Python, C, or C++.
          </p>
        </motion.div>

        {/* Featured banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="surface surface-hover"
          style={{
            borderRadius: "18px",
            padding: "28px 32px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              background: banner.bgColor,
              border: `1px solid ${banner.borderColor}`,
              color: banner.color,
            }}
          >
            {banner.icon}
          </div>
          <div>
            <h3 style={{ fontSize: "17px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "6px" }}>
              {banner.title}
            </h3>
            <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--text-tertiary)", maxWidth: "560px" }}>
              {banner.description}
            </p>
          </div>
        </motion.div>

        {/* Supporting cards */}
        <div className="grid md:grid-cols-3" style={{ gap: "16px" }}>
          {rest.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
              className="surface surface-hover"
              style={{
                borderRadius: "16px",
                padding: "24px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  background: feature.bgColor,
                  border: `1px solid ${feature.borderColor}`,
                  color: feature.color,
                }}
              >
                {feature.icon}
              </div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--text-tertiary)" }}>
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
