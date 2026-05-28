import { motion } from "framer-motion";

function ScoreCard({ score }) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        scale: 0.8,
      }}

      animate={{
        opacity: 1,
        scale: 1,
      }}

      transition={{
        duration: 0.6,
      }}

      className="
        glass
        rounded-3xl
        p-10
        text-center
      "
    >

      <h2
        className="
          text-2xl
          text-purple-400
          mb-6
          tracking-widest
          uppercase
        "
      >
        AI Code Quality Score
      </h2>

      <motion.div

        initial={{
          rotate: -180,
          opacity: 0,
        }}

        animate={{
          rotate: 0,
          opacity: 1,
        }}

        transition={{
          duration: 1,
        }}

        className="
          text-8xl
          font-black
          text-white
          text-glow
        "
      >

        {score}/10

      </motion.div>

    </motion.div>

  );

}

export default ScoreCard;