import { motion } from "framer-motion";

function AnalysisCard({ title, content }) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 60,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.6,
      }}

      whileHover={{
        y: -5,
      }}

      className="
        glass
        rounded-3xl
        p-8
        transition-all
        duration-300
        hover:shadow-[0_0_60px_rgba(168,85,247,0.2)]
      "
    >

      <h2
        className="
          text-3xl
          font-bold
          mb-6
          text-purple-400
        "
      >
        {title}
      </h2>

      <pre
        className="
          whitespace-pre-wrap
          text-gray-300
          leading-8
          text-[15px]
          overflow-x-auto
        "
      >
        {content}
      </pre>

    </motion.div>

  );

}

export default AnalysisCard;