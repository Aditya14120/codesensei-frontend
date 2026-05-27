import { motion } from "framer-motion";

function BackgroundEffects() {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">

      {/* Top Glow */}
      <motion.div
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity
        }}
        className="
          absolute
          top-[-200px]
          left-[-100px]
          w-[500px]
          h-[500px]
          bg-purple-700
          rounded-full
          blur-[140px]
          opacity-30
        "
      />

      {/* Bottom Glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity
        }}
        className="
          absolute
          bottom-[-200px]
          right-[-100px]
          w-[500px]
          h-[500px]
          bg-fuchsia-600
          rounded-full
          blur-[140px]
          opacity-20
        "
      />
    </div>
  );
}

export default BackgroundEffects;