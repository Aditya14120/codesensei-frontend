import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

import API from "../services/api";

import Navbar from "../components/layout/Navbar";
import SubtleGrid from "../components/effects/BackgroundEffects";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import FeatureCards from "../components/home/FeatureCards";
import CodeEditor from "../components/editor/CodeEditor";
import AnalysisDashboard from "../components/analysis/AnalysisDashboard";
import AnalysisLoader from "../components/effects/AnalysisLoader";

function Home() {
  const [code, setCode] = useState(`public class Demo {

    public static void main(String[] args) {

        System.out.println("Hello CodeSensei");

    }

}`);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const resultsRef = useRef(null);

  const analyzeCode = async () => {
    if (!code || code.trim().length === 0) {
      toast.error("Please enter some code first.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await API.post("/code/analyze", { code });

      setResult(response.data);
      toast.success("Analysis complete");

      // Scroll to results after a short delay
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    } catch (error) {
      console.error("Analysis failed:", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Analysis failed. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      {/* Background */}
      <SubtleGrid />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111118",
            color: "#e5e5e5",
            border: "1px solid rgba(99,102,241,0.15)",
            fontSize: "13px",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(99,102,241,0.05)",
          },
        }}
      />

      {/* Loader */}
      <AnimatePresence>
        {loading && <AnalysisLoader />}
      </AnimatePresence>

      {/* Navigation */}
      <Navbar />

      {/* Content */}
      <main className="relative z-10">

        <HeroSection />
        <StatsSection />
        <FeatureCards />

        {/* Editor */}
        <CodeEditor code={code} setCode={setCode} />

        {/* Analyze Button */}
        <div className="flex justify-center py-12 px-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={analyzeCode}
            disabled={loading}
            className="
              relative overflow-hidden group
              rounded-2xl
              font-semibold
              transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            style={{
              padding: "18px 56px",
              fontSize: "16px",
              minWidth: "260px",
              background: loading
                ? "rgba(255,255,255,0.04)"
                : "rgba(255, 255, 255, 0.06)",
              color: loading ? "var(--text-tertiary)" : "#f0f0f5",
              border: loading ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.25)",
              boxShadow: loading
                ? "none"
                : "0 0 20px rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            {/* Hover glow overlay */}
            {!loading && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.05))",
                }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2.5">
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" opacity="0.3" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Code
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </span>
          </motion.button>
        </div>

        {/* Results */}
        <div ref={resultsRef}>
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AnalysisDashboard result={result} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default Home;