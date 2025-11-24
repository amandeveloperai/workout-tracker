import { useState, useRef, useEffect } from 'react';
import { DEFAULT_EXERCISES } from '../data/exercises';

const ExerciseSelector = ({ onAdd }) => {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (inputValue.trim()) {
            const filtered = DEFAULT_EXERCISES.filter(ex =>
                ex.toLowerCase().includes(inputValue.toLowerCase())
            ).slice(0, 8); // Limit to 8 results
            setFilteredExercises(filtered);
            setIsOpen(filtered.length > 0);
        } else {
            setFilteredExercises([]);
            setIsOpen(false);
        }
        setSelectedIndex(0);
    }, [inputValue]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === 'Enter') {
                handleAdd();
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < filteredExercises.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredExercises[selectedIndex]) {
                    selectExercise(filteredExercises[selectedIndex]);
                } else {
                    handleAdd();
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
        }
    };

    const selectExercise = (exercise) => {
        setInputValue(exercise);
        setIsOpen(false);
        inputRef.current?.focus();
    };

    const handleAdd = () => {
        if (inputValue.trim()) {
            onAdd(inputValue.trim());
            setInputValue('');
            setIsOpen(false);
        }
    };

    return (
        <div className="exercise-selector" ref={dropdownRef}>
            <div className="selector-input-group">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => inputValue && setIsOpen(true)}
                    placeholder="Type or search exercise..."
                    className="exercise-input-modern"
                />
                <button
                    onClick={handleAdd}
                    disabled={!inputValue.trim()}
                    className="btn-add-exercise"
                >
                    <span className="add-icon">+</span>
                </button>
            </div>

            {isOpen && filteredExercises.length > 0 && (
                <div className="exercise-dropdown glass-panel">
                    {filteredExercises.map((exercise, index) => (
                        <div
                            key={exercise}
                            className={`dropdown-item ${index === selectedIndex ? 'selected' : ''}`}
                            onClick={() => selectExercise(exercise)}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            <span className="exercise-icon">💪</span>
                            {exercise}
                        </div>
                    ))}
                </div>
            )}

            <style>{`
        .exercise-selector {
          position: relative;
          width: 100%;
        }

        .selector-input-group {
          display: flex;
          gap: 12px;
          align-items: stretch;
        }

        .exercise-input-modern {
          flex: 1;
          padding: 16px 20px;
          background: var(--bg-card);
          border: 2px solid rgba(139, 92, 246, 0.3);
          border-radius: 16px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s;
          outline: none;
        }
        .exercise-input-modern:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
        }
        .exercise-input-modern::placeholder {
          color: var(--text-muted);
        }

        .btn-add-exercise {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border: none;
          border-radius: 16px;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
        }
        .btn-add-exercise:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
        }
        .btn-add-exercise:active:not(:disabled) {
          transform: scale(0.98);
        }
        .btn-add-exercise:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .add-icon {
          font-size: 2rem;
          line-height: 1;
        }

        .exercise-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: rgba(20, 20, 25, 0.98);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 16px;
          padding: 8px;
          max-height: 320px;
          overflow-y: auto;
          z-index: 100;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          animation: slideDown 0.2s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-item {
          padding: 14px 16px;
          cursor: pointer;
          border-radius: 12px;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-main);
          font-size: 1rem;
        }
        .dropdown-item:hover,
        .dropdown-item.selected {
          background: rgba(139, 92, 246, 0.15);
          color: white;
        }
        .exercise-icon {
          font-size: 1.2rem;
          opacity: 0.7;
        }
        .dropdown-item.selected .exercise-icon,
        .dropdown-item:hover .exercise-icon {
          opacity: 1;
        }

        .exercise-dropdown::-webkit-scrollbar {
          width: 8px;
        }
        .exercise-dropdown::-webkit-scrollbar-track {
          background: transparent;
        }
        .exercise-dropdown::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 4px;
        }
        .exercise-dropdown::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
      `}</style>
        </div>
    );
};

export default ExerciseSelector;
