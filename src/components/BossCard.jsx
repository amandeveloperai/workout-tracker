import { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';

const BossCard = () => {
  const { user } = useStore();
  const [showDamage, setShowDamage] = useState(false);
  const [damageAmount, setDamageAmount] = useState(0);
  const [prevHp, setPrevHp] = useState(null);

  const boss = user?.boss || { name: "Iron Titan", level: 1, hp: 1000, maxHp: 1000 };
  const hpPercent = Math.max(0, (boss.hp / boss.maxHp) * 100);

  // Detect damage dealt
  useEffect(() => {
    if (prevHp !== null && prevHp > boss.hp) {
      const damage = prevHp - boss.hp;
      setDamageAmount(damage);
      setShowDamage(true);
      setTimeout(() => setShowDamage(false), 2000);
    }
    setPrevHp(boss.hp);
  }, [boss.hp]);

  const getBossEmoji = (level) => {
    const emojis = ['👾', '🤖', '👹', '👺', '🐉', '🦖', '🦕', '🐲'];
    return emojis[Math.min(level - 1, emojis.length - 1)];
  };

  return (
    <div className="boss-battle-container">
      <div className="boss-header-section">
        <div className="boss-title">
          <span className="boss-icon">⚔️</span>
          <h3>Boss Battle</h3>
        </div>
        <div className="boss-level-badge">
          <span>Level {boss.level}</span>
        </div>
      </div>

      <div className="boss-card-main glass-panel">
        <div className="boss-visual-container">
          <div className={`boss-avatar ${hpPercent <= 25 ? 'boss-critical' : ''}`}>
            {getBossEmoji(boss.level)}
          </div>
          {showDamage && (
            <div className="damage-number">-{damageAmount}</div>
          )}
        </div>

        <div className="boss-info">
          <h2 className="boss-name">{boss.name}</h2>
          <div className="hp-display">
            <div className="hp-text">
              <span className="hp-current">{Math.ceil(boss.hp)}</span>
              <span className="hp-separator">/</span>
              <span className="hp-max">{boss.maxHp}</span>
              <span className="hp-label">HP</span>
            </div>
          </div>

          <div className="hp-bar-container">
            <div className="hp-bar-bg">
              <div
                className="hp-bar-fill"
                style={{ width: `${hpPercent}%` }}
              >
                <div className="hp-bar-shine"></div>
              </div>
            </div>
            <div className="hp-percentage">{Math.round(hpPercent)}%</div>
          </div>
        </div>
      </div>

      <div className="boss-info-tip glass-panel">
        <span className="tip-icon">💡</span>
        <p>Complete workouts to deal damage! Higher volume = more damage.</p>
      </div>

      <style>{`
        .boss-battle-container {
          margin: 0 0 24px 0;
        }

        .boss-header-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .boss-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .boss-title h3 {
          font-size: 1.2rem;
          color: white;
          margin: 0;
        }
        .boss-icon {
          font-size: 1.5rem;
          animation: pulse 2s infinite;
        }

        .boss-level-badge {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
          color: white;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
        }

        .boss-card-main {
          background: linear-gradient(135deg, rgba(20, 5, 5, 0.8), rgba(40, 10, 10, 0.6));
          border: 2px solid rgba(239, 68, 68, 0.3);
          border-radius: 20px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          margin-bottom: 12px;
        }
        .boss-card-main::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #ef4444, #f97316, #ef4444);
          animation: shimmer 3s infinite;
        }

        .boss-visual-container {
          text-align: center;
          position: relative;
          margin-bottom: 20px;
        }

        .boss-avatar {
          font-size: 6rem;
          line-height: 1;
          display: inline-block;
          animation: float 3s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.5));
        }
        .boss-avatar.boss-critical {
          animation: shake 0.5s infinite, float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .damage-number {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2.5rem;
          font-weight: 900;
          color: #fbbf24;
          text-shadow: 
            0 0 10px #ef4444,
            0 0 20px #dc2626,
            2px 2px 4px rgba(0,0,0,0.8);
          animation: damageFloat 2s ease-out;
          pointer-events: none;
        }

        @keyframes damageFloat {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(0) scale(0.5);
          }
          20% {
            opacity: 1;
            transform: translateX(-50%) translateY(-20px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-80px) scale(1);
          }
        }

        .boss-info {
          text-align: center;
        }

        .boss-name {
          font-size: 1.8rem;
          color: #ef4444;
          margin: 0 0 16px 0;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 2px 10px rgba(239, 68, 68, 0.5);
        }

        .hp-display {
          margin-bottom: 12px;
        }

        .hp-text {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 4px;
          font-family: 'Courier New', monospace;
        }
        .hp-current {
          font-size: 2rem;
          font-weight: 900;
          color: #ef4444;
        }
        .hp-separator {
          font-size: 1.5rem;
          color: var(--text-muted);
        }
        .hp-max {
          font-size: 1.2rem;
          color: var(--text-muted);
        }
        .hp-label {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-left: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .hp-bar-container {
          position: relative;
        }

        .hp-bar-bg {
          height: 24px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .hp-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #dc2626, #ef4444, #f87171);
          border-radius: 12px;
          transition: width 0.5s ease-out;
          position: relative;
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.6);
        }

        .hp-bar-shine {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(180deg, rgba(255,255,255,0.3), transparent);
          border-radius: 12px 12px 0 0;
        }

        .hp-percentage {
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
          font-size: 0.75rem;
          font-weight: 700;
          color: white;
          text-shadow: 0 1px 3px rgba(0,0,0,0.8);
        }

        .boss-info-tip {
          padding: 12px 16px;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .boss-info-tip p {
          margin: 0;
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.4;
        }
        .tip-icon {
          font-size: 1.2rem;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};

export default BossCard;
