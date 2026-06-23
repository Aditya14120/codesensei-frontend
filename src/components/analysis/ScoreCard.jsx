import { motion } from "framer-motion";

function ScoreCard({ score }) {
  const numScore = typeof score === "number" ? score : 0;
  const percentage = (numScore / 10) * 100;

  const getScoreColor = (s) => {
    if (s >= 8) return "#4ade80";
    if (s >= 5) return "#facc15";
    return "#f87171";
  };

  const getScoreLabel = (s) => {
    if (s >= 9) return "Excellent";
    if (s >= 7) return "Good";
    if (s >= 5) return "Needs Improvement";
    if (s >= 3) return "Poor";
    return "Critical";
  };

  const color = getScoreColor(numScore);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-xl p-8 text-center"
    >
      <div
        className="text-xs font-medium uppercase tracking-widest mb-6"
        style={{ color: "var(--text-tertiary)" }}
      >
        Code Quality Score
      </div>

      {/* Score Ring */}
      <div className="relative inline-flex items-center justify-center mb-6">
        <svg width="140" height="140" viewBox="0 0 140 140">
          {/* Background ring */}
          <circle
            cx="70" cy="70" r="58"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="6"
          />
          {/* Score ring */}
          <motion.circle
            cx="70" cy="70" r="58"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 58}`}
            strokeDashoffset={`${2 * Math.PI * 58 * (1 - percentage / 100)}`}
            transform="rotate(-90 70 70)"
            initial={{ strokeDashoffset: 2 * Math.PI * 58 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 58 * (1 - percentage / 100) }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {numScore}
          </motion.span>
          <span
            className="text-xs"
            style={{ color: "var(--text-tertiary)" }}
          >
            / 10
          </span>
        </div>
      </div>

      {/* Label */}
      <div
        className="text-sm font-semibold"
        style={{ color }}
      >
        {getScoreLabel(numScore)}
      </div>
    </motion.div>
  );
}

export default ScoreCard;