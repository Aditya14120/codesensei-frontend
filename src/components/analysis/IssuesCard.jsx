import { motion } from "framer-motion";

function IssuesCard({ pmd, checkstyle, spotbugs, bugs, codeSmells, performanceIssues, securityIssues }) {

  const sections = [
    { label: "Bugs", items: bugs, color: "#f87171" },
    { label: "Code Smells", items: codeSmells, color: "#fbbf24" },
    { label: "Performance", items: performanceIssues, color: "#60a5fa" },
    { label: "Security", items: securityIssues, color: "#f472b6" },
    { label: "PMD", items: pmd, color: "var(--text-highlight)" },
    { label: "Checkstyle", items: checkstyle, color: "var(--text-highlight)" },
    { label: "SpotBugs", items: spotbugs, color: "var(--text-highlight)" },
  ];

  const activeSections = sections.filter(
    (s) => s.items && s.items.length > 0
  );

  const totalIssues = activeSections.reduce(
    (acc, s) => acc + s.items.length, 0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-accent)" }}>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <h3
          className="text-sm font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Issues Detected
        </h3>
        <span
          className="ml-auto text-xs px-2 py-0.5 rounded-full"
          style={{
            background: totalIssues > 0 ? "rgba(248, 113, 113, 0.1)" : "rgba(74, 222, 128, 0.1)",
            color: totalIssues > 0 ? "#f87171" : "#4ade80",
          }}
        >
          {totalIssues} {totalIssues === 1 ? "issue" : "issues"}
        </span>
      </div>

      {activeSections.length === 0 ? (
        <div
          className="flex items-center gap-2 text-sm py-2"
          style={{ color: "#4ade80" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          No issues detected. Clean code!
        </div>
      ) : (
        <div className="space-y-5">
          {activeSections.map((section) => (
            <div key={section.label}>
              {/* Section label */}
              <div className="flex items-center gap-2 mb-2.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: section.color }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {section.label}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  ({section.items.length})
                </span>
              </div>

              {/* Issues list */}
              <div className="space-y-1.5 pl-4">
                {section.items.map((issue, idx) => (
                  <div
                    key={idx}
                    className="text-sm py-1.5 px-3 rounded-lg"
                    style={{
                      color: "var(--text-secondary)",
                      background: "rgba(255, 255, 255, 0.02)",
                      borderLeft: `2px solid ${section.color}`,
                    }}
                  >
                    {issue}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default IssuesCard;