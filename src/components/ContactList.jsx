import React from "react";

export default function ContactList({ contacts, onDelete }) {
  return (
    <div className="contact-list">
      <h2>My contacts</h2>

      {contacts.length === 0 ? (
        <p className="empty">Contacts list is empty</p>
      ) : (
        <div className="card-container">
          {contacts.map((c) => (
            <div className="contact-card" key={c.phone}>
              <div className="info">
                <h3>{c.firstName} {c.lastName}</h3>
                <p> {c.phone}</p>
              </div>
              <button className="delete-btn" onClick={() => onDelete(c.phone)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
