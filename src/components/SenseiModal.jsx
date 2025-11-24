import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { generateWorkoutPlan } from '../services/aiService';

const SenseiModal = ({ onClose, onAccept }) => {
    const { apiKey, user, workouts } = useStore();
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState(null);
    const [error, setError] = useState('');
    const [goal, setGoal] = useState('Strength');

    const handleGenerate = async () => {
        if (!apiKey) {
            setError('Please set your API Key in Settings first.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const context = {
                level: user.level,
                goal: goal,
                recentWorkouts: workouts.slice(0, 5)
            };

            const generatedPlan = await generateWorkoutPlan(apiKey, context);
            setPlan(generatedPlan);
        } catch (err) {
            setError('Failed to generate plan. Check your API Key.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-panel">
                <div className="modal-header">
                    <h2>Sensei AI</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {!plan ? (
                    <>
                        <p className="mb-4">I will design a custom workout for you based on your history and level.</p>

                        <div className="form-group mb-4">
                            <label>Today's Focus</label>
                            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="select-input">
                                <option value="Strength">Strength & Power</option>
                                <option value="Hypertrophy">Muscle Building</option>
                                <option value="Endurance">Endurance & Cardio</option>
                                <option value="Recovery">Active Recovery</option>
                            </select>
                        </div>

                        {error && <p className="error-msg mb-4">{error}</p>}

                        <button
                            onClick={handleGenerate}
                            className="btn-primary btn-full"
                            disabled={loading}
                        >
                            {loading ? 'Consulting the Scrolls...' : 'Generate Plan'}
                        </button>
                    </>
                ) : (
                    <div className="plan-preview">
                        <h3>{plan.name}</h3>
                        <p className="plan-desc">{plan.description}</p>

                        <div className="plan-exercises">
                            {plan.exercises.map((ex, i) => (
                                <div key={i} className="plan-item">
                                    <span className="ex-name">{ex.name}</span>
                                    <span className="ex-details">{ex.sets}x{ex.reps} @ {ex.weight}kg</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => onAccept(plan.exercises)}
                            className="btn-primary btn-full mt-4"
                        >
                            Start This Workout
                        </button>
                        <button
                            onClick={() => setPlan(null)}
                            className="btn-secondary btn-full mt-2"
                        >
                            Regenerate
                        </button>
                    </div>
                )}
            </div>
            <style>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.8); z-index: 200;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(5px);
        }
        .modal-content {
            width: 90%; max-width: 400px; padding: 24px; border-radius: 24px;
            border: 1px solid rgba(255,255,255,0.1);
            max-height: 80vh; overflow-y: auto;
        }
        .modal-header {
            display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 24px;
        }
        .close-btn {
            background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer;
        }
        .select-input {
            width: 100%; padding: 12px; background: rgba(0,0,0,0.3);
            border: 1px solid var(--border); border-radius: 12px; color: white;
            margin-top: 8px;
        }
        .mb-4 { margin-bottom: 16px; }
        .mt-4 { margin-top: 16px; }
        .mt-2 { margin-top: 8px; }
        .error-msg { color: var(--error); font-size: 0.9rem; }
        
        .plan-desc { color: var(--text-muted); font-style: italic; margin-bottom: 16px; }
        .plan-item {
            display: flex; justify-content: space-between;
            padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .ex-name { font-weight: 600; }
        .ex-details { color: var(--primary); }
      `}</style>
        </div>
    );
};
export default SenseiModal;
