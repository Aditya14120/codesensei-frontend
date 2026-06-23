import { motion } from "framer-motion";

function ImprovementsCard({ improvements }) {
  const items = improvements || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-accent)" }}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        <h3
          className="text-sm font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Improvements
        </h3>
        {items.length > 0 && (
          <span
            className="ml-auto text-xs px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              color: "var(--text-tertiary)",
            }}
          >
            {items.length}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
          No improvements suggested.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 text-sm"
            >
              <div
                className="w-1 h-1 rounded-full mt-2 shrink-0"
                style={{ background: "var(--text-accent)" }}
              />
              <span style={{ color: "var(--text-secondary)" }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default ImprovementsCard;