import { motion } from "framer-motion";

function AILoader() {

  return (

    <motion.div

      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}

      className="
        fixed
        inset-0
        z-[100]
        bg-black/80
        backdrop-blur-xl
        flex
        items-center
        justify-center
      "
    >

      <div className="relative">

        {/* OUTER RING */}

        <motion.div

          animate={{
            rotate: 360,
          }}

          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}

          className="
            w-56
            h-56
            rounded-full
            border
            border-purple-500/20
            flex
            items-center
            justify-center
          "
        >

          {/* MIDDLE RING */}

          <motion.div

            animate={{
              rotate: -360,
            }}

            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}

            className="
              w-40
              h-40
              rounded-full
              border
              border-purple-400/40
              flex
              items-center
              justify-center
            "
          >

            {/* CORE */}

            <motion.div

              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}

              transition={{
                duration: 2,
                repeat: Infinity,
              }}

              className="
                w-20
                h-20
                rounded-full
                bg-purple-500
                shadow-[0_0_80px_rgba(168,85,247,1)]
              "
            />

          </motion.div>

        </motion.div>

        {/* SCANNING TEXT */}

        <motion.div

          animate={{
            opacity: [0.4, 1, 0.4],
          }}

          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}

          className="
            absolute
            -bottom-20
            left-1/2
            -translate-x-1/2
            text-center
          "
        >

          <p
            className="
              text-purple-300
              text-xl
              tracking-[0.3em]
              uppercase
            "
          >
            Analyzing Code
          </p>

          <p className="text-gray-500 mt-3">
            AI Engine Processing...
          </p>

        </motion.div>

      </div>

    </motion.div>

  );

}

export default AILoader;