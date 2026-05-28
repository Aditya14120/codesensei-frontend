import { motion } from "framer-motion";

function AnimatedBackground() {

  return (

    <div className="fixed inset-0 overflow-hidden z-0">

      {/* GRID */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.05]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ORB 1 */}

      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="
          absolute
          top-[-150px]
          right-[-150px]
          w-[500px]
          h-[500px]
          rounded-full
          bg-purple-600/20
          blur-[120px]
        "
      />

      {/* ORB 2 */}

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-[-200px]
          left-[-100px]
          w-[450px]
          h-[450px]
          rounded-full
          bg-fuchsia-500/10
          blur-[120px]
        "
      />

      {/* CENTER GLOW */}

      <motion.div
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="
          absolute
          top-[30%]
          left-[35%]
          w-[400px]
          h-[400px]
          rounded-full
          bg-purple-500/10
          blur-[100px]
        "
      />

    </div>

  );
}

export default AnimatedBackground;