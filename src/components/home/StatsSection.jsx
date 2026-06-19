import { motion } from "framer-motion";

function StatsSection() {

  const stats = [
    {
      value: "10K+",
      label: "Reviews Generated"
    },
    {
      value: "95%",
      label: "Issue Detection"
    },
    {
      value: "3x",
      label: "Faster Review"
    }
  ];

  return (

    <div
      className="
        grid
        md:grid-cols-3
        gap-10
        mt-20
      "
    >

      {stats.map((stat, index) => (

        <motion.div

          key={index}

          whileHover={{
            scale: 1.05
          }}

          className="
            glass
            rounded-3xl
            p-8
            text-center
          "
        >

          <div
            className="
              text-5xl
              font-black
              text-purple-400
              mb-3
            "
          >
            {stat.value}
          </div>

          <div className="text-gray-400">
            {stat.label}
          </div>

        </motion.div>

      ))}

    </div>

  );

}

export default StatsSection;