import { motion } from "framer-motion";

function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ paddingTop: "160px", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "36px" }}
        >
          <span
            className="relative overflow-hidden"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              background: "rgba(200, 200, 210, 0.06)",
              border: "1px solid rgba(200, 200, 210, 0.15)",
              color: "var(--accent-lighter)",
            }}
          >
            {/* Shimmer overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "60%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(220,220,230,0.1), transparent)",
                animation: "badge-shimmer 3s ease-in-out infinite",
              }}
            />
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            AI-Powered Code Intelligence
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: "clamp(36px, 4.5vw, 64px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "28px",
          }}
        >
          <span className="text-gradient animate-gradient" style={{
            backgroundImage: "linear-gradient(135deg, #ffffff 0%, #e8e8f0 30%, #d0d0d8 60%, #b8b8c0 100%)",
            backgroundSize: "200% 200%",
          }}>
            Write Better Code.
          </span>
          <br />
          <span className="text-gradient animate-gradient" style={{
            backgroundImage: "linear-gradient(135deg, #d0d0d8 0%, #e8e8f0 30%, #ffffff 60%, #e8e8f0 100%)",
            backgroundSize: "200% 200%",
            animationDelay: "1s",
          }}>
            Ship With Confidence.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            fontSize: "17px",
            lineHeight: 1.75,
            maxWidth: "560px",
            color: "var(--text-secondary)",
            marginBottom: "40px",
          }}
        >
          CodeSensei analyzes your Java code with Gemini AI and static analysis
          engines. Get instant quality scores, bug detection, performance insights,
          and production-ready improved code — in seconds.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px" }}
        >
          {/* Primary CTA */}
          <a
            href="#editor"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 28px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              background: "#f0f0f5",
              color: "#0a0a0d",
              textDecoration: "none",
              boxShadow: "0 0 20px rgba(240,240,245,0.1), 0 4px 20px rgba(0,0,0,0.5)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.boxShadow = "0 0 35px rgba(255,255,255,0.15), 0 8px 30px rgba(0,0,0,0.6)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f0f0f5";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(240,240,245,0.1), 0 4px 20px rgba(0,0,0,0.5)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Start Analyzing
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          {/* Secondary CTA */}
          <a
            href="#features"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 28px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 500,
              background: "rgba(255, 255, 255, 0.04)",
              color: "var(--text-secondary)",
              textDecoration: "none",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(99, 102, 241, 0.08)";
              e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.25)";
              e.currentTarget.style.color = "var(--text-accent)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Learn More
          </a>
        </motion.div>
      </div>

      {/* Background gradient accents */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "500px",
          pointerEvents: "none",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </section>
  );
}

export default HeroSection;
