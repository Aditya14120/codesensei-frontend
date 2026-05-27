import { motion } from "framer-motion";
import BackgroundEffects from "../components/layout/BackgroundEffects";

function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">

      <BackgroundEffects />

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >

          <p className="text-purple-400 mb-4 tracking-[0.3em] uppercase text-sm">
            AI Powered Developer Intelligence
          </p>

          <h1 className="text-6xl md:text-7xl font-black leading-tight">

            <span className="text-white">
              Code
            </span>

            <span className="text-purple-500">
              Sensei
            </span>

          </h1>

          <p className="text-gray-400 mt-8 text-lg leading-relaxed max-w-xl">
            Advanced AI-driven code analysis platform designed to
            review, optimize, and elevate engineering quality with
            futuristic developer intelligence.
          </p>

          <div className="flex gap-6 mt-10">

            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="
                px-8 py-4
                bg-purple-600
                rounded-2xl
                font-semibold
                purple-glow
                hover:bg-purple-500
                transition-all
              "
            >
              Start Analysis
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="
                px-8 py-4
                border border-purple-500
                rounded-2xl
                font-semibold
                hover:bg-purple-500/10
                transition-all
              "
            >
              Explore Features
            </motion.button>

          </div>

        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="
            relative
            border border-purple-500/30
            bg-white/5
            backdrop-blur-xl
            rounded-3xl
            p-8
            purple-glow
          "
        >

          <div className="flex gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          <pre className="text-sm text-purple-200 overflow-hidden">

{`public class OptimizedCode {

    public static void main(String[] args) {

        System.out.println(
            "CodeSensei Active"
        );
    }
}`}
          </pre>

        </motion.div>

      </div>
    </div>
  );
}

export default Home;