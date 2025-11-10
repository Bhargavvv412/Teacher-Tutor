import React from 'react';
import "../styles/StdSideBar.css";

// We receive props from App.jsx to manage state
export default function StdSidebar({standard, setStandard }) {
  
  const standards = [
    { label: 'Standard 10', value: 'std10' },
    { label: 'Standard 9', value: 'std9' },
    { label: 'Standard 8', value: 'std10' },
  ];

const subjects = ['Math', 'Science', 'English'];

  return (
    <div className="card sidebar">
      
      {/* --- Standard Selection --- */}
      <div className="panel">
        <h3 className="panel-title">🎓 Standard</h3>
        <p className="panel-subtitle">Choose a grade level</p>
        <select 
          className="styled-select" 
          value={standard} 
          onChange={(e) => setStandard(e.target.value)}
        >
          {standards.map((std) => (
            <option key={std.value} value={std.value}>
              {std.label}
            </option>
          ))}
        </select>
      </div>

      {/* --- Subject Selection --- */}
      {/* <div className="panel">
        <h3 className="panel-title">📚 Subject</h3>
        <p className="panel-subtitle">Select a topic to study</p>
        <div className="subject-grid">
          {subjects.map((subj) => (
            <button 
              key={subj}
              // Dynamically apply 'selected' class if the subject matches the current state
              className={`subject ${subj.toLowerCase()} ${subject === subj ? 'selected' : ''}`} 
              onClick={() => setSubject(subj)}
            >
              {subj}
            </button>
          ))}
        </div>
      </div> */}
    </div>
  );
}
