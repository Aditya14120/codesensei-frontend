import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import API from "../services/api";
import Navbar from "../components/layout/Navbar";
import SubtleGrid from "../components/effects/BackgroundEffects";

const PAGE_SIZE = 10;

const LANGUAGE_OPTIONS = [
  { id: "", label: "All languages" },
  { id: "java", label: "Java" },
  { id: "python", label: "Python" },
  { id: "c", label: "C" },
  { id: "cpp", label: "C++" },
];

const controlStyle = {
  padding: "10px 14px",
  borderRadius: "10px",
  fontSize: "13px",
  background: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  color: "var(--text-primary)",
  outline: "none",
};

function HistoryPage({ user, onLogout }) {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("");

  const fetchReports = useCallback(
    async (pageToLoad) => {
      try {
        setLoading(true);
        const params = { page: pageToLoad, size: PAGE_SIZE, sortBy: "createdAt", direction: "desc" };
        if (language) params.language = language;

        const response = await API.get("/reports", { params });
        setReports(response.data.content);
        setTotalPages(response.data.totalPages);
        setPage(response.data.number);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load history.");
      } finally {
        setLoading(false);
      }
    },
    [language]
  );

  useEffect(() => {
    fetchReports(0);
  }, [fetchReports]);

  const filteredReports = reports.filter((report) => {
    if (!search.trim()) return true;
    const term = search.trim().toLowerCase();
    return (
      report.fileName?.toLowerCase().includes(term) ||
      report.summaryExcerpt?.toLowerCase().includes(term)
    );
  });

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
          { label: "History", to: "/history" },
        ]}
      />

      <main
        className="relative z-10"
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "120px 40px 60px" }}
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
          Analysis History
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "28px" }}>
          Every review you've run, searchable and filterable.
        </p>

        {/* Search + filter */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by file name or summary…"
            style={{ ...controlStyle, flex: 1, minWidth: "220px" }}
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ ...controlStyle, minWidth: "160px" }}
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* List */}
        {loading ? (
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Loading…</p>
        ) : filteredReports.length === 0 ? (
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            No analysis reports yet. Run an analysis to see it here.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredReports.map((report) => (
              <motion.div
                key={report.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => navigate(`/history/${report.id}`)}
                className="glass"
                style={{
                  padding: "18px 22px",
                  borderRadius: "14px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>
                    {report.fileName}
                    <span style={{ color: "var(--text-tertiary)", fontWeight: 400 }}>
                      {" "}
                      · {report.language}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "var(--text-secondary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {report.summaryExcerpt}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: "15px" }}>
                    {report.score != null ? report.score.toFixed(1) : "—"}/10
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
                    {new Date(report.createdAt).toLocaleString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "32px" }}>
            <button
              onClick={() => fetchReports(page - 1)}
              disabled={page <= 0}
              style={{
                ...controlStyle,
                cursor: page <= 0 ? "not-allowed" : "pointer",
                opacity: page <= 0 ? 0.4 : 1,
              }}
            >
              Previous
            </button>
            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => fetchReports(page + 1)}
              disabled={page + 1 >= totalPages}
              style={{
                ...controlStyle,
                cursor: page + 1 >= totalPages ? "not-allowed" : "pointer",
                opacity: page + 1 >= totalPages ? 0.4 : 1,
              }}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default HistoryPage;
