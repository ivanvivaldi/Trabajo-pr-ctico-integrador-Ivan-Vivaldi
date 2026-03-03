import React from 'react';
import './ContactInfoPanel.css';

const ContactInfoPanel = ({ contact, onClose }) => {
  if (!contact) return null;

  return (
    <aside className="info-panel">
      <button onClick={onClose}>✕</button>

      <div className="info-header">
        <img src={contact.avatar} alt={contact.name} />
        <h2>{contact.name}</h2>
        <p>{contact.PhoneNumber}</p>
      </div>

      <div className="info-body">
        <p><strong>Edad:</strong> {contact.age}</p>
      </div>
    </aside>
  );
};

export default ContactInfoPanel;