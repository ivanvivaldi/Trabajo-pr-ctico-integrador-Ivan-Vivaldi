import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import MiniSidebar from '../components/MiniSidebar/MiniSidebar';
import ChatWindow from '../components/ChatWindow/ChatWindow';
import ContactInfoPanel from '../components/ContactInfoPanel/ContactInfoPanel';
import { useChat } from '../context/ChatContext';

const ChatPage = () => {
    const [showInfo, setShowInfo] = useState(false);
    const { contacts, activeChat } = useChat();

    const contact = contacts.find(c => c.PhoneNumber === activeChat);

    return (
        <div className="main-layout">

            <div className="mini-sidebar-container">
                <MiniSidebar />
            </div>

            <div className="sidebar-container-desktop">
                <Sidebar />
            </div>

      
            <ChatWindow onOpenInfo={() => setShowInfo(true)} />

      
            {showInfo && (
                <ContactInfoPanel
                    contact={contact}
                    onClose={() => setShowInfo(false)}
                />
            )}
        </div>
    );
};

export default ChatPage;