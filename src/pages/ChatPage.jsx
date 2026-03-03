import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import MiniSidebar from '../components/MiniSidebar/MiniSidebar';
import ChatWindow from '../components/ChatWindow/ChatWindow';
import ContactInfoPanel from '../components/ContactInfoPanel/ContactInfoPanel';
import { useChat } from '../context/ChatContext';

const ChatPage = () => {
    const [showInfo, setShowInfo] = useState(false);
    const [mobileView, setMobileView] = useState("sidebar");
    // "sidebar" | "chat" | "info"

    const { contacts, activeChat } = useChat();

    const contact = contacts.find(c => c.PhoneNumber === activeChat);

    useEffect(() => {
        if (activeChat && window.innerWidth <= 768) {
            setMobileView("chat");
        }
    }, [activeChat]);

    const isMobile = window.innerWidth <= 768;

    return (
        <div className="main-layout">

            {/* MINI SIDEBAR */}
            <div className="mini-sidebar-container">
                <MiniSidebar />
            </div>

            {/* SIDEBAR */}
            <div
                className={`sidebar-container-desktop 
                ${isMobile && mobileView !== "sidebar" ? "hidden-mobile" : ""}`}
            >
                <Sidebar />
            </div>

            {/* CHAT */}
            <div
                className={`chat-container 
                ${isMobile && mobileView !== "chat" ? "hidden-mobile" : ""}`}
            >
                <ChatWindow
                    onOpenInfo={() => {
                        if (isMobile) {
                            setMobileView("info");
                        } else {
                            setShowInfo(true);
                        }
                    }}
                    onBack={() => setMobileView("sidebar")}
                />
            </div>

            {/* INFO PANEL */}
            {(isMobile ? mobileView === "info" : showInfo) && (
                <div
                    className={`info-container 
                    ${isMobile && mobileView !== "info" ? "hidden-mobile" : ""}`}
                >
                    <ContactInfoPanel
                        contact={contact}
                        onClose={() => {
                            if (isMobile) {
                                setMobileView("chat");
                            } else {
                                setShowInfo(false);
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default ChatPage;