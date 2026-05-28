import { motion } from "framer-motion";

function ParticleField() {

  const particles = Array.from({ length: 25 });

  return (

    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {particles.map((_, index) => (

        <motion.div
          key={index}

          initial={{
            opacity: 0,
            y: Math.random() * 1000,
            x: Math.random() * 1600,
          }}

          animate={{
            opacity: [0, 1, 0],
            y: [null, -200],
          }}

          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}

          className="
            absolute
            w-1
            h-1
            rounded-full
            bg-purple-400
            shadow-[0_0_20px_rgba(168,85,247,1)]
          "
        />

      ))}

    </div>

  );

}

export default ParticleField;