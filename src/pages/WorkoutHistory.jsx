import { useStore } from '../context/StoreContext';

const WorkoutHistory = () => {
    const { workouts } = useStore();

    // Sort workouts by date (newest first)
    const sortedWorkouts = [...workouts].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="history-page">
            <header className="header">
                <h1>Workout History</h1>
                <p className="subtitle">Your legacy in the making</p>
            </header>

            <div className="history-list">
                {sortedWorkouts.length === 0 ? (
                    <div className="empty-state glass-panel">
                        <span className="empty-icon">📝</span>
                        <p>No workouts recorded yet.</p>
                        <p className="sub-text">Complete your first workout to see it here.</p>
                    </div>
                ) : (
                    sortedWorkouts.map((workout, index) => (
                        <div key={index} className="history-card glass-panel">
                            <div className="card-header">
                                <div className="date-info">
                                    <span className="day">{new Date(workout.date).toLocaleDateString(undefined, { weekday: 'short' })}</span>
                                    <span className="date">{new Date(workout.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                </div>
                                <div className="xp-badge">+{workout.xpEarned} XP</div>
                            </div>

                            <div className="card-content">
                                <div className="exercise-count">
                                    <span className="icon">🏋️</span>
                                    <span>{workout.exercises.length} Exercises</span>
                                </div>
                                <div className="exercises-preview">
                                    {workout.exercises.slice(0, 3).map((ex, i) => (
                                        <span key={i} className="ex-tag">{ex.name}</span>
                                    ))}
                                    {workout.exercises.length > 3 && <span className="ex-tag more">+{workout.exercises.length - 3}</span>}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <style>{`
        .header {
          margin-bottom: 24px;
          padding-top: 10px;
        }
        .header h1 {
          font-size: 1.75rem;
          margin-bottom: 4px;
        }
        .subtitle {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-bottom: 100px;
        }

        .history-card {
          padding: 20px;
          border-radius: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }

        .date-info {
          display: flex;
          flex-direction: column;
        }

        .day {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 600;
        }

        .date {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .xp-badge {
          background: rgba(245, 158, 11, 0.1);
          color: var(--accent);
          padding: 4px 12px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .exercise-count {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-main);
          font-weight: 500;
        }

        .exercises-preview {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .ex-tag {
          font-size: 0.75rem;
          padding: 4px 10px;
          background: rgba(255,255,255,0.05);
          border-radius: 6px;
          color: var(--text-muted);
        }

        .ex-tag.more {
          background: rgba(255,255,255,0.1);
          color: var(--text-main);
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          border-radius: 16px;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 16px;
          display: block;
          opacity: 0.5;
        }

        .sub-text {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-top: 8px;
        }
      `}</style>
        </div>
    );
};

export default WorkoutHistory;
