import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeDrawer } from '../store/slices/apiSlice';

export default function ApiDrawer() {
  const drawer = useSelector((s) => s.api.drawer);
  const dispatch = useDispatch();

  if (!drawer.open) return null;

  return (
    <div className="drawer-overlay" onClick={() => dispatch(closeDrawer())}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h3>{drawer.data.name}</h3>
          <button className="close-btn" onClick={() => dispatch(closeDrawer())}>
            ✕
          </button>
        </div>
        <div className="drawer-body">
          <p><strong>Team:</strong> {drawer.data.team}</p>
          <p><strong>Score:</strong> {Math.round(drawer.data.score)}%</p>
          <p><strong>Description:</strong></p>
          <p>{drawer.data.description || 'No description available.'}</p>

          <div style={{ marginTop: 16 }}>
            <h4>Endpoints (sample)</h4>
            <ul>
              {(drawer.data.endpoints || []).slice(0, 10).map((ep, i) => (
                <li key={i}>{ep}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}