import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../services/api";
import Navbar from "../components/layout/Navbar";
import SubtleGrid from "../components/effects/BackgroundEffects";
import SkillRadarChart from "../components/analysis/SkillRadarChart";

const CATEGORIES = [
  { key: "security", label: "Security" },
  { key: "readability", label: "Readability" },
  { key: "performance", label: "Performance" },
  { key: "bugPrevention", label: "Bug Prevention" },
  { key: "bestPractices", label: "Best Practices" },
];

const LATEST_COLOR = "#6366f1";
const AVERAGE_COLOR = "#34d399";

function SkillRadarPage({ user, onLogout }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await API.get("/reports/skill-radar");
        setData(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load skill radar.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
        style={{ maxWidth: "900px", margin: "0 auto", padding: "120px 40px 60px" }}
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
          Skill Radar
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "28px" }}>
          Your latest analysis against the average of your history, across five categories.
        </p>

        {loading ? (
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Loading…</p>
        ) : !data || data.reportCount === 0 ? (
          <div className="glass" style={{ borderRadius: "16px", padding: "32px", textAlign: "center" }}>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              Run a few analyses to start building your skill radar.
            </p>
          </div>
        ) : (
          <div className="glass" style={{ borderRadius: "20px", padding: "32px" }}>
            {/* Legend */}
            <div className="flex items-center gap-6 mb-2" style={{ justifyContent: "center" }}>
              <span className="flex items-center gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: LATEST_COLOR }} />
                Latest report
              </span>
              <span className="flex items-center gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: AVERAGE_COLOR }} />
                Average of {data.reportCount} report{data.reportCount === 1 ? "" : "s"}
              </span>
            </div>

            {/* Chart */}
            <div className="flex justify-center" style={{ padding: "16px 0 24px" }}>
              <SkillRadarChart
                series={[
                  { name: "Latest", color: LATEST_COLOR, values: data.latest },
                  { name: "Average", color: AVERAGE_COLOR, values: data.average },
                ]}
              />
            </div>

            {/* Numeric breakdown — radar charts alone are hard to read exact values from */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.key}
                  className="surface"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 16px",
                    borderRadius: "10px",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "var(--text-primary)", fontWeight: 500 }}>
                    {cat.label}
                  </span>
                  <span style={{ display: "flex", gap: "16px", fontSize: "13px" }}>
                    <span style={{ color: LATEST_COLOR }}>{data.latest[cat.key]?.toFixed(1)}</span>
                    <span style={{ color: AVERAGE_COLOR }}>{data.average[cat.key]?.toFixed(1)}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default SkillRadarPage;
