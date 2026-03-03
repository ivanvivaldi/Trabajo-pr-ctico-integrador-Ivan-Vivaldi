import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import MiniSidebar from '../components/MiniSidebar/MiniSidebar';
import ChatWindow from '../components/ChatWindow/ChatWindow';
import ContactInfoPanel from '../components/ContactInfoPanel/ContactInfoPanel';
import { useChat } from '../context/ChatContext';

const ChatPage = () => {
    const [showInfo, setShowInfo] = useState(false);
    const [mobileView, setMobileView] = useState("sidebar");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const { contacts, activeChat } = useChat();
    const contact = contacts.find(c => c.PhoneNumber === activeChat);

    // 👇 Detectar resize correctamente
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 👇 Cuando cambia el chat activo en mobile → ir a chat
    useEffect(() => {
        if (activeChat && isMobile) {
            setMobileView("chat");
        }
    }, [activeChat, isMobile]);

    return (
        <div className="main-layout">

            {/* MINI SIDEBAR (solo desktop) */}
            {!isMobile && (
                <div className="mini-sidebar-container">
                    <MiniSidebar />
                </div>
            )}

            {/* SIDEBAR */}
            {(!isMobile || mobileView === "sidebar") && (
                <div className="sidebar-container-desktop">
                    <Sidebar />
                </div>
            )}

            {/* CHAT */}
            {(!isMobile || mobileView === "chat") && (
                <div className="chat-container">
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
            )}

            {/* INFO PANEL */}
            {(!isMobile && showInfo) || (isMobile && mobileView === "info") ? (
                <div className="info-container">
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
            ) : null}

        </div>
    );
};

export default ChatPage;