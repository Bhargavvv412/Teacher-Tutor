import React from "react";
import "../styles/sidebar.css";

const Sidebar = ({ chats, onNewChat, onSelectChat, onDeleteChat, activeChatId }) => {
  return (
    <div className="sidebar">
      <button className="new-chat-btn" onClick={onNewChat}>
        ➕ New Chat
      </button>
      <ul className="chat-list">
        {[...chats].reverse().map((chat) => (
          <li
            key={chat.id}
            className={chat.id === activeChatId ? "active" : ""}
          >
            <span onClick={() => onSelectChat(chat)}>{chat.title}</span>
            <div className="chat-actions">
              <button onClick={() => onDeleteChat(chat.id)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
