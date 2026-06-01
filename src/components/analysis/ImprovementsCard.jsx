import { motion } from "framer-motion";

function ImprovementsCard({ improvements }) {

  return (

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-8"
    >

      <h2 className="text-2xl font-bold text-purple-400 mb-6">
        Improvements
      </h2>

      <div className="space-y-4">

        {improvements?.map((item, index) => (

          <div
            key={index}
            className="flex gap-4 items-start"
          >

            <div className="mt-2 w-2 h-2 rounded-full bg-purple-500" />

            <span className="text-gray-300">
              {item}
            </span>

          </div>

        ))}

      </div>

    </motion.div>

  );

}

export default ImprovementsCard;