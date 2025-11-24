import { useState, useEffect } from 'react';

const QUOTES = [
  "The only bad workout is the one that didn't happen.",
  "Suffer now and live the rest of your life as a champion. - Muhammad Ali",
  "Light weight baby! - Ronnie Coleman",
  "Your body can stand almost anything. It’s your mind that you have to convince.",
  "Success starts with self-discipline.",
  "Pain is weakness leaving the body.",
  "The body achieves what the mind believes.",
  "Don't stop when you're tired. Stop when you're done.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Discipline is doing what needs to be done, even if you don't want to do it."
];

const LoadingScreen = () => {
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    const interval = setInterval(() => {
      setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p className="loading-text">Summoning the Iron Titan...</p>
      <p className="quote-text">"{quote}"</p>
      <style>{`
        .loading-screen {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: #0f1115;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          z-index: 9999;
          padding: 20px;
          text-align: center;
        }
        .spinner {
          width: 50px; height: 50px;
          border: 4px solid rgba(139, 92, 246, 0.3);
          border-top: 4px solid #8B5CF6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 24px;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .loading-text { 
          color: #9ca3af; 
          font-size: 1rem; 
          margin-bottom: 16px;
          animation: pulse 2s infinite; 
        }
        .quote-text {
          color: white;
          font-size: 1.1rem;
          font-style: italic;
          max-width: 80%;
          line-height: 1.5;
          font-weight: 500;
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};
export default LoadingScreen;
