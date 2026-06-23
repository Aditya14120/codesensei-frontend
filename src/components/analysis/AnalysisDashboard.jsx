import { motion } from "framer-motion";
import ScoreCard from "./ScoreCard";
import SummaryCard from "./SummaryCard";
import ImprovementsCard from "./ImprovementsCard";
import IssuesCard from "./IssuesCard";
import ImprovedCodeViewer from "./ImprovedCodeViewer";
import LearningTipsCard from "./LearningTipsCard";

function AnalysisDashboard({ result }) {
  if (!result) return null;

  return (
    <section id="analysis" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2
            className="text-2xl font-bold tracking-tight mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Analysis Results
          </h2>
          <p
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            AI-powered analysis complete. Here is your detailed report.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="space-y-6">

          {/* Row 1: Score + Summary */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ScoreCard score={result.score} />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <SummaryCard summary={result.summary} />
              <ImprovementsCard improvements={result.improvements} />
            </div>
          </div>

          {/* Row 2: Issues */}
          <IssuesCard
            pmd={result.pmdResults}
            checkstyle={result.checkstyleResults}
            spotbugs={result.spotBugsResults}
            bugs={result.bugs}
            codeSmells={result.codeSmells}
            performanceIssues={result.performanceIssues}
            securityIssues={result.securityIssues}
          />

          {/* Row 3: Improved Code */}
          <ImprovedCodeViewer code={result.improvedCode} />

          {/* Row 4: Learning Tips */}
          <LearningTipsCard tips={result.learningTips} />

        </div>
      </div>
    </section>
  );
}

export default AnalysisDashboard;
