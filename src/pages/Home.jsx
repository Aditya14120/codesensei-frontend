import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

import API from "../services/api";

import CodeEditor from "../components/editor/CodeEditor";
import ScoreCard from "../components/analysis/ScoreCard";
import AnalysisCard from "../components/analysis/AnalysisCard";
import AnimatedBackground from "../components/effects/AnimatedBackground";
import ParticleField from "../components/effects/ParticleField";
import AILoader from "../components/effects/AILoader";
import SystemStatus from "../components/effects/SystemStatus";
function Home() {

  const [code, setCode] = useState(`public class Demo {

    public static void main(String[] args) {

        System.out.println("Hello CodeSensei");

    }

}`);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const analyzeCode = async () => {

    try {

      setLoading(true);

      const response = await API.post("/code/analyze", {
        code: code
      });

      setResult(response.data);

      toast.success("Analysis Complete");

    } catch (error) {

      console.error(error);

      toast.error("Analysis Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      <AnimatedBackground />
      <ParticleField />
      


      <Toaster />
      {loading && <AILoader />}

      {/* NAVBAR */}

      <nav
        className="
          w-full
          fixed
          top-0
          left-0
          z-50
          backdrop-blur-xl
          border-b
          border-purple-500/10
          bg-black/30
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-8
            py-5
            flex
            items-center
            justify-between
          "
        >

          <div
            className="
              text-3xl
              font-black
              tracking-tight
            "
          >

            <span className="text-white">
              Code
            </span>

            <span className="text-purple-500 text-glow">
              Sensei
            </span>

          </div>

          <div className="hidden md:flex gap-10 text-gray-400">

            <span className="hover:text-purple-400 transition-all cursor-pointer">
              Features
            </span>

            <span className="hover:text-purple-400 transition-all cursor-pointer">
              AI Engine
            </span>

            <span className="hover:text-purple-400 transition-all cursor-pointer">
              Dashboard
            </span>

          </div>

        </div>

      </nav>

      {/* MAIN */}

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-40 pb-24">

        {/* HERO */}

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-24"
        >

          <div
            className="
              inline-flex
              items-center
              gap-3
              px-6
              py-3
              rounded-full
              glass
              mb-10
            "
          >

            <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />

            <span
              className="
                text-purple-300
                uppercase
                tracking-[0.25em]
                text-sm
              "
            >
              Wakandan AI Intelligence System
            </span>

          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="
              text-[7rem]
              leading-none
              font-black
              mb-10
            "
          >

            <span className="text-white">
              Analyze
            </span>

            <br />

            <span className="text-purple-500 text-glow">
              Like A Senior Engineer
            </span>

          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="
              text-gray-400
              text-2xl
              leading-[2.2rem]
              max-w-4xl
            "
          >

            AI-powered futuristic code review platform inspired by
            Black Panther kinetic energy systems.
            Detect bad practices, optimize architecture,
            improve scalability, and generate production-level
            code improvements instantly.

          </motion.p>

        </motion.div>

        {/* EDITOR */}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >

          <CodeEditor
            code={code}
            setCode={setCode}
          />

        </motion.div>

        {/* BUTTON */}

        <div className="flex justify-center mt-12">

          <motion.button

            whileHover={{
              scale: 1.04,
            }}

            whileTap={{
              scale: 0.96,
            }}

            onClick={analyzeCode}

            disabled={loading}

            className="
              relative
              overflow-hidden
              group
              px-14
              py-5
              rounded-2xl
              font-bold
              text-xl
              bg-purple-600
              transition-all
              duration-300
              hover:shadow-[0_0_80px_rgba(168,85,247,0.9)]
              shadow-[0_0_40px_rgba(168,85,247,0.4)]
            "
          >

            <span className="relative z-10">

              {loading ? "Analyzing..." : "Analyze Code"}

            </span>

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-transparent
                via-white/20
                to-transparent
                -translate-x-[200%]
                group-hover:translate-x-[200%]
                transition-transform
                duration-1000
              "
            />

          </motion.button>

        </div>
        <SystemStatus />

        {/* RESULTS */}

        {result && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-28 space-y-10"
          >

            <ScoreCard score={result.score} />

            <AnalysisCard
              title="AI Explanation"
              content={result.aiExplanation}
            />

            <AnalysisCard
              title="Improved Code"
              content={result.improvedCode}
            />

          </motion.div>

        )}

      </div>

    </div>

  );

}

export default Home;