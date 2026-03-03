import React from 'react';
import { Link} from 'react-router-dom';
import { useChat } from '../../context/ChatContext';
import './Sidebar.css';

const Sidebar = () => {
  const { contacts, activeChat, setActiveChat } = useChat();


  return (
    <aside className="sidebar">


      <div className="sidebar-top">
        <span className="sidebar-title">WhatsApp</span>
      </div>

   
      <nav className="contact-list">
        {contacts.map((contact) => (
          <Link
            key={contact.PhoneNumber}
            to={`/chat/${contact.PhoneNumber}`}
            className={`contact-link ${activeChat === contact.PhoneNumber ? 'active' : ''}`}
            onClick={() => setActiveChat(contact.PhoneNumber)}
          >
            <div className="contact-content">
              <img src={contact.avatar} alt={contact.name} className="avatar" />
              <div className="contact-text">
                <strong>{contact.name}</strong>
                <p>{contact.lastMsg}</p>
              </div>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;