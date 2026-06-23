import { motion } from "framer-motion";

function LearningTipsCard({ tips }) {
  const items = tips || [];

  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-accent)" }}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <h3
          className="text-sm font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Learning Tips
        </h3>
      </div>

      <div className="space-y-3">
        {items.map((tip, index) => (
          <div
            key={index}
            className="flex items-start gap-3 text-sm"
          >
            <span
              className="text-xs font-mono mt-0.5 shrink-0"
              style={{ color: "var(--text-tertiary)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span style={{ color: "var(--text-secondary)" }}>
              {tip}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default LearningTipsCard;
