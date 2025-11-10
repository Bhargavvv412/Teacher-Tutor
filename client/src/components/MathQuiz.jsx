import React, { useState, useEffect } from "react";

export default function MathQuiz({ quizData, onPick }) {
  const [options, setOptions] = useState([]);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Shuffle once when quizData changes
    const opts = [...quizData.options];
    const correctAnswer = opts[quizData.answer];

    opts.sort(() => Math.random() - 0.5);
    setOptions(opts);
    setAnswerIndex(opts.indexOf(correctAnswer));

    // reset state for new question
    setSelected(null);
    setResult(null);
  }, [quizData]);

  const handleAnswer = (index) => {
    setSelected(index);
    const correct = index === answerIndex;
    setResult(correct);
    onPick?.(index, correct);
  };

  return (
    <div className="quiz-card">
      <p>{quizData.question}</p>
      <div className="opt-row">
        {options.map((opt, idx) => (
          <button
            key={idx}
            className={`opt-btn ${selected === idx ? "selected" : ""}`}
            onClick={() => handleAnswer(idx)}
            disabled={selected !== null}
          >
            {opt}
          </button>
        ))}
      </div>
      {selected !== null && (
        <p>
          {result
            ? "✅ Correct!"
            : `❌ Wrong! Correct: ${options[answerIndex]}`}
        </p>
      )}
    </div>
  );
}