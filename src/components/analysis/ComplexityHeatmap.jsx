import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";

const SEVERITY_CLASS = {
  LOW: "heatmap-line-low",
  MEDIUM: "heatmap-line-medium",
  HIGH: "heatmap-line-high",
};

function ComplexityHeatmap({ code, language, heatmap }) {
  if (!code || !heatmap || heatmap.length === 0) return null;

  const highCount = heatmap.filter((h) => h.severity === "HIGH").length;
  const mediumCount = heatmap.filter((h) => h.severity === "MEDIUM").length;

  const handleMount = (editor, monaco) => {
    const decorations = heatmap.map((entry) => ({
      range: new monaco.Range(entry.line, 1, entry.line, 1),
      options: {
        isWholeLine: true,
        className: SEVERITY_CLASS[entry.severity] || "",
        hoverMessage: { value: entry.reason },
      },
    }));

    editor.createDecorationsCollection(decorations);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3 flex-wrap gap-2"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Complexity Heatmap
        </h3>

        <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-tertiary)" }}>
          <span className="flex items-center gap-1.5">
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34d399" }} />
            Low
          </span>
          <span className="flex items-center gap-1.5">
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#facc15" }} />
            Medium ({mediumCount})
          </span>
          <span className="flex items-center gap-1.5">
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f87171" }} />
            High ({highCount})
          </span>
        </div>
      </div>

      {/* Editor with decorations */}
      <Editor
        height="380px"
        language={language || "java"}
        theme="vs-dark"
        value={code}
        onMount={handleMount}
        options={{
          readOnly: true,
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
        }}
      />
    </motion.div>
  );
}

export default ComplexityHeatmap;
