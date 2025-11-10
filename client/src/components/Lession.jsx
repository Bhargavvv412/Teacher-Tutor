import React, { useState, useEffect } from 'react';
import  '../styles/Lessons.css';

// Sample lesson data (you can replace this with API calls later)
const sampleLessons = {
  Math: [
    { id: 1, title: "Algebra Basics", content: "Learn about variables, equations, and expressions." },
    { id: 2, title: "Geometry", content: "Understand shapes, angles, and theorems." },
  ],
  Science: [
    { id: 1, title: "Physics Basics", content: "Learn about motion, force, and energy." },
    { id: 2, title: "Chemistry 101", content: "Introduction to atoms, molecules, and reactions." },
  ],
  English: [
    { id: 1, title: "Grammar Basics", content: "Learn parts of speech, sentence structure, and punctuation." },
    { id: 2, title: "Reading Comprehension", content: "Practice understanding and analyzing texts." },
  ]
};

export default function Lessons({ subject }) {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    // In a real app, fetch lessons from backend API based on subject
    setLessons(sampleLessons[subject] || []);
  }, [subject]);

  return (
    <div className="lessons-container">
      <h2>{subject} Lessons</h2>
      {lessons.length === 0 ? (
        <p>No lessons available for {subject}.</p>
      ) : (
        <ul className="lessons-list">
          {lessons.map(lesson => (
            <li key={lesson.id} className="lesson-card">
              <h3>{lesson.title}</h3>
              <p>{lesson.content}</p>
              <button className="lesson-btn">Mark as Complete ✅</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
