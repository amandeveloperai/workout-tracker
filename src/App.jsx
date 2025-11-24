import { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import WorkoutSession from './pages/WorkoutSession';
import WorkoutHistory from './pages/WorkoutHistory';
import Badges from './pages/Badges';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

const AppContent = () => {
  const { isAuthenticated } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authPage, setAuthPage] = useState('landing'); // landing, login, signup

  if (!isAuthenticated) {
    if (authPage === 'login') return <Login onNavigate={setAuthPage} />;
    if (authPage === 'signup') return <Signup onNavigate={setAuthPage} />;
    return <LandingPage onGetStarted={setAuthPage} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onStartWorkout={() => setActiveTab('workout')} />;
      case 'workout':
        return <WorkoutSession onFinish={() => setActiveTab('dashboard')} />;
      case 'history':
        return <WorkoutHistory />;
      case 'badges':
        return <Badges />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;
