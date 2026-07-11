import Editor, { DiffEditor } from "@monaco-editor/react";
import { motion } from "framer-motion";

const sharedOptions = {
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
};

const diffEditorOptions = { ...sharedOptions, renderSideBySide: true };

function ImprovedCodeViewer({ originalCode, code, language }) {
  if (!code) return null;

  // Older persisted reports (saved before originalCode was tracked) won't have a left side —
  // fall back to a read-only single editor rather than diffing against nothing.
  const hasOriginal = Boolean(originalCode);

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
            {hasOriginal ? "Improved Code (Diff)" : "Improved Code"}
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
      {hasOriginal ? (
        <DiffEditor
          height="420px"
          language={language || "java"}
          theme="vs-dark"
          original={originalCode}
          modified={code}
          options={diffEditorOptions}
        />
      ) : (
        <Editor
          height="420px"
          language={language || "java"}
          theme="vs-dark"
          value={code}
          options={sharedOptions}
        />
      )}
    </motion.div>
  );
}

export default ImprovedCodeViewer;
