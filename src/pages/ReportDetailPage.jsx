import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";
import Navbar from "../components/layout/Navbar";
import SubtleGrid from "../components/effects/BackgroundEffects";
import AnalysisDashboard from "../components/analysis/AnalysisDashboard";

function ReportDetailPage({ user, onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const response = await API.get(`/reports/${id}`);
        if (cancelled) return;
        setResult(response.data.analysis);
        setCreatedAt(response.data.createdAt);
      } catch (error) {
        toast.error(error.response?.data?.message || "That report could not be found.");
        navigate("/history");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, navigate]);

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

      <main className="relative z-10" style={{ paddingTop: "120px", paddingBottom: "60px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <Link
                to="/history"
                style={{ fontSize: "13px", color: "var(--text-tertiary)", textDecoration: "none" }}
              >
                ← Back to history
              </Link>
              {createdAt && (
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "10px" }}>
                  Analyzed on {new Date(createdAt).toLocaleString()}
                </p>
              )}
            </div>

            <Link
              to={`/passport/${id}`}
              style={{
                fontSize: "13px",
                fontWeight: 600,
                padding: "9px 18px",
                borderRadius: "10px",
                background: "rgba(99, 102, 241, 0.08)",
                border: "1px solid rgba(99, 102, 241, 0.15)",
                color: "var(--text-accent)",
                textDecoration: "none",
              }}
            >
              Generate Passport →
            </Link>
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", color: "var(--text-secondary)", marginTop: "40px" }}>
            Loading report…
          </p>
        ) : (
          result && <AnalysisDashboard result={result} />
        )}
      </main>
    </div>
  );
}

export default ReportDetailPage;
