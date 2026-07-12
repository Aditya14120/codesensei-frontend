import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toPng } from "html-to-image";
import toast from "react-hot-toast";

import API from "../services/api";
import Navbar from "../components/layout/Navbar";
import SubtleGrid from "../components/effects/BackgroundEffects";

const CATEGORY_LABELS = {
  security: "Security",
  readability: "Readability",
  performance: "Performance",
  bugPrevention: "Bug Prevention",
  bestPractices: "Best Practices",
};

const LANGUAGE_LABELS = { java: "Java", python: "Python", c: "C", cpp: "C++" };

function rankCategories(scores) {
  return Object.entries(scores)
    .filter(([key]) => key in CATEGORY_LABELS)
    .sort((a, b) => b[1] - a[1]);
}

function PassportPage({ user, onLogout }) {
  const { id } = useParams();
  const cardRef = useRef(null);

  const [report, setReport] = useState(null);
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const [reportRes, scoresRes] = await Promise.all([
          API.get(`/reports/${id}`),
          API.get(`/reports/${id}/category-scores`),
        ]);
        if (cancelled) return;
        setReport(reportRes.data);
        setScores(scoresRes.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not load this report's passport.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const verificationUrl = `${window.location.origin}/verify/${id}`;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setDownloading(true);
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `codesensei-passport-${id.slice(0, 8)}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      toast.error("Couldn't generate the image. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(verificationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy the link.");
    }
  };

  const ranked = scores ? rankCategories(scores) : [];
  const strengths = ranked.slice(0, 2);
  const weaknesses = ranked.slice(-2).reverse();
  const score = report?.analysis?.score ?? 0;
  const language = LANGUAGE_LABELS[report?.analysis?.language] || report?.analysis?.language;

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
        style={{ maxWidth: "600px", margin: "0 auto", padding: "120px 40px 60px" }}
      >
        <Link to={`/history/${id}`} style={{ fontSize: "13px", color: "var(--text-tertiary)", textDecoration: "none" }}>
          ← Back to report
        </Link>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "24px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginTop: "16px",
            marginBottom: "24px",
          }}
        >
          Code Quality Passport
        </h1>

        {loading ? (
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Loading…</p>
        ) : !report || !scores ? (
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Passport unavailable.</p>
        ) : (
          <>
            {/* Card — this exact node is what gets rasterized to PNG */}
            <div
              ref={cardRef}
              style={{
                borderRadius: "24px",
                padding: "36px",
                background: "linear-gradient(160deg, #0d0d12, #050507)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: "28px" }}>
                <span style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em" }}>
                  Code<span style={{ color: "var(--accent-light)" }}>Sensei</span>
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "5px 12px",
                    borderRadius: "999px",
                    background: "rgba(99,102,241,0.1)",
                    color: "#a5a8f5",
                  }}
                >
                  {language}
                </span>
              </div>

              <div className="flex items-end gap-2" style={{ marginBottom: "28px" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "56px", fontWeight: 700, lineHeight: 1 }}>
                  {score.toFixed(1)}
                </span>
                <span style={{ fontSize: "16px", color: "var(--text-tertiary)", marginBottom: "6px" }}>/ 10</span>
              </div>

              <div className="grid grid-cols-2" style={{ gap: "20px", marginBottom: "28px" }}>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4ade80", marginBottom: "10px" }}>
                    Strengths
                  </div>
                  {strengths.map(([key, value]) => (
                    <div key={key} style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>
                      {CATEGORY_LABELS[key]} <span style={{ color: "var(--text-tertiary)" }}>({value.toFixed(1)})</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#f59e0b", marginBottom: "10px" }}>
                    Growth Areas
                  </div>
                  {weaknesses.map(([key, value]) => (
                    <div key={key} style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>
                      {CATEGORY_LABELS[key]} <span style={{ color: "var(--text-tertiary)" }}>({value.toFixed(1)})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="flex items-center justify-between"
                style={{ paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                  {new Date(report.createdAt).toLocaleDateString()}
                </span>
                <span style={{ fontSize: "11px", color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                  #{id.slice(0, 8)}
                </span>
              </div>
            </div>

            {/* Actions — deliberately outside cardRef so they never appear in the PNG */}
            <div className="flex items-center gap-3 flex-wrap" style={{ marginTop: "20px" }}>
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: downloading ? "rgba(255,255,255,0.04)" : "#f0f0f5",
                  color: downloading ? "var(--text-tertiary)" : "#0a0a0d",
                  border: "none",
                  cursor: downloading ? "not-allowed" : "pointer",
                }}
              >
                {downloading ? "Generating…" : "Download PNG"}
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 500,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: copied ? "#4ade80" : "var(--text-secondary)",
                  cursor: "pointer",
                }}
              >
                {copied ? "Copied verification link" : "Copy verification link"}
              </button>
            </div>

            <p style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "12px" }}>
              Anyone with the verification link can confirm this passport's language, score, and
              date against our records — without seeing your code.
            </p>
          </>
        )}
      </main>
    </div>
  );
}

export default PassportPage;
