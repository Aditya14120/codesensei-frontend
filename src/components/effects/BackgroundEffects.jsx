function SubtleGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated gradient orbs */}
      <div
        className="animate-float animate-glow-pulse"
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,200,210,0.05) 0%, rgba(200,200,210,0.01) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="animate-float-reverse animate-glow-pulse"
        style={{
          position: "absolute",
          top: "30%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(120,0,0,0.07) 0%, rgba(80,0,0,0.02) 40%, transparent 70%)",
          filter: "blur(80px)",
          animationDelay: "2s",
        }}
      />
      <div
        className="animate-float animate-glow-pulse"
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "30%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,180,190,0.04) 0%, rgba(180,180,190,0.01) 40%, transparent 70%)",
          filter: "blur(80px)",
          animationDelay: "4s",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

export default SubtleGrid;
