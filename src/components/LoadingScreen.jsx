const LoadingScreen = () => (
    <div className="loading-screen">
        <div className="spinner"></div>
        <p>Summoning the Iron Titan...</p>
        <style>{`
      .loading-screen {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: #0f1115; /* Hardcoded to match theme in case var not loaded */
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        z-index: 9999;
      }
      .spinner {
        width: 40px; height: 40px;
        border: 4px solid rgba(139, 92, 246, 0.3);
        border-top: 4px solid #8B5CF6;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 16px;
      }
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      p { color: #9ca3af; font-size: 0.9rem; animation: pulse 2s infinite; }
      @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
    `}</style>
    </div>
);
export default LoadingScreen;
