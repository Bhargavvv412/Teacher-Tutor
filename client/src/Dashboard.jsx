import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Chat from './components/Chat.jsx';
import QuizPanel from './components/QuizPanel.jsx';
import RewardsPanel from './components/RewardsPanel.jsx';
import { apiChat, apiGetQuiz, apiSubmitAnswer, apiLeaderboard } from './api.js';

export default function Dashboard({ onLogout }) {
  const username = localStorage.getItem('username') || 'Guest';
  const chatsKey = `chats_${username}`;

  // Initialize chats: if none exist, create Chat 1
  const [chats, setChats] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(chatsKey));
    if (saved && saved.length > 0) {
      return saved;
    }
    return [
      {
        id: 1,
        title: "Chat 1",
        messages: [
          { role: 'bot', text: '👋 Welcome! This is your first chat. Start typing or open quizzes.' }
        ]
      }
    ];
  });

  // Active chat defaults to Chat 1
  const [activeChatId, setActiveChatId] = useState(chats[0].id);
  const activeChat = chats.find(c => c.id === activeChatId);

  const [subject, setSubject] = useState('Math');
  const [stars, setStars] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  // Persist chats
  useEffect(() => {
    localStorage.setItem(chatsKey, JSON.stringify(chats));
  }, [chats, chatsKey]);

  // Load leaderboard once
  useEffect(() => {
    apiLeaderboard().then(setLeaderboard).catch(() => {});
  }, []);

  const handleNavClick = (page) => setCurrentPage(page);

  // Always name chats sequentially: Chat 1, Chat 2, Chat 3...
  function handleNewChat() {
    const newId = chats.length + 1;
    const newChat = {
      id: newId,
      title: `Chat ${newId}`,
      messages: [
        { role: 'bot', text: `✨ Welcome to ${`Chat ${newId}`}! Start typing your question.` }
      ]
    };
    setChats(prev => [...prev, newChat]);
    setActiveChatId(newId);
  }

  function handleSelectChat(chat) {
    setActiveChatId(chat.id);
  }

  function handleDeleteChat(id) {
    const updated = chats.filter(chat => chat.id !== id);
    if (updated.length === 0) {
      // Reset to Chat 1 if all chats are deleted
      const defaultChat = {
        id: 1,
        title: "Chat 1",
        messages: [
          { role: 'bot', text: '👋 Welcome back! This is your fresh Chat 1.' }
        ]
      };
      setChats([defaultChat]);
      setActiveChatId(1);
      return;
    }
    setChats(updated);
    // If deleted active chat, fallback to last one
    if (activeChatId === id) {
      setActiveChatId(updated[updated.length - 1].id);
    }
  }

  function updateMessages(updater) {
    setChats(prev =>
      prev.map(c =>
        c.id === activeChatId ? { ...c, messages: updater(c.messages) } : c
      )
    );
  }

  async function sendMessage(text) {
    const userMsg = { role: 'user', text };
    updateMessages(prev => [...prev, userMsg]);

    try {
      const res = await apiChat(text, subject);
      const botMsgs = res.replies.map(t => ({ role: 'bot', text: t }));
      updateMessages(prev => [...prev, ...botMsgs]);
    } catch (e) {
      updateMessages(prev => [...prev, { role: 'bot', text: 'Tutor is offline' }]);
    }
  }

  async function startQuickQuiz(subj) {
    try {
      const data = await apiGetQuiz(subj);
      updateMessages(prev => [
        ...prev,
        { role: 'bot', text: `Quick ${subj} quiz:` },
        { role: 'bot', text: data.question, options: data.options, quizId: data.id }
      ]);
    } catch (e) {
      updateMessages(prev => [...prev, { role: 'bot', text: 'Could not fetch quiz.' }]);
    }
  }

  async function onOptionPick(msg, idx) {
    if (!msg.quizId) return;
    try {
      const data = await apiSubmitAnswer(msg.quizId, idx);
      const delta = data.correct ? 5 : 0;
      if (delta) setStars(s => s + delta);
      setLastResult({ correct: data.correct, delta });
      updateMessages(prev => [...prev, { role: 'bot', text: data.correct ? '✅ Correct!' : '❌ Wrong!' }]);
      const lb = await apiLeaderboard();
      setLeaderboard(lb);
    } catch (e) {
      updateMessages(prev => [...prev, { role: 'bot', text: 'Answer check failed.' }]);
    }
  }

  return (
    <div className="app">
      <NavBar 
        stars={stars} 
        username={username} 
        onLogout={onLogout} 
        onNavClick={handleNavClick} 
        currentPage={currentPage} 
      />
      <div className="main">
        <Sidebar 
          chats={chats} 
          onNewChat={handleNewChat} 
          onSelectChat={handleSelectChat} 
          onDeleteChat={handleDeleteChat}   // ✅ delete handler passed down
          activeChatId={activeChatId} 
        />
        <Chat 
          messages={activeChat?.messages || []} 
          onSend={sendMessage} 
          onOptionPick={onOptionPick} 
        />
        <div className="rightbar">
          <QuizPanel onStart={startQuickQuiz} lastResult={lastResult} />
          <RewardsPanel stars={stars} leaderboard={leaderboard} />
        </div>
      </div>
    </div>
  );
}
