import { useState } from "react";
import Editor, { DiffEditor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

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
  const [copied, setCopied] = useState(false);

  if (!code) return null;

  // Older persisted reports (saved before originalCode was tracked) won't have a left side —
  // fall back to a read-only single editor rather than diffing against nothing.
  const hasOriginal = Boolean(originalCode);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy to clipboard.");
    }
  };

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

        <div className="flex items-center gap-2">
          <span
            className="text-xs px-2 py-0.5 rounded-md"
            style={{
              background: "rgba(74, 222, 128, 0.08)",
              color: "#4ade80",
            }}
          >
            AI Enhanced
          </span>

          <button
            type="button"
            onClick={handleCopy}
            title="Copy enhanced code"
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-colors duration-200"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: copied ? "#4ade80" : "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            {copied ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
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
