import React from 'react';
import { useSelector } from 'react-redux';

export default function ScoreCard() {
  const score = useSelector((s) => s.api.reuseScore);
  return (
    <div className="card score-card">
      <h3 className="card-title">Reusability Score</h3>
      <div className="score-circle">
        <svg width="120" height="120" viewBox="0 0 42 42" className="circular">
          <circle className="bg" cx="21" cy="21" r="15.9155" />
          <circle
            className="progress"
            cx="21"
            cy="21"
            r="15.9155"
            strokeDasharray={`${score}, 100`}
          />
          <text x="21" y="22" textAnchor="middle" className="score-text">
            {Math.round(score)}%
          </text>
        </svg>
      </div>
    </div>
  );
}