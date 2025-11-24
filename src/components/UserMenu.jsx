import { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';

const UserMenu = ({ onOpenSettings }) => {
    const { user, logout } = useStore();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getInitials = (name) => name ? name.charAt(0).toUpperCase() : 'A';

    return (
        <div className="user-menu-container" ref={menuRef}>
            <button
                className="avatar-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="User Menu"
            >
                <div className="avatar-circle">
                    {getInitials(user.name)}
                </div>
            </button>

            {isOpen && (
                <div className="dropdown-menu glass-panel">
                    <div className="menu-header">
                        <p className="menu-label">Signed in as</p>
                        <p className="menu-username">{user.name}</p>
                    </div>

                    <div className="menu-divider"></div>

                    <button
                        className="menu-item"
                        onClick={() => {
                            onOpenSettings();
                            setIsOpen(false);
                        }}
                    >
                        <span className="menu-icon">⚙️</span>
                        Settings
                    </button>

                    <div className="menu-divider"></div>

                    <button
                        className="menu-item danger"
                        onClick={() => {
                            logout();
                            setIsOpen(false);
                        }}
                    >
                        <span className="menu-icon">🚪</span>
                        Log Out
                    </button>
                </div>
            )}

            <style>{`
        .user-menu-container {
          position: relative;
        }
        
        .avatar-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          transition: transform 0.2s;
        }
        .avatar-btn:hover {
          transform: scale(1.05);
        }
        
        .avatar-circle {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.2rem;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
          border: 2px solid rgba(255,255,255,0.1);
        }

        .dropdown-menu {
          position: absolute;
          top: 120%;
          right: 0;
          width: 240px;
          background: rgba(20, 20, 25, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 8px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          z-index: 100;
          animation: menuSlide 0.2s ease-out;
          transform-origin: top right;
        }
        
        @keyframes menuSlide {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .menu-header {
          padding: 16px;
        }
        .menu-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .menu-username {
          font-weight: 700;
          color: white;
          font-size: 1.1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .menu-divider {
          height: 1px;
          background: rgba(255,255,255,0.1);
          margin: 4px 0;
        }

        .menu-item {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 14px 16px;
          background: none;
          border: none;
          color: var(--text-main);
          font-size: 1rem;
          cursor: pointer;
          border-radius: 12px;
          transition: background 0.2s;
          text-align: left;
        }
        .menu-item:hover {
          background: rgba(255,255,255,0.05);
        }
        .menu-item.danger {
          color: #ef4444;
        }
        .menu-item.danger:hover {
          background: rgba(239, 68, 68, 0.1);
        }
        .menu-icon {
          margin-right: 16px;
          font-size: 1.2rem;
        }
      `}</style>
        </div>
    );
};

export default UserMenu;
