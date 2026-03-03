import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ChatProvider, useChat } from './context/ChatContext.jsx';
import Login from './pages/Login.jsx';
import ChatPage from './pages/ChatPage.jsx';
import './styles/App.css';


const StatusOverlay = () => {
  const { activeStatus, closeStatus } = useChat();

  if (!activeStatus) return null;

  return (
    <div className="status-overlay" onClick={closeStatus}>
      <div className="status-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-status-btn" onClick={closeStatus}>×</button>
        <video
          src={activeStatus}
          autoPlay
          onEnded={closeStatus}
          className="status-video"
        />
      </div>
    </div>
  );
};

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser && savedUser !== 'Usuario';
  });

  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('user');
      setIsAuthenticated(savedUser && savedUser !== 'Usuario');
    };

    window.addEventListener('storage', checkAuth);
    checkAuth();

    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
  <Router>
    <ChatProvider> 
      <div className="app-container">
       <Routes>
      
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/chat/:PhoneNumber" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
        </Routes>
        <StatusOverlay /> 
      </div>
    </ChatProvider>
  </Router>
  );
}

export default App;

