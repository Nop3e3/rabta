import React from 'react';
import "./Modulecard.css";


const modules = [
  { id: 1, title: "Getting Started", lessons: 4, time: "55m", completed: 4 },
  { id: 2, title: "Market Research", lessons: 4, time: "55m", completed: 4 },
  { id: 3, title: "Business Planning", lessons: 4, time: "55m", completed: 4 },
  { id: 4, title: "Supplier Management", lessons: 4, time: "55m", completed: 4 },
  { id: 5, title: "Business Application", lessons: 4, time: "55m", completed: 3 },
];

const CourseProgress = () => {
  return (
    <div className="card">
      <div className="card-stack">
        {modules.map((m) => (
          <div key={m.id} className={`module-card ${m.id === 5 ? 'active' : ''}`}>
            <div className="module-info">
              <h3 className="module-title">Module {m.id}: {m.title}</h3>
              <p className="module-meta">{m.lessons} lessons • {m.time}</p>
            </div>
            
            {/* The Green Progress Indicator Badge */}
            <div className={`progress-badge ${m.completed === 4 ? 'is-complete' : 'is-partial'}`}>
              {m.completed}/4
            </div>

            {/* Bottom Progress Bar - Only for the active module */}
            {m.id === 5 && (
              <div className="bottom-progress-track">
                <div className="bottom-progress-fill" style={{ width: '75%' }}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseProgress;