import { useStore } from '../context/StoreContext';
import ThemeToggle from '../components/ThemeToggle';

const LandingPage = ({ onGetStarted }) => {
  const { theme } = useStore();
  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="logo">💪 Shokunin</div>
        <div className="nav-actions">
          <ThemeToggle />
          <button className="btn-login" onClick={() => onGetStarted('login')}>Login</button>
        </div>
      </nav>

      <section className="hero">
        <h1 className="hero-title">Build Your <span className="highlight">Daily Routine</span></h1>
        <p className="hero-subtitle">
          Master the art of consistency. Track your workouts, maintain your streak,
          and forge discipline like a true craftsman.
        </p>
        <button className="btn-primary btn-hero" onClick={() => onGetStarted('signup')}>
          Start Your Journey
        </button>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Track Progress</h3>
          <p>Log every rep and set. Watch your strength grow over time.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔥</div>
          <h3>Maintain Streaks</h3>
          <p>Consistency is key. Keep your flame alive day after day.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🏆</div>
          <h3>Earn Glory</h3>
          <p>Unlock badges like "Hercules Strength" and "Titan Endurance".</p>
        </div>
      </section>

      <style>{`
        .landing-container {
          min-height: 100vh;
          background: var(--bg-app);
          color: var(--text-main);
          padding: 0 var(--spacing-md);
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .landing-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          max-width: 1200px;
          margin: 0 auto;
        }

        .logo {
          font-weight: 800;
          font-size: 20px;
          color: var(--primary);
        }

        .nav-actions {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .theme-toggle-landing {
            background: transparent;
            border: 1px solid rgba(255,255,255,0.2);
            color: var(--text-main);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1.2rem;
            transition: all 0.2s;
        }

        .theme-toggle-landing:hover {
            background: rgba(255,255,255,0.1);
            border-color: var(--primary);
        }

        .btn-login {
          background: transparent;
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 20px;
          border-radius: var(--radius-full);
          transition: all 0.2s;
        }

        .btn-login:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .hero {
          text-align: center;
          padding: 80px 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 48px;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .highlight {
          color: var(--primary);
          text-shadow: 0 0 20px var(--primary-glow);
        }

        .hero-subtitle {
          font-size: 18px;
          color: var(--text-muted);
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .btn-hero {
          font-size: 18px;
          padding: 16px 40px;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          max-width: 1000px;
          margin: 40px auto;
          padding-bottom: 80px;
        }

        .feature-card {
          background: var(--bg-card);
          padding: 30px;
          border-radius: var(--radius-md);
          text-align: center;
          border: 1px solid rgba(255,255,255,0.05);
          transition: transform 0.2s;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
        }

        .feature-icon {
          font-size: 40px;
          margin-bottom: 20px;
        }

        .feature-card h3 {
          margin-bottom: 10px;
          color: var(--text-main);
        }

        .feature-card p {
          color: var(--text-muted);
          font-size: 14px;
        }

        @media (max-width: 600px) {
          .hero-title {
            font-size: 36px;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
