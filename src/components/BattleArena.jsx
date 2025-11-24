import { useState } from 'react';
import { useStore } from '../context/StoreContext';

const BattleArena = () => {
  const { user } = useStore();
  const [showInfo, setShowInfo] = useState(false);

  // RPG Logic
  const getUserAvatar = (level) => {
    if (level >= 50) return { icon: '👑', title: 'Godlike' };
    if (level >= 30) return { icon: '🐉', title: 'Legend' };
    if (level >= 20) return { icon: '🧙‍♂️', title: 'Grandmaster' };
    if (level >= 10) return { icon: '🥷', title: 'Master' };
    if (level >= 5) return { icon: '⚔️', title: 'Warrior' };
    return { icon: '🐣', title: 'Novice' };
  };

  const userAvatar = getUserAvatar(user.level);

  // Calculate Stats
  // Strength based on Level (primary) and Streak (bonus)
  // Level 1 vs Boss Lvl 1 (50 Def) -> User needs ~Level 2 to overpower
  const userStrength = (user.level * 25) + (user.streak * 5);
  const boss = user.boss || { name: "Iron Titan", level: 1, hp: 1000, maxHp: 1000 };
  const bossDefense = boss.level * 50;

  // Battle Status
  const isOverpowered = userStrength > bossDefense;
  const hpPercent = Math.max(0, (boss.hp / boss.maxHp) * 100);

  return (
    <div className="battle-arena glass-panel">
      <div className="arena-header">
        <h3>⚔️ Battle Arena</h3>
        <button
          className="info-btn"
          onClick={() => setShowInfo(!showInfo)}
          aria-label="Battle Info"
        >
          ℹ️
        </button>
      </div>

      {showInfo && (
        <div className="arena-info">
          <p><strong>How to Play:</strong></p>
          <ul>
            <li>Your <strong>Avatar</strong> evolves as you level up.</li>
            <li><strong>Strength</strong> comes from XP and Streaks.</li>
            <li>Deal damage by completing workouts!</li>
            <li>If <strong>Strength {'>'} Defense</strong>, you deal <strong>CRITICAL</strong> damage!</li>
          </ul>
        </div>
      )}

      <div className="fighters-container">
        {/* User Side */}
        <div className="fighter-card user-card">
          <div className="fighter-avatar-wrapper">
            <div className="fighter-avatar user-anim">{userAvatar.icon}</div>
            <div className="fighter-level">Lvl {user.level}</div>
          </div>
          <div className="fighter-details">
            <div className="fighter-name">{user.name}</div>
            <div className="fighter-class">{userAvatar.title}</div>
            <div className="stat-row">
              <span className="stat-icon">⚔️</span>
              <span className="stat-label">STR:</span>
              <span className="stat-value">{userStrength}</span>
            </div>
          </div>
        </div>

        {/* VS Badge */}
        <div className="vs-badge">
          <span>VS</span>
        </div>

        {/* Boss Side */}
        <div className="fighter-card boss-card-mini">
          <div className="fighter-avatar-wrapper">
            <div className={`fighter-avatar boss-anim ${hpPercent < 25 ? 'critical' : ''}`}>
              {getBossEmoji(boss.level)}
            </div>
            <div className="fighter-level boss-lvl">Lvl {boss.level}</div>
          </div>
          <div className="fighter-details">
            <div className="fighter-name boss-text">{boss.name}</div>
            <div className="hp-bar-mini">
              <div className="hp-fill" style={{ width: `${hpPercent}%` }}></div>
            </div>
            <div className="stat-row">
              <span className="stat-icon">🛡️</span>
              <span className="stat-label">DEF:</span>
              <span className="stat-value">{bossDefense}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Battle Status Message */}
      <div className="battle-status">
        {isOverpowered ? (
          <div className="status-msg advantage">
            🔥 You are overpowering the boss! (+50% DMG)
          </div>
        ) : (
          <div className="status-msg disadvantage">
            ⚠️ Boss is tough! Keep training to gain Strength.
          </div>
        )}
      </div>

      <style>{`
        .battle-arena {
          padding: 20px;
          margin-bottom: 24px;
          background: var(--bg-card);
          border: 1px solid rgba(139, 92, 246, 0.2);
        }

        .arena-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .arena-header h3 {
          margin: 0;
          color: #fbbf24;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 1rem;
        }

        .info-btn {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .info-btn:hover { opacity: 1; }

        .arena-info {
          background: rgba(139, 92, 246, 0.1);
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .arena-info ul { padding-left: 20px; margin: 8px 0 0 0; }

        .fighters-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          position: relative;
        }

        .fighter-card {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 12px;
          border-radius: 16px;
          background: var(--bg-app);
          transition: transform 0.2s;
        }
        .user-card { border: 1px solid rgba(139, 92, 246, 0.3); }
        .boss-card-mini { border: 1px solid rgba(239, 68, 68, 0.3); }

        .fighter-avatar-wrapper {
          position: relative;
          margin-bottom: 8px;
        }

        .fighter-avatar {
          font-size: 3rem;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
        }
        .user-anim { animation: float 3s ease-in-out infinite; }
        .boss-anim { animation: float 4s ease-in-out infinite reverse; }
        .boss-anim.critical { animation: shake 0.5s infinite; }

        .fighter-level {
          position: absolute;
          bottom: -4px;
          right: -4px;
          background: #333;
          color: white;
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: bold;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .boss-lvl { background: #ef4444; }

        .fighter-name {
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 80px;
        }
        .boss-text { color: #ef4444; }

        .fighter-class {
          font-size: 0.75rem;
          color: var(--primary);
          margin-bottom: 6px;
        }

        .stat-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          font-size: 0.85rem;
          font-size: 0.85rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          padding: 4px 8px;
          border-radius: 8px;
        }
        .stat-value { font-weight: bold; color: var(--text-main); }

        .hp-bar-mini {
          width: 100%;
          height: 6px;
          background: rgba(0,0,0,0.5);
          border-radius: 3px;
          margin: 4px 0 8px 0;
          overflow: hidden;
        }
        .hp-fill {
          height: 100%;
          background: #ef4444;
          transition: width 0.5s;
        }

        .vs-badge {
          background: linear-gradient(135deg, #fbbf24, #d97706);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 0.8rem;
          color: black;
          box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
          z-index: 10;
          flex-shrink: 0;
        }

        .battle-status {
          margin-top: 16px;
          text-align: center;
        }
        .status-msg {
          font-size: 0.85rem;
          padding: 8px;
          border-radius: 8px;
        }
        .advantage {
          background: rgba(34, 197, 94, 0.1);
          color: #4ade80;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }
        .disadvantage {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
      `}</style>
    </div>
  );
};

const getBossEmoji = (level) => {
  const emojis = ['👾', '🤖', '👹', '👺', '🐉', '🦖', '🦕', '🐲'];
  return emojis[Math.min(level - 1, emojis.length - 1)];
};

export default BattleArena;
