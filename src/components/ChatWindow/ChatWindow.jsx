import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';
import './ChatWindow.css';

const ChatWindow = ({ onOpenInfo, onBack, isMobile }) => {
    const { PhoneNumber } = useParams();

    const {
        contacts,
        messages,
        sendMessage,
        userName,
        isTyping
    } = useChat();

    const [text, setText] = useState('');
    const scrollRef = useRef();

    const contact = useMemo(
        () => contacts.find(c => String(c.PhoneNumber) === String(PhoneNumber)),
        [contacts, PhoneNumber]
    );

    const chatMessages = useMemo(
        () => messages[PhoneNumber] || [],
        [messages, PhoneNumber]
    );

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        sendMessage(PhoneNumber, text);
        setText('');
    };

    if (!contact) {
        return (
            <div className="empty-chat">
                <div className="empty-chat-content">
                    <h2>WhatsApp Web</h2>
                    <p>Selecciona un chat para comenzar</p>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-window">
            <header className="chat-header">

                {isMobile && (
                    <button className="back-btn" onClick={onBack}>
                        ←
                    </button>
                )}

                <div className="chat-header-content">
                    <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="avatar"
                        onClick={onOpenInfo}
                    />

                    <div className="header-info">
                        <h3 className="contact-name">{contact.name}</h3>
                        <span className="contact-status">
                            {isTyping === PhoneNumber ? 'Escribiendo...' : 'En línea'}
                        </span>
                    </div>
                </div>
            </header>

            <main className="message-area">
                {chatMessages.map(m => (
                    <div
                        key={m.id}
                        className={`msg-bubble ${m.author === userName ? 'me' : 'them'}`}
                    >
                        <p>{m.text}</p>
                        <div className="msg-footer">
                            <span className="msg-time">{m.time}</span>
                            {m.author === userName && (
                                <div className={`msg-status ${m.status === 'read' ? 'read' : ''}`}>
                                    <span className="check">✓</span>
                                    <span className="check">✓</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={scrollRef} />
            </main>

            <form onSubmit={handleSubmit} className="chat-input-form">
                <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />

                <button type="submit" className="send-btn">
                    ➜
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;