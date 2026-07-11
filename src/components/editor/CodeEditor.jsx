import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";

export const LANGUAGES = [
  { id: "java", label: "Java", fileName: "Main.java", color: "#f89820" },
  { id: "python", label: "Python", fileName: "main.py", color: "#3776ab" },
  { id: "c", label: "C", fileName: "main.c", color: "#5c6bc0" },
  { id: "cpp", label: "C++", fileName: "main.cpp", color: "#00599c" },
];

function CodeEditor({ code, setCode, language, setLanguage }) {
  const activeLanguage = LANGUAGES.find((l) => l.id === language) || LANGUAGES[0];

  return (
    <section id="editor" style={{ padding: "60px 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "32px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
            <div style={{ height: "2px", width: "32px", borderRadius: "999px", background: "var(--gradient-accent)" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent-light)" }}>
              Editor
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "8px" }}>
            Paste your code
          </h2>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Drop your code below, pick a language, and let AI analyze it.
          </p>
        </motion.div>

        {/* Editor Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass"
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            position: "relative",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 0 40px rgba(99, 102, 241, 0.05), 0 16px 64px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Gradient top border */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              zIndex: 10,
              background: "linear-gradient(90deg, transparent, #6366f1, #8b5cf6, #a855f7, transparent)",
              opacity: 0.7,
            }}
          />

          {/* Top Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 20px",
              background: "rgba(255, 255, 255, 0.02)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            {/* Language dot + file name */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: activeLanguage.color,
                  boxShadow: `0 0 8px ${activeLanguage.color}80`,
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  borderRadius: "6px",
                  background: "rgba(99, 102, 241, 0.06)",
                  border: "1px solid rgba(99, 102, 241, 0.12)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--accent-lighter)" }}>
                  {activeLanguage.fileName}
                </span>
              </div>
            </div>

            {/* Language Selector */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 10px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: activeLanguage.color }} />
              <select
                value={activeLanguage.id}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "var(--text-tertiary)",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id} style={{ background: "#111118", color: "#e5e5e5" }}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Monaco Editor */}
          <Editor
            height="380px"
            language={activeLanguage.id}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
              fontLigatures: true,
              lineHeight: 22,
              letterSpacing: 0.3,
              minimap: { enabled: false },
              smoothScrolling: true,
              padding: { top: 16, bottom: 16 },
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: "on",
              roundedSelection: true,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              renderLineHighlight: "line",
              renderLineHighlightOnlyWhenFocus: true,
              scrollbar: {
                verticalScrollbarSize: 6,
                horizontalScrollbarSize: 6,
              },
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              overviewRulerBorder: false,
              contextmenu: true,
              suggest: {
                showKeywords: true,
              },
            }}
          />
        </motion.div>

      </div>
    </section>
  );
}

export default CodeEditor;
