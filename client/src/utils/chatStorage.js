// src/utils/chatStorage.js
export function loadChats(username) {
  const data = localStorage.getItem(`chats_${username}`);
  return data ? JSON.parse(data) : [];
}

export function saveChats(username, chats) {
  localStorage.setItem(`chats_${username}`, JSON.stringify(chats));
}

export function createChat(username) {
  const chats = loadChats(username);
  const newChat = {
    id: Date.now().toString(),
    title: "New Chat",
    messages: [
      { role: "bot", text: "Hello! Start by asking me something." }
    ],
  };
  chats.push(newChat);
  saveChats(username, chats);
  return newChat;
}

export function updateChat(username, chatId, messages) {
  const chats = loadChats(username);
  const updated = chats.map(c =>
    c.id === chatId ? { ...c, messages } : c
  );
  saveChats(username, updated);
}
