import { motion } from "framer-motion";

// Real capabilities, not marketing metrics — nothing here is a number we'd
// have to explain where it came from.
const capabilities = [
  { value: "4", label: "Languages Covered", sublabel: "Java · Python · C · C++", color: "#6366f1" },
  { value: "2-Layer", label: "Analysis Engine", sublabel: "Static checks + LLM review", color: "#8b5cf6" },
  { value: "Full", label: "History Tracking", sublabel: "Every report saved & searchable", color: "#f59e0b" },
  { value: "Private", label: "By Default", sublabel: "JWT-scoped to your account only", color: "#34d399" },
];

function StatsSection() {
  return (
    <section style={{ padding: "40px 0 60px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>

        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: "16px" }}>
          {capabilities.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="surface surface-hover"
              style={{
                borderRadius: "16px",
                padding: "24px 18px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                  opacity: 0.6,
                }}
              />

              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "24px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  marginBottom: "6px",
                  color: item.color,
                }}
              >
                {item.value}
              </div>
              <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-accent)", marginBottom: "3px" }}>
                {item.label}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                {item.sublabel}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default StatsSection;
