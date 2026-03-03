import React, { createContext, useState, useContext, useEffect } from 'react';
import { formatTime, getBotResponse } from '../utils/constants';
import { contactsData } from '../data/contacts.Data.jsx';
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const navigate = useNavigate();
    const contacts = contactsData;

    const [activeChat, setActiveChat] = useState(null);

    const [userName, setUserName] = useState(() => {
        return localStorage.getItem('user') || '';
    });

    // ✅ THEME (CORRECTAMENTE DENTRO DEL COMPONENTE)
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    const [activeStatus, setActiveStatus] = useState(null);

    const openStatus = (videoUrl) => setActiveStatus(videoUrl);
    const closeStatus = () => setActiveStatus(null);

    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('messages');
        return saved ? JSON.parse(saved) : {};
    });

    const [isTyping, setIsTyping] = useState(null);

    useEffect(() => {
        if (userName) {
            localStorage.setItem('user', userName);
        }
    }, [userName]);

    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('messages');
        setUserName('');
        navigate("/login");
    };

    const sendMessage = (contactId, text) => {

        const hora = formatTime(new Date());

        const newMessage = {
            id: Date.now(),
            text,
            author: userName,
            time: hora,
            status: 'sent'
        };

        setMessages(prev => ({
            ...prev,
            [contactId]: [...(prev[contactId] || []), newMessage]
        }));

        setIsTyping(contactId);

        setTimeout(() => {

            const contact = contacts.find(c => c.PhoneNumber === contactId);

            if (contact) {

                const reply = {
                    id: Date.now() + 1,
                    text: getBotResponse(userName, text),
                    author: contact.name,
                    time: formatTime(new Date()),
                    status: 'read'
                };

                setMessages(prev => {

                    const chatActual = prev[contactId] || [];

                    const chatActualizado = chatActual.map(m =>
                        m.author === userName
                            ? { ...m, status: 'read' }
                            : m
                    );

                    return {
                        ...prev,
                        [contactId]: [...chatActualizado, reply]
                    };
                });

                setIsTyping(null);
            }

        }, 2000);
    };

    return (
        <ChatContext.Provider value={{
            contacts,
            messages,
            sendMessage,
            userName,
            setUserName,
            isTyping,
            logout,
            openStatus,
            closeStatus,
            activeStatus,
            activeChat,
            setActiveChat,
            theme,
            toggleTheme
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);