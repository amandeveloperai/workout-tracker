const BossVictoryModal = ({ boss, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="victory-modal glass-panel" onClick={(e) => e.stopPropagation()}>
                <div className="victory-animation">
                    <div className="trophy">🏆</div>
                    <div className="sparkles">✨✨✨</div>
                </div>

                <h2 className="victory-title">BOSS DEFEATED!</h2>
                <p className="victory-subtitle">{boss.name} has been vanquished!</p>

                <div className="victory-stats">
                    <div className="stat-item">
                        <span className="stat-label">Boss Level</span>
                        <span className="stat-value">{boss.level - 1}</span>
                    </div>
                    <div className="stat-divider">→</div>
                    <div className="stat-item">
                        <span className="stat-label">New Boss Level</span>
                        <span className="stat-value highlight">{boss.level}</span>
                    </div>
                </div>

                <div className="new-boss-preview">
                    <p className="preview-label">Next Challenge</p>
                    <p className="preview-name">{boss.name}</p>
                    <p className="preview-hp">{boss.maxHp} HP</p>
                </div>

                <button className="btn-primary btn-full victory-btn" onClick={onClose}>
                    Continue Your Journey
                </button>

                <style>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
            animation: fadeIn 0.3s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .victory-modal {
            max-width: 400px;
            width: 100%;
            padding: 40px 32px;
            background: rgba(20, 20, 25, 0.95);
            backdrop-filter: blur(20px);
            border: 2px solid rgba(139, 92, 246, 0.5);
            border-radius: 24px;
            text-align: center;
            animation: slideUp 0.4s ease-out;
            box-shadow: 0 20px 60px rgba(139, 92, 246, 0.3);
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .victory-animation {
            position: relative;
            margin-bottom: 24px;
          }

          .trophy {
            font-size: 5rem;
            animation: bounce 1s infinite;
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }

          .sparkles {
            font-size: 2rem;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            animation: sparkle 2s infinite;
          }

          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: translateX(-50%) scale(0.5); }
            50% { opacity: 1; transform: translateX(-50%) scale(1.2); }
          }

          .victory-title {
            font-size: 2rem;
            color: #fbbf24;
            margin: 0 0 8px 0;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
          }

          .victory-subtitle {
            color: var(--text-muted);
            font-size: 1.1rem;
            margin: 0 0 32px 0;
          }

          .victory-stats {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            margin-bottom: 32px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 16px;
          }

          .stat-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .stat-label {
            font-size: 0.75rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .stat-value {
            font-size: 1.8rem;
            font-weight: 900;
            color: white;
          }

          .stat-value.highlight {
            color: var(--primary);
            animation: glow 1s infinite;
          }

          @keyframes glow {
            0%, 100% { text-shadow: 0 0 10px rgba(139, 92, 246, 0.5); }
            50% { text-shadow: 0 0 20px rgba(139, 92, 246, 1); }
          }

          .stat-divider {
            font-size: 2rem;
            color: var(--primary);
          }

          .new-boss-preview {
            padding: 20px;
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05));
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 16px;
            margin-bottom: 24px;
          }

          .preview-label {
            font-size: 0.75rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 0 0 8px 0;
          }

          .preview-name {
            font-size: 1.5rem;
            color: #ef4444;
            font-weight: 900;
            margin: 0 0 4px 0;
          }

          .preview-hp {
            font-size: 1rem;
            color: var(--text-muted);
            margin: 0;
            font-family: 'Courier New', monospace;
          }

          .victory-btn {
            font-size: 1.1rem;
            padding: 16px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
          }
        `}</style>
            </div>
        </div>
    );
};

export default BossVictoryModal;
