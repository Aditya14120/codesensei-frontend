import { motion } from "framer-motion";

function SummaryCard({ summary }) {

  return (

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-8"
    >

      <h2 className="text-2xl font-bold text-purple-400 mb-6">
        AI Summary
      </h2>

      <p className="text-gray-300 leading-8">
        {summary}
      </p>

    </motion.div>

  );

}

export default SummaryCard;