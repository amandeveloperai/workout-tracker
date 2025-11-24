import { useState } from 'react';
import { useStore } from '../context/StoreContext';

const SettingsModal = ({ onClose }) => {
    const { apiKey, saveApiKey, logout } = useStore();
    const [key, setKey] = useState(apiKey);

    const handleSave = () => {
        saveApiKey(key);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-panel">
                <div className="modal-header">
                    <h2>Settings</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="form-group">
                    <label>Gemini API Key</label>
                    <input
                        type="password"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="Enter your API Key"
                        className="api-input"
                    />
                    <p className="text-sm text-muted">
                        Required for AI Sensei & Smart Features.
                        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="link"> Get Key</a>
                    </p>
                </div>

                <div className="actions">
                    <button onClick={handleSave} className="btn-primary btn-full">Save Settings</button>
                    <button onClick={logout} className="btn-secondary btn-full mt-2">Logout</button>
                </div>
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
        }
        .modal-header {
            display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 24px;
        }
        .close-btn {
            background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer;
        }
        .api-input {
            width: 100%; padding: 12px; background: rgba(0,0,0,0.3);
            border: 1px solid var(--border); border-radius: 12px; color: white;
            margin-top: 8px;
        }
        .text-sm { font-size: 0.8rem; margin-top: 8px; color: var(--text-muted); }
        .link { color: var(--primary); text-decoration: underline; }
        .mt-2 { margin-top: 12px; }
      `}</style>
        </div>
    );
};
export default SettingsModal;
