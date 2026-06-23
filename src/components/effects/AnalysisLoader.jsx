import { motion } from "framer-motion";

function AnalysisLoader() {
  const steps = [
    "Initializing analysis engine",
    "Parsing code structure",
    "Running static analysis",
    "Querying AI reviewer",
    "Generating improvements",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: "rgba(5, 5, 5, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="text-center max-w-sm px-6">

        {/* Spinner */}
        <div className="relative inline-flex items-center justify-center mb-8">
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 rounded-full"
            style={{
              border: "1.5px solid rgba(255, 255, 255, 0.06)",
              borderTopColor: "rgba(255, 255, 255, 0.4)",
            }}
          />
          {/* Inner ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute w-12 h-12 rounded-full"
            style={{
              border: "1.5px solid rgba(255, 255, 255, 0.04)",
              borderTopColor: "rgba(255, 255, 255, 0.2)",
            }}
          />
          {/* Center dot */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute w-3 h-3 rounded-full"
            style={{ background: "rgba(255, 255, 255, 0.5)" }}
          />
        </div>

        {/* Title */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Analyzing
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-2">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.6, duration: 0.4 }}
              className="flex items-center gap-2 justify-center text-xs"
              style={{ color: "var(--text-tertiary)" }}
            >
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: index * 0.6,
                }}
                className="w-1 h-1 rounded-full"
                style={{ background: "var(--text-accent)" }}
              />
              {step}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default AnalysisLoader;
