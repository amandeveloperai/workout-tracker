import { useStore } from '../context/StoreContext';
import ThemeToggle from './ThemeToggle';

const Layout = ({ children, activeTab, onTabChange }) => {
  const { theme } = useStore();
  return (
    <div className="app-container">
      <div className="page-content">
        {children}
      </div>

      <nav className="bottom-nav glass-panel">
        <button
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => onTabChange('dashboard')}
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => onTabChange('history')}
        >
          <span className="nav-icon">📅</span>
          <span className="nav-label">History</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'workout' ? 'active' : ''}`}
          onClick={() => onTabChange('workout')}
        >
          <div className="nav-fab">+</div>
        </button>

        <button
          className={`nav-item ${activeTab === 'badges' ? 'active' : ''}`}
          onClick={() => onTabChange('badges')}
        >
          <span className="nav-icon">🏆</span>
          <span className="nav-label">Badges</span>
        </button>
      </nav>

      <div className="layout-theme-toggle">
        <ThemeToggle />
      </div>

      <style>{`
        .layout-theme-toggle {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 100;
        }
        
        .bottom-nav {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 40px);
          max-width: 400px;
          height: 70px;
          border-radius: 24px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 100;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          padding: 0;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 60px;
          cursor: pointer;
        }

        .nav-item.active {
          color: var(--primary);
          transform: translateY(-2px);
        }

        .nav-icon {
          font-size: 1.5rem;
          margin-bottom: 2px;
          filter: grayscale(100%);
          transition: filter 0.3s;
        }

        .nav-item.active .nav-icon {
          filter: grayscale(0%);
        }

        .nav-fab {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2rem;
          font-weight: 300;
          box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);
          transform: translateY(-20px);
          transition: transform 0.2s;
          border: 4px solid var(--bg-app);
        }

        .nav-item:active .nav-fab {
          transform: translateY(-18px) scale(0.95);
        }
      `}</style>
    </div>
  );
};

export default Layout;
