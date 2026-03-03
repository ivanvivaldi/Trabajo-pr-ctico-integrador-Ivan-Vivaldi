import React from 'react';
import { useChat } from '../../context/ChatContext';
import { useNavigate } from 'react-router-dom';
import './MiniSidebar.css';

const MiniSidebar = () => {
    const { userName, logout, toggleTheme, theme } = useChat();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="mini-sidebar">

       
            <div className="mini-avatar">
                <img src="/Imagenes/userpic.jpg" alt="User" />
            </div>

            
            <div className="mini-actions">

             
                <button 
                    className="mini-btn"
                    onClick={toggleTheme}
                    title="Cambiar tema"
                >
                    {theme === 'dark' ? '🌙' : '☀️'}
                </button>

              
                <button 
                    className="mini-btn logout"
                    onClick={handleLogout}
                    title="Cerrar sesión"
                >
                    ⍈
                </button>

            </div>
        </div>
    );
};

export default MiniSidebar;