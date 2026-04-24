import { useState } from 'react';
import LoginScreen from './pages/LoginScreen';
import ManagerDashboard from './pages/ManagerDashboard';
import HRDashboard from './pages/HRDashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (currentUser.role === 'manager') {
    return <ManagerDashboard user={currentUser} onLogout={handleLogout} />;
  }

  if (currentUser.role === 'hr') {
    return <HRDashboard user={currentUser} onLogout={handleLogout} />;
  }

  return null;
}

export default App;
