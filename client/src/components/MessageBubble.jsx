import React from 'react';
import MathQuiz from './MathQuiz.jsx';

export default function MessageBubble({ role = 'bot', text, options = [], onOption }) {
  // Format text with bullets and bold
  const formatText = (msg) => {
    if (!msg) return null;
    return msg.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={idx} />;

      // Bullet points
      if (trimmed.startsWith('*')) {
        let content = trimmed.slice(1).trim();
        const parts = content.split(/(\*\*.*?\*\*)/g).map((part, i) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={i}>{part.slice(2, -2)}</strong>
            : part
        );
        return <div key={idx}>- {parts}</div>;
      }

      // Normal line with bold
      const parts = trimmed.split(/(\*\*.*?\*\*)/g).map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i}>{part.slice(2, -2)}</strong>
          : part
      );
      return <div key={idx}>{parts}</div>;
    });
  };

  return (
    <div className="msg-row">
      {role === 'bot' && (
        <div className="avatar">
          <img src="/teacher.png" alt="logo" />
        </div>
      )}
      <div className={'bubble ' + (role === 'bot' ? 'bot' : 'user')}>
        {/* Render formatted text */}
        {formatText(text)}

        {/* Render quiz if options is a quiz */}
        {options?.type === 'quiz' && (
          <MathQuiz quizData={options.quiz} onPick={onOption} />
        )}

        {/* Render normal options buttons */}
        {Array.isArray(options) && options.length > 0 && options?.type !== 'quiz' && (
          <div className="opt-row">
            {options.map((opt, idx) => (
              <button key={idx} className="opt-btn" onClick={() => onOption?.(idx)}>
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
