import { motion } from "framer-motion";

const logs = [
  "Initializing AI engine...",
  "Scanning architecture...",
  "Analyzing complexity...",
  "Checking edge cases...",
  "Optimizing suggestions...",
  "Generating improved code..."
];

function SystemStatus() {

  return (

    <div
      className="
        glass
        rounded-3xl
        p-6
        mt-10
      "
    >

      <h2
        className="
          text-purple-400
          font-bold
          mb-6
          tracking-widest
        "
      >
        SYSTEM STATUS
      </h2>

      <div className="space-y-4">

        {logs.map((log, index) => (

          <motion.div

            key={index}

            initial={{
              opacity: 0,
              x: -20,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              delay: index * 0.3,
            }}

            className="
              flex
              items-center
              gap-4
              text-gray-300
            "
          >

            <div
              className="
                w-2
                h-2
                rounded-full
                bg-purple-500
                animate-pulse
              "
            />

            {log}

          </motion.div>

        ))}

      </div>

    </div>

  );

}

export default SystemStatus;