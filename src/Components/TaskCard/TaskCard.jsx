import React from 'react';
import './TaskCard.css';

const TaskCard = () => {
  const tasks = [
    { id: 1, text: "Complete any 3 learning items", subtext: "0/3", underlined: true },
    { id: 2, text: "Watch a video", subtext: null, underlined: false },
    { id: 3, text: "Complete a module", subtext: null, underlined: false },
  ];

  return (
    <div className="container">
      <div className="card">
        {tasks.map((task) => (
          <div key={task.id} className="task-row">
            <div className="checkbox-mock"></div>
            <p className="task-text">
              <span className={task.underlined ? "underline" : ""}>
                {task.text}
              </span>
              {task.subtext && <span className="subtext"> • {task.subtext}</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;