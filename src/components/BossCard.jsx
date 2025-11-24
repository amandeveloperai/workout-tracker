import { useStore } from '../context/StoreContext';

const BossCard = () => {
    const { user } = useStore();

    // Default boss if not initialized
    const boss = user?.boss || {
        name: "Iron Titan",
        level: 1,
        hp: 1000,
        maxHp: 1000
    };

    const hpPercent = Math.max(0, (boss.hp / boss.maxHp) * 100);

    return (
        <div className="card boss-card glass-panel">
            <div className="boss-header">
                <div className="boss-info">
                    <span className="boss-level">LVL {boss.level}</span>
                    <h3>{boss.name}</h3>
                </div>
                <div className="boss-hp-text">
                    {Math.ceil(boss.hp)} / {boss.maxHp} HP
                </div>
            </div>

            <div className="hp-bar-container">
                <div className="hp-bar-fill" style={{ width: `${hpPercent}%` }}></div>
            </div>

            <div className="boss-visual">
                <div className="boss-avatar">👾</div>
            </div>

            <style>{`
        .boss-card {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(0, 0, 0, 0.4));
          border: 1px solid rgba(220, 38, 38, 0.3);
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
        }
        
        .boss-header {
          display: flex; justify-content: space-between; align-items: flex-end;
          margin-bottom: 8px;
        }
        
        .boss-level {
          font-size: 0.7rem; font-weight: 800; color: var(--error);
          letter-spacing: 1px;
        }
        
        .boss-hp-text {
          font-family: monospace; font-size: 0.9rem; color: var(--text-muted);
        }
        
        .hp-bar-container {
          width: 100%; height: 12px; background: rgba(0,0,0,0.5);
          border-radius: 6px; overflow: hidden;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
        }
        
        .hp-bar-fill {
          height: 100%; background: linear-gradient(90deg, #ef4444, #b91c1c);
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .boss-visual {
          position: absolute; right: -20px; bottom: -20px;
          font-size: 5rem; opacity: 0.2; transform: rotate(-10deg);
          pointer-events: none;
        }
      `}</style>
        </div>
    );
};

export default BossCard;
