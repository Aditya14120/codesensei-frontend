import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SubtleGrid from "../components/effects/BackgroundEffects";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import FeatureCards from "../components/home/FeatureCards";

function LandingPage({ user, onLoginClick, onLogout, onGetStarted }) {
  return (
    <div
      className="min-h-screen relative"
      style={{
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      {/* Background */}
      <SubtleGrid />

      {/* Navigation */}
      <Navbar
        user={user}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
        links={["Features"]}
      />

      {/* Content */}
      <main className="relative z-10">
        <HeroSection onGetStarted={onGetStarted} />
        <StatsSection />
        <FeatureCards />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
