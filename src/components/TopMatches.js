import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openDrawer } from '../store/slices/apiSlice';

export default function TopMatches() {
  const top = useSelector((s) => s.api.topMatches);
  const dispatch = useDispatch();

  return (
    <div className="card right-card">
      <h3 className="card-title">Top 3 existing APIs that match your endpoints</h3>
      <div className="matches-list">
        {top.map((m, idx) => (
          <div className="match-row" key={m.id || idx}>
            <div>
              <div className="match-title">{m.name}</div>
              <div className="match-sub">{m.team}</div>
            </div>
            <div className="match-right">
              <button
                className="link-btn"
                onClick={() => dispatch(openDrawer(m))}
              >
                View
              </button>
              <div className="score-big">{Math.round(m.score)}%</div>
            </div>
          </div>
        ))}
      </div>

      <div className="team-score-card">
        <h4>Team Reuse Score</h4>
        <table className="score-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Reuse Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Payments</td>
              <td>78%</td>
            </tr>
            <tr>
              <td>Cards</td>
              <td>72%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}