import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import API from "../services/api";
import { detectLanguage } from "../utils/detectLanguage";

import Navbar from "../components/layout/Navbar";
import SubtleGrid from "../components/effects/BackgroundEffects";
import CodeEditor from "../components/editor/CodeEditor";
import { LANGUAGES } from "../constants/languages";
import AnalysisDashboard from "../components/analysis/AnalysisDashboard";
import AnalysisLoader from "../components/effects/AnalysisLoader";

const DEFAULT_SNIPPETS = {
  java: `public class Demo {

    public static void main(String[] args) {

        System.out.println("Hello CodeSensei");

    }

}`,
  python: `def main():
    print("Hello CodeSensei")


if __name__ == "__main__":
    main()`,
  c: `#include <stdio.h>

int main(void) {
    printf("Hello CodeSensei\\n");
    return 0;
}`,
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello CodeSensei" << std::endl;
    return 0;
}`,
};

function Dashboard({ user, onLogout }) {
  // TranslatePage hands off a translated snippet via navigate("/dashboard", { state }) —
  // prefill from it once, then behave like a normal Dashboard visit.
  const location = useLocation();
  const handoff = location.state;

  const [language, setLanguage] = useState(handoff?.language || "java");
  const [code, setCode] = useState(handoff?.code || DEFAULT_SNIPPETS[handoff?.language] || DEFAULT_SNIPPETS.java);
  const [mode, setMode] = useState("professional");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const resultsRef = useRef(null);

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
    setCode(DEFAULT_SNIPPETS[nextLanguage] || "");
  };

  // Runs on every edit (not just paste) — cheap regex checks, and only acts
  // when detection is confident and disagrees with the current dropdown, so
  // it corrects a wrong manual pick without fighting the user mid-edit.
  const handleCodeChange = (nextCode) => {
    setCode(nextCode);

    const detected = detectLanguage(nextCode);
    if (detected && detected !== language) {
      setLanguage(detected);
      const label = LANGUAGES.find((l) => l.id === detected)?.label || detected;
      toast(`Detected ${label} — switched the language.`, { icon: "🔍" });
    }
  };

  const analyzeCode = async () => {
    if (!code || code.trim().length === 0) {
      toast.error("Please enter some code first.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await API.post("/code/analyze", { code, language, mode });

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

      {/* Loader */}
      <AnimatePresence>
        {loading && <AnalysisLoader />}
      </AnimatePresence>

      {/* Navigation */}
      <Navbar
        user={user}
        onLogout={onLogout}
        routeLinks={[
          { label: "Editor", to: "/dashboard" },
          { label: "Translate", to: "/translate" },
          { label: "Skills", to: "/skills" },
          { label: "History", to: "/history" },
        ]}
      />

      {/* Content */}
      <main className="relative z-10" style={{ paddingTop: "120px" }}>

        {/* Dashboard header */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "6px" }}>
            Welcome back{user?.name ? `, ${user.name}` : ""}
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            Paste your code, pick a language, and get an instant AI-powered review.
          </p>
        </div>

        {/* Editor */}
        <CodeEditor
          code={code}
          setCode={handleCodeChange}
          language={language}
          setLanguage={handleLanguageChange}
        />

        {/* Review style toggle */}
        <div className="flex justify-center pt-8 px-6">
          <div
            style={{
              display: "inline-flex",
              gap: "4px",
              padding: "4px",
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            {[
              { id: "professional", label: "Professional" },
              { id: "roast", label: "Roast 🔥" },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setMode(option.id)}
                title={
                  option.id === "roast"
                    ? "Same analysis, delivered as a sarcastic (but accurate) roast."
                    : "Straightforward, professional review."
                }
                style={{
                  padding: "8px 18px",
                  borderRadius: "7px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  background: mode === option.id ? "rgba(255, 255, 255, 0.08)" : "transparent",
                  color: mode === option.id ? "var(--text-primary)" : "var(--text-tertiary)",
                  transition: "all 0.2s ease",
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Analyze Button */}
        <div className="flex justify-center pt-6 pb-12 px-6">
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

export default Dashboard;
