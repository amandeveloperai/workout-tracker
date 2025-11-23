import { useStore } from '../context/StoreContext';
import { BADGES } from '../services/Gamification';

const Badges = () => {
  const { user } = useStore();
  const earnedBadges = new Set(user.badges);

  return (
    <div className="container">
      <h2 style={{ marginBottom: '20px' }}>Achievements</h2>

      <div className="badges-grid">
        {BADGES.map(badge => {
          const isUnlocked = earnedBadges.has(badge.id);
          return (
            <div key={badge.id} className={`card badge-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
              <div className="badge-icon">{badge.icon}</div>
              <div className="badge-info">
                <h3>{badge.name}</h3>
                <p>{badge.description}</p>
              </div>
              {!isUnlocked && <div className="lock-overlay">🔒</div>}
            </div>
          );
        })}
      </div>

      <style>{`
        .badges-grid {
          display: grid;
          gap: var(--spacing-md);
        }

        .badge-card {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          position: relative;
          overflow: hidden;
        }

        .badge-card.locked {
          opacity: 0.5;
          filter: grayscale(1);
        }

        .badge-icon {
          font-size: 32px;
          background: rgba(255,255,255,0.05);
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .badge-info h3 {
          font-size: 16px;
          margin-bottom: 4px;
        }

        .badge-info p {
          font-size: 12px;
          color: var(--text-muted);
        }

        .lock-overlay {
          position: absolute;
          right: 20px;
          font-size: 20px;
        }

        .badge-card.unlocked {
          border: 1px solid rgba(10, 255, 153, 0.3);
          background: linear-gradient(90deg, var(--bg-card) 0%, rgba(10, 255, 153, 0.05) 100%);
        }
      `}</style>
    </div>
  );
};

export default Badges;
