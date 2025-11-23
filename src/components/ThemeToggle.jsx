import { useStore } from '../context/StoreContext';

const ThemeToggle = ({ className = "" }) => {
    const { theme, toggleTheme } = useStore();

    return (
        <label className={`theme-switch ${className}`}>
            <input
                type="checkbox"
                checked={theme === 'light'}
                onChange={toggleTheme}
            />
            <span className="slider round">
                <span className="icon sun">☀️</span>
                <span className="icon moon">🌙</span>
            </span>
            <style>{`
                .theme-switch {
                    position: relative;
                    display: inline-block;
                    width: 60px;
                    height: 30px;
                }

                .theme-switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: var(--bg-card);
                    border: 1px solid var(--border);
                    transition: .4s;
                    border-radius: 34px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 5px;
                    overflow: hidden;
                }

                .slider:before {
                    position: absolute;
                    content: "";
                    height: 22px;
                    width: 22px;
                    left: 4px;
                    bottom: 3px;
                    background-color: var(--primary);
                    transition: .4s;
                    border-radius: 50%;
                    z-index: 2;
                }

                input:checked + .slider {
                    background-color: var(--bg-card);
                }

                input:checked + .slider:before {
                    transform: translateX(28px);
                }

                .icon {
                    font-size: 14px;
                    z-index: 1;
                    line-height: 1;
                }
                
                .sun { margin-left: 2px; }
                .moon { margin-right: 2px; }
            `}</style>
        </label>
    );
};

export default ThemeToggle;
