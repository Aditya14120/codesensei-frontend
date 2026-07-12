import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const LANGUAGE_LABELS = { java: "Java", python: "Python", c: "C", cpp: "C++" };

// Public page — no login required, so it deliberately uses a bare axios call instead of the
// shared API client (whose 401 interceptor assumes an authenticated session).
function VerifyPassportPage() {
  const { id } = useParams();

  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
        const response = await axios.get(`${baseURL}/reports/verify/${id}`);
        if (!cancelled) setResult(response.data);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)", padding: "24px" }}
    >
      <div
        className="glass"
        style={{ width: "100%", maxWidth: "420px", borderRadius: "20px", padding: "32px", textAlign: "center" }}
      >
        <Link
          to="/"
          style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", textDecoration: "none" }}
        >
          Code<span style={{ color: "var(--accent-light)" }}>Sensei</span>
        </Link>

        <div style={{ marginTop: "24px" }}>
          {loading ? (
            <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Verifying…</p>
          ) : error || !result ? (
            <>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>✕</div>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                No passport found for this link.
              </p>
            </>
          ) : (
            <>
              <div style={{ fontSize: "32px", marginBottom: "8px", color: "#4ade80" }}>✓</div>
              <p style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>
                Verified CodeSensei Passport
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", textAlign: "left" }}>
                <div className="flex items-center justify-between surface" style={{ padding: "10px 14px", borderRadius: "10px" }}>
                  <span style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>Language</span>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>
                    {LANGUAGE_LABELS[result.language] || result.language}
                  </span>
                </div>
                <div className="flex items-center justify-between surface" style={{ padding: "10px 14px", borderRadius: "10px" }}>
                  <span style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>Score</span>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>{result.score?.toFixed(1)} / 10</span>
                </div>
                <div className="flex items-center justify-between surface" style={{ padding: "10px 14px", borderRadius: "10px" }}>
                  <span style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>Date</span>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>
                    {new Date(result.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyPassportPage;
