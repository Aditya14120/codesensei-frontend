import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";

function ImprovedCodeViewer({ code }) {
  if (!code) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="glass rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#4ade80" }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <h3
            className="text-sm font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Improved Code
          </h3>
        </div>

        <span
          className="text-xs px-2 py-0.5 rounded-md"
          style={{
            background: "rgba(74, 222, 128, 0.08)",
            color: "#4ade80",
          }}
        >
          AI Enhanced
        </span>
      </div>

      {/* Editor */}
      <Editor
        height="420px"
        defaultLanguage="java"
        theme="vs-dark"
        value={code}
        options={{
          readOnly: true,
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
          fontLigatures: true,
          lineHeight: 22,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          renderLineHighlight: "none",
          padding: { top: 16, bottom: 16 },
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
        }}
      />
    </motion.div>
  );
}

export default ImprovedCodeViewer;