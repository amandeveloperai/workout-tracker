import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { getNextWeight } from '../utils/progression';
import { calculateXP, calculateStreak, checkNewBadges, calculateLevel } from '../services/Gamification';
import ExerciseSelector from '../components/ExerciseSelector';

const WorkoutSession = ({ onFinish }) => {
  const { user, workouts, addWorkout, updateUserStats, updateBossProgress, currentWorkout, setCurrentWorkout } = useStore();

  const handleAddExercise = (name) => {
    if (!name) return;

    const targetWeight = getNextWeight(name, workouts);
    setCurrentWorkout([...currentWorkout, {
      id: Date.now(),
      name,
      targetWeight,
      sets: 3,
      reps: 10,
      weight: targetWeight || 20
    }]);
  };

  const updateExercise = (index, field, value) => {
    const newExercises = [...currentWorkout];
    newExercises[index][field] = Number(value);
    setCurrentWorkout(newExercises);
  };

  const removeExercise = (index) => {
    const newExercises = currentWorkout.filter((_, i) => i !== index);
    setCurrentWorkout(newExercises);
  };

  const handleFinishWorkout = () => {
    if (currentWorkout.length === 0) return;

    const workout = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      exercises: currentWorkout
    };

    // Calculate rewards
    const xpEarned = calculateXP(workout);
    const newStreak = calculateStreak(user.lastWorkoutDate, user.streak);
    const newXP = user.xp + xpEarned;
    const newLevel = calculateLevel(newXP);

    // Calculate Boss Damage (Volume / 50)
    const totalVolume = currentWorkout.reduce((acc, ex) => acc + (ex.sets * ex.reps * ex.weight), 0);
    const damage = Math.floor(totalVolume / 50);

    const updatedUser = {
      ...user,
      streak: newStreak,
      xp: newXP,
      level: newLevel,
      lastWorkoutDate: new Date().toISOString()
    };

    const newBadges = checkNewBadges(updatedUser, workout);

    // Save everything
    addWorkout(workout);
    updateUserStats({
      streak: newStreak,
      xp: updatedUser.xp,
      level: updatedUser.level,
      lastWorkoutDate: updatedUser.lastWorkoutDate,
      badges: [...user.badges, ...newBadges]
    });

    updateBossProgress(damage);
    setCurrentWorkout([]); // Clear workout
    onFinish();
  };

  // Calculate potential XP for display
  const xpEarned = currentWorkout.length * 10; // Simplified preview

  return (
    <div className="workout-session">
      <header className="flex-between mb-2">
        <h2>Workout Session</h2>
        <div className="xp-badge">+{xpEarned} XP</div>
      </header>

      <div className="exercise-list">
        {currentWorkout.map((exercise, index) => (
          <div key={index} className="card exercise-card glass-panel">
            <div className="exercise-header">
              <h3>{exercise.name}</h3>
              <button
                className="btn-icon delete-btn"
                onClick={() => removeExercise(index)}
              >
                ✕
              </button>
            </div>
            <div className="exercise-inputs">
              <div className="input-col">
                <label>Sets</label>
                <input
                  type="number"
                  value={exercise.sets}
                  onChange={(e) => updateExercise(index, 'sets', e.target.value)}
                  placeholder="0"
                  inputMode="numeric"
                />
              </div>
              <div className="input-col">
                <label>Reps</label>
                <input
                  type="number"
                  value={exercise.reps}
                  onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                  placeholder="0"
                  inputMode="numeric"
                />
              </div>
              <div className="input-col">
                <label>Lbs</label>
                <input
                  type="number"
                  value={exercise.weight}
                  onChange={(e) => updateExercise(index, 'weight', e.target.value)}
                  placeholder="0"
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="add-exercise-section">
        <ExerciseSelector onAdd={handleAddExercise} />
      </div>

      <div className="action-bar">
        <button onClick={handleFinishWorkout} className="btn-primary btn-full finish-btn">
          Finish Workout
        </button>
      </div>

      <style>{`
                .workout-session {
                    padding-bottom: 80px;
                }
                .xp-badge {
                    background: rgba(16, 185, 129, 0.2);
                    color: var(--accent);
                    padding: 4px 12px;
                    border-radius: var(--radius-full);
                    font-weight: 700;
                    font-size: 0.9rem;
                }
                .exercise-card {
                    margin-bottom: 16px;
                    animation: slideIn 0.3s ease-out;
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .exercise-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                }
                .exercise-header h3 {
                    font-size: 1.1rem;
                    color: white;
                }
                .delete-btn {
                    color: var(--error);
                    opacity: 0.7;
                }
                .exercise-inputs {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 12px;
                }
                .input-col label {
                    text-align: center;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .input-col input {
                    text-align: center;
                    font-size: 1.1rem;
                    font-weight: 600;
                    padding: 12px 8px;
                }
                
                .exercise-input {
                    width: 100%;
                    padding: 16px;
                    background: var(--bg-card);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-md);
                    color: white;
                    font-size: 1rem;
                }

                .action-bar {
                    position: fixed;
                    bottom: 90px; /* Above nav bar */
                    left: 50%;
                    transform: translateX(-50%);
                    width: calc(100% - 40px);
                    max-width: 400px;
                    z-index: 90;
                }
                
                .finish-btn {
                    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
                    font-size: 1.1rem;
                    padding: 16px;
                }
                
                .mb-2 { margin-bottom: 16px; }
                .mt-2 { margin-top: 12px; }
            `}</style>
    </div>
  );
};

export default WorkoutSession;
