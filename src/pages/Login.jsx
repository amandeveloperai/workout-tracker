import { useState } from 'react';
import { useStore } from '../context/StoreContext';

const Login = ({ onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loginWithGoogle } = useStore();

  const handleGoogleLogin = async () => {
    const result = await loginWithGoogle();
    if (result.success) {
      onNavigate('dashboard');
    } else {
      setError(result.error || 'Google login failed');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      const result = login(username, password);
      if (!result.success) {
        setError(result.error);
      }
    } else {
      setError('Please enter username and password');
    }
  };

  return (
    <div className="auth-container full-screen-center">
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="card auth-card glass-panel">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Continue your legendary journey.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              placeholder="e.g. Hercules"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="btn-primary btn-full mt-2">Login</button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="btn-google btn-full" onClick={handleGoogleLogin}>
          <span className="google-icon">G</span> Login with Google
        </button>

        <p className="auth-footer">
          New here? <button className="btn-link" onClick={() => onNavigate('signup')}>Create Account</button>
        </p>
      </div>

      <style>{`
  .auth - container {
  position: relative;
  overflow: hidden;
}
        
        .background - blobs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100 %;
  height: 100 %;
  z - index: -1;
  pointer - events: none;
}
        
        .blob {
  position: absolute;
  border - radius: 50 %;
  filter: blur(80px);
  opacity: 0.4;
}
        
        .blob - 1 {
  width: 300px;
  height: 300px;
  background: var(--primary);
  top: -100px;
  left: -100px;
  animation: float 10s infinite ease -in -out;
}
        
        .blob - 2 {
  width: 250px;
  height: 250px;
  background: var(--secondary);
  bottom: -50px;
  right: -50px;
  animation: float 8s infinite ease -in -out reverse;
}

@keyframes float {
  0 %, 100 % { transform: translate(0, 0); }
  50 % { transform: translate(20px, 20px); }
}

        .auth - card {
  width: 100 %;
  max - width: 400px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box - shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

        .auth - header {
  text - align: center;
  margin - bottom: 32px;
}
        
        .auth - subtitle {
  color: var(--text - muted);
  margin - top: 8px;
}

        .form - group {
  margin - bottom: 20px;
}

        .btn - full {
  width: 100 %;
  justify - content: center;
}
        
        .mt - 2 { margin - top: 16px; }

        .error - msg {
  color: var(--error);
  font - size: 12px;
  margin - top: 5px;
  text - align: center;
}

        .divider {
  margin: 24px 0;
  text - align: center;
  position: relative;
}

        .divider::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50 %;
  width: 100 %;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

        .divider span {
  background: var(--bg - card);
  padding: 0 10px;
  color: var(--text - muted);
  font - size: 12px;
  position: relative;
}

        .btn - google {
  background: white;
  color: #333;
  display: flex;
  align - items: center;
  justify - content: center;
  gap: 10px;
  font - weight: 600;
  padding: 12px;
  border - radius: var(--radius - full);
  transition: filter 0.2s;
}

        .btn - google:hover {
  filter: brightness(0.9);
}

        .google - icon {
  font - weight: 900;
  color: #4285F4;
}
        
        .auth - footer {
  text - align: center;
  margin - top: 24px;
  font - size: 0.9rem;
  color: var(--text - muted);
}
        
        .btn - link {
  background: none;
  color: var(--primary);
  padding: 0;
  font - weight: 600;
  text - decoration: underline;
}
`}</style>
    </div>
  );
};

export default Login;
