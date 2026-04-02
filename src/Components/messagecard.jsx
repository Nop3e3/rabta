// MessagesPage.jsx
import React from "react";
import "./messagecard.css";

function MessageCard({ name, subject, preview, time, status, avatarUrl }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div className={`msg-card ${status === "unread" ? "unread" : ""}`}>
      {avatarUrl ? (
        <img className="msg-avatar" src={avatarUrl} alt={name} />
      ) : (
        <div className="msg-avatar-placeholder">{initials}</div>
      )}

      <div className="msg-body">
        <span className="msg-name">{name}</span>
        <span className="msg-subject">{subject}</span>
        <p className="msg-preview">{preview}</p>
      </div>

      <div className="msg-right">
        <span className="msg-time">{time}</span>
        <span className={`msg-badge ${status}`}>
          {status === "unread" ? "Unread" : "Read"}
        </span>
      </div>
    </div>
  );
}

// Default empty array to prevent runtime errors
export default function MessagesPage({ messages = [] }) {
  const unreadCount = messages.filter((m) => m.status === "unread").length;

  return (
    <div className="messages-page">
      <div className="messages-header">
        <h1 className="messages-title">Messages</h1>
        <span className="messages-count">{unreadCount} unread</span>
      </div>

      <div className="messages-list">
        {messages.map((msg) => (
          <MessageCard key={msg.id} {...msg} />
        ))}
      </div>
    </div>
  );
}