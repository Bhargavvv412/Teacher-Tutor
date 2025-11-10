import React, { useState } from "react";
import MathQuiz from "./MathQuiz.jsx";
import ScienceQuiz from "./ScienceQuiz.jsx";
import EnglishQuiz from "./EnglishQuiz.jsx";

export default function QuizPanel({ lastResult }) {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizType, setQuizType] = useState(null);

  const handleStartQuiz = (type) => {
    const endpointMap = {
      Math: "http://localhost:5001/quiz/math",
      Science: "http://localhost:5001/quiz/science",
      English: "http://localhost:5001/quiz/english",
    };

    fetch(endpointMap[type])
      .then((res) => res.json())
      .then((data) => {
        setCurrentQuiz(data);
        setQuizType(type);
      })
      .catch((err) => console.error("Failed to fetch quiz:", err));
  };

  const handlePick = (index, correct) => {
    console.log(`Selected ${index}, Correct? ${correct}`);
    // update lastResult or score here
  };

  return (
    <div className="card panel">
      <h3 className="panel-title">📚 <strong>Quizzes</strong></h3>
      <p className="small">
        - Practice with quick <strong>MCQs</strong>. - Great for warm-ups! 🚀
      </p>

      <div className="quiz-grid">
        <button className="icon-btn" onClick={() => handleStartQuiz("Math")}>
          🧮 Quick <strong>Math</strong>
        </button>
        <button className="icon-btn" onClick={() => handleStartQuiz("Science")}>
          🔬 Quick <strong>Science</strong>
        </button>
        <button className="icon-btn" onClick={() => handleStartQuiz("English")}>
          🔤 Quick <strong>English</strong>
        </button>
      </div>

      {/* Render based on quizType */}
      {currentQuiz && quizType === "Math" && (
        <MathQuiz quizData={currentQuiz} onPick={handlePick} />
      )}
      {currentQuiz && quizType === "Science" && (
        <ScienceQuiz quizData={currentQuiz} onPick={handlePick} />
      )}
      {currentQuiz && quizType === "English" && (
        <EnglishQuiz quizData={currentQuiz} onPick={handlePick} />
      )}

      {lastResult && (
        <p className="small" style={{ marginTop: 8 }}>
          Last quiz: {lastResult.correct ? "✅ Correct!" : "❌ Oops!"} (+<strong>{lastResult.delta}</strong>⭐)
        </p>
      )}
    </div>
  );
}
