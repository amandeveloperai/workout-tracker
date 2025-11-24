import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { getTodayDate, isSameDay } from '../utils/dateUtils';
import { BADGES, calculateLevel } from '../services/Gamification';
import BossCard from '../components/BossCard';
import SettingsModal from '../components/SettingsModal';
import SenseiModal from '../components/SenseiModal';
import UserMenu from '../components/UserMenu';

const Dashboard = ({ onNavigate, onStartWorkout }) => {
  const { user, logout, workouts, setCurrentWorkout } = useStore();
  const [showSettings, setShowSettings] = useState(false);
  const [showSensei, setShowSensei] = useState(false);

  // Calculate progress to next level
  const level = calculateLevel(user.xp);
  const nextLevelXp = (level + 1) * 1000;
  const currentLevelBaseXp = level * 1000;
  const progress = ((user.xp - currentLevelBaseXp) / (nextLevelXp - currentLevelBaseXp)) * 100;

  // Find next potential badges (first 2 locked ones)
  const earnedBadgesSet = new Set(user.badges);
  const nextBadges = BADGES.filter(b => !earnedBadgesSet.has(b.id)).slice(0, 2);

  const handleSenseiAccept = (exercises) => {
    setCurrentWorkout(exercises);
    setShowSensei(false);
    onStartWorkout();
  };

  return (
    <div className="dashboard">
      <header className="header flex-between">
        <div>
          <h1 className="greeting">Hello, <span className="text-gradient">{user.name}</span></h1>
          <p className="subtitle">Ready to conquer today?</p>
        </div>
        <div className="header-actions">
          <UserMenu onOpenSettings={() => setShowSettings(true)} />
        </div>
      </header>

      <BossCard />

      <div className="ai-actions mb-4">
        <button className="btn-sensei glass-panel" onClick={() => setShowSensei(true)}>
          <span className="sensei-icon">🧙‍♂️</span>
          <div className="sensei-text">
            <h3>Ask Sensei</h3>
            <p>Get a personalized AI workout plan</p>
          </div>
          <span className="arrow">→</span>
        </button>
      </div>

      <div className="stats-grid">
        <div className="card stat-card glass-panel">
          <span className="stat-icon">🔥</span>
          <div className="stat-info">
            <h3>{user.streak}</h3>
            <p>Day Streak</p>
          </div>
        </div>
        <div className="card stat-card glass-panel">
          <span className="stat-icon">⚡</span>
          <div className="stat-info">
            <h3>{user.xp}</h3>
            <p>Total XP</p>
          </div>
        </div>
        <div className="card stat-card glass-panel full-width">
          <div className="level-info flex-between">
            <span className="stat-icon">🛡️</span>
            <div className="stat-text">
              <h3>Level {level}</h3>
              <p>{nextLevelXp - user.xp} XP to next level</p>
            </div>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="flex-between mb-2">
          <h2>Next Milestones</h2>
          <span className="see-all" onClick={() => onNavigate('badges')}>View All</span>
        </div>
        <div className="badges-scroll">
          {nextBadges.length > 0 ? (
            nextBadges.map(badge => (
              <div key={badge.id} className="badge-card locked glass-panel">
                <div className="badge-icon">{badge.icon}</div>
                <div className="badge-details">
                  <h4>{badge.name}</h4>
                  <p>{badge.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>You're a legend! All current badges earned.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {workouts.length === 0 ? (
            <div className="card empty-card">
              <p>No workouts yet. Start your legend today!</p>
              <button onClick={() => onStartWorkout()} className="btn-primary mt-2">
                Start First Workout
              </button>
            </div>
          ) : (
            workouts.slice(0, 3).map((workout, index) => (
              <div key={index} className="card workout-card glass-panel">
                <div className="workout-header">
                  <span className="workout-date">{new Date(workout.date).toLocaleDateString()}</span>
                  <span className="workout-xp">+{workout.xpEarned || 0} XP</span>
                </div>
                <div className="workout-summary">
                  {workout.exercises.length} Exercises Completed
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showSensei && <SenseiModal onClose={() => setShowSensei(false)} onAccept={handleSenseiAccept} />}

      <style>{`
                .header {
                    margin-bottom: 24px;
                    padding-top: 10px;
                }
                .greeting {
                    font-size: 1.75rem;
                    margin-bottom: 4px;
                }
                .subtitle {
                    color: var(--text-muted);
                    font-size: 0.9rem;
                }
                .header-actions {
                    display: flex; gap: 12px;
                }
                
                .btn-sensei {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    padding: 16px;
                    border: 1px solid var(--primary);
                    background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(0,0,0,0));
                    border-radius: 16px;
                    cursor: pointer;
                    transition: transform 0.2s;
                    text-align: left;
                }
                .btn-sensei:active { transform: scale(0.98); }
                .sensei-icon { font-size: 2rem; margin-right: 16px; }
                .sensei-text h3 { color: var(--primary); margin-bottom: 4px; }
                .sensei-text p { color: var(--text-muted); font-size: 0.8rem; }
                .arrow { margin-left: auto; color: var(--primary); font-size: 1.5rem; }
                
                .stats-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-bottom: 32px;
                }
                .stat-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    padding: 16px;
                    margin-bottom: 0;
                    background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
                }
                .stat-card.full-width {
                    grid-column: span 2;
                    align-items: stretch;
                    text-align: left;
                }
                .stat-icon {
                    font-size: 2rem;
                    margin-bottom: 8px;
                    filter: drop-shadow(0 0 10px rgba(255,255,255,0.2));
                }
                .stat-info h3 {
                    font-size: 1.5rem;
                    color: white;
                    margin-bottom: 2px;
                }
                .stat-info p {
                    font-size: 0.8rem;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .level-info {
                    margin-bottom: 12px;
                }
                .level-info .stat-icon {
                    font-size: 2.5rem;
                    margin-bottom: 0;
                    margin-right: 16px;
                }
                .progress-bar-bg {
                    height: 8px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 4px;
                    overflow: hidden;
                }
                .progress-bar-fill {
                    height: 100%;
                    background: linear-gradient(90deg, var(--primary), var(--secondary));
                    border-radius: 4px;
                    transition: width 1s ease-out;
                }

                .section {
                    margin-bottom: 32px;
                }
                .mb-2 { margin-bottom: 16px; }
                .mb-4 { margin-bottom: 24px; }
                .mt-2 { margin-top: 16px; }
                
                .see-all {
                    color: var(--primary);
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                }

                .badges-scroll {
                    display: flex;
                    gap: 12px;
                    overflow-x: auto;
                    padding-bottom: 10px;
                    margin: 0 -20px;
                    padding: 0 20px 20px 20px;
                    -webkit-overflow-scrolling: touch;
                }
                .badge-card {
                    min-width: 160px;
                    padding: 16px;
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .badge-card.locked {
                    opacity: 0.7;
                }
                .badge-icon {
                    font-size: 2.5rem;
                    margin-bottom: 12px;
                    filter: grayscale(100%);
                }
                .badge-details h4 {
                    font-size: 0.9rem;
                    margin-bottom: 4px;
                    color: var(--text-main);
                }
                .badge-details p {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    line-height: 1.3;
                }

                .workout-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px;
                }
                .workout-date {
                    font-weight: 600;
                    color: var(--text-main);
                }
                .workout-xp {
                    color: var(--accent);
                    font-weight: 700;
                    font-size: 0.9rem;
                }
                .workout-summary {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    margin-top: 4px;
                }
                .empty-card {
                    text-align: center;
                    padding: 32px;
                    color: var(--text-muted);
                }
            `}</style>
    </div>
  );
};

export default Dashboard;
