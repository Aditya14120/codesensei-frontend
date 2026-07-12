import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import API from "../services/api";
import Navbar from "../components/layout/Navbar";
import SubtleGrid from "../components/effects/BackgroundEffects";
import { LANGUAGES } from "../constants/languages";

const DEFAULT_SOURCE = `public class Demo {

    public static void main(String[] args) {

        System.out.println("Hello CodeSensei");

    }

}`;

const editorOptions = {
  fontSize: 14,
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
  fontLigatures: true,
  lineHeight: 22,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  automaticLayout: true,
  padding: { top: 16, bottom: 16 },
  scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
  overviewRulerLanes: 0,
  hideCursorInOverviewRuler: true,
  overviewRulerBorder: false,
};

const selectStyle = {
  padding: "8px 12px",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: 500,
  background: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  color: "var(--text-primary)",
  outline: "none",
  cursor: "pointer",
};

function TranslatePage({ user, onLogout }) {
  const navigate = useNavigate();

  const [sourceLanguage, setSourceLanguage] = useState("java");
  const [targetLanguage, setTargetLanguage] = useState("python");
  const [code, setCode] = useState(DEFAULT_SOURCE);
  const [translatedCode, setTranslatedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!code || code.trim().length === 0) {
      toast.error("Please enter some code first.");
      return;
    }
    if (sourceLanguage === targetLanguage) {
      toast.error("Source and target language must be different.");
      return;
    }

    try {
      setLoading(true);
      setTranslatedCode("");

      const response = await API.post("/code/translate", {
        code,
        sourceLanguage,
        targetLanguage,
      });

      setTranslatedCode(response.data.translatedCode);
      toast.success("Translation complete");
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Translation failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy to clipboard.");
    }
  };

  const handleAnalyzeTranslated = () => {
    navigate("/dashboard", { state: { code: translatedCode, language: targetLanguage } });
  };

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <SubtleGrid />

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

      <main
        className="relative z-10"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px 40px 60px" }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "6px",
          }}
        >
          Cross-Language Translator
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "28px" }}>
          Translate between Java, Python, C, and C++ — then send the result straight to analysis.
        </p>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
          <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)} style={selectStyle}>
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id} style={{ background: "#111118", color: "#e5e5e5" }}>
                {lang.label}
              </option>
            ))}
          </select>

          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>

          <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)} style={selectStyle}>
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id} style={{ background: "#111118", color: "#e5e5e5" }}>
                {lang.label}
              </option>
            ))}
          </select>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTranslate}
            disabled={loading}
            style={{
              marginLeft: "auto",
              padding: "10px 24px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: 600,
              background: loading ? "rgba(255,255,255,0.04)" : "#f0f0f5",
              color: loading ? "var(--text-tertiary)" : "#0a0a0d",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Translating…" : "Translate"}
          </motion.button>
        </div>

        {/* Side-by-side editors */}
        <div className="grid md:grid-cols-2" style={{ gap: "16px" }}>
          <div className="surface" style={{ borderRadius: "16px", overflow: "hidden" }}>
            <div
              style={{
                padding: "10px 16px",
                fontSize: "12px",
                fontWeight: 500,
                color: "var(--text-tertiary)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              Source — {LANGUAGES.find((l) => l.id === sourceLanguage)?.label}
            </div>
            <Editor
              height="440px"
              language={sourceLanguage}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={editorOptions}
            />
          </div>

          <div className="surface" style={{ borderRadius: "16px", overflow: "hidden" }}>
            <div
              className="flex items-center justify-between"
              style={{
                padding: "10px 16px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-tertiary)" }}>
                Translated — {LANGUAGES.find((l) => l.id === targetLanguage)?.label}
              </span>

              {translatedCode && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-xs px-2.5 py-1 rounded-md"
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      color: copied ? "#4ade80" : "var(--text-secondary)",
                      cursor: "pointer",
                    }}
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <button
                    type="button"
                    onClick={handleAnalyzeTranslated}
                    className="text-xs px-2.5 py-1 rounded-md"
                    style={{
                      background: "rgba(99, 102, 241, 0.08)",
                      border: "1px solid rgba(99, 102, 241, 0.15)",
                      color: "var(--text-accent)",
                      cursor: "pointer",
                    }}
                  >
                    Analyze this code →
                  </button>
                </div>
              )}
            </div>
            <Editor
              height="440px"
              language={targetLanguage}
              theme="vs-dark"
              value={translatedCode || "// Translated code will appear here"}
              options={{ ...editorOptions, readOnly: true }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default TranslatePage;
