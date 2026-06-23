import { motion } from "framer-motion";

const stats = [
  { value: "10K+", label: "Reviews Completed", sublabel: "Code analyzed", color: "#6366f1" },
  { value: "95%", label: "Issue Detection", sublabel: "Accuracy rate", color: "#8b5cf6" },
  { value: "<3s", label: "Analysis Time", sublabel: "Average response", color: "#a855f7" },
  { value: "8.4", label: "Avg Quality Score", sublabel: "Out of 10", color: "#ec4899" },
];

function StatsSection() {
  return (
    <section style={{ padding: "40px 0 60px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass glass-hover"
              style={{
                borderRadius: "16px",
                padding: "28px 20px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Gradient top border */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                  opacity: 0.6,
                }}
              />

              <div
                className="text-gradient-accent"
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  marginBottom: "6px",
                  backgroundImage: `linear-gradient(135deg, #ffffff, ${stat.color})`,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-accent)", marginBottom: "3px" }}>
                {stat.label}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                {stat.sublabel}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default StatsSection;