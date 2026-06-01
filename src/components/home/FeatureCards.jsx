import { motion } from "framer-motion";

const features = [
  {
    title: "AI Review",
    desc: "Senior engineer level code analysis."
  },
  {
    title: "Performance",
    desc: "Detect inefficient logic and complexity issues."
  },
  {
    title: "Security",
    desc: "Identify risky coding practices."
  },
  {
    title: "Code Improvement",
    desc: "Generate production-ready improvements."
  }
];

function FeatureCards() {
  return (
    <div className="grid md:grid-cols-4 gap-6 mt-20">

      {features.map((feature, index) => (

        <motion.div
          key={index}
          whileHover={{
            y: -10,
            scale: 1.03
          }}
          className="
            glass
            rounded-3xl
            p-6
            cursor-pointer
          "
        >

          <h3
            className="
              text-xl
              font-bold
              text-purple-400
              mb-3
            "
          >
            {feature.title}
          </h3>

          <p className="text-gray-400">
            {feature.desc}
          </p>

        </motion.div>

      ))}

    </div>
  );
}

export default FeatureCards;