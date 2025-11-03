import React, { useState } from "react";
import { teamsList, mockData } from "../__mock__/mockApi"
import "../App.css";

function ReportsPage() {
  const allTeams = Array.from(new Set(teamsList)).sort();
  const gridCols = allTeams.length;

  const maxTeamsUsing = Math.max(...mockData.map((m) => m.teams.length), 0);
  const heatColor = (count, max) => {
    if (max === 0 || count === 0) return "#f2f2f2";
    const ratio = Math.min(1, count / max);
    const hue = ratio <= 0.5 ? 210 - (170 * (ratio / 0.5)) : 40 - (40 * ((ratio - 0.5) / 0.5));
    const light = 58 - ratio * 18;
    return `hsl(${Math.round(hue)} 68% ${Math.round(light)}%)`;
  };

  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: "" });

  // tooltip handlers
  const showTip = (e, text) => {
    const pad = 12;
    setTooltip({
      visible: true,
      x: Math.min(window.innerWidth - 260, e.clientX + pad),
      y: Math.max(48, e.clientY - 28),
      text,
    });
  };
  const moveTip = (e) => {
    const pad = 12;
    setTooltip((t) => ({ ...t, x: Math.min(window.innerWidth - 260, e.clientX + pad), y: Math.max(48, e.clientY - 28) }));
  };
  const hideTip = () => setTooltip((t) => ({ ...t, visible: false }));

  const gridStyle = { gridTemplateColumns: `220px repeat(${gridCols}, 44px) 120px` };

  return (
    <div className="reports-container">
      <header className="reports-header">
        <div>
          <div className="reports-title">Reports</div>
          <div className="reports-subtitle">API reusability across teams — professional heatmap view</div>
        </div>
      </header>

      <div className="panel">
        <div className="left-panel">
          <div className="panel-heading">
            <div className="panel-title">API Reusability Heatmap</div>
            <div className="panel-meta">Total APIs: {mockData.length} • Teams: {allTeams.length}</div>
          </div>

          <div className="heat-grid" style={gridStyle}>
            <div className="grid-spacer" />

            {allTeams.map((team) => (
              <div key={`h-${team}`} className="team-header">
                <div className="team-label" title={team}>{team}</div>
              </div>
            ))}

            <div className="summary-header"><span className="small">Reused</span></div>

            {mockData.map((m) => {
              const usedCount = m.teams.length;
              const pct = Math.round((usedCount / allTeams.length) * 100);
              const color = heatColor(usedCount, maxTeamsUsing);

              return (
                <React.Fragment key={m.api}>
                  <div className="api-name" title={m.api}>
                    <div className="api-dot" style={{ background: color }} />
                    <div className="api-text">{m.api}</div>
                  </div>

                  {allTeams.map((team) => {
                    const used = m.teams.includes(team);
                    const bg = used ? color : undefined;
                    return (
                      <div
                        key={`${m.api}-${team}`}
                        className={used ? "cell used" : "cell empty"}
                        style={used ? { background: bg } : undefined}
                        onMouseEnter={(e) => showTip(e, used ? `${m.api} used by ${team}` : `${team} doesn't use ${m.api}`)}
                        onMouseMove={moveTip}
                        onMouseLeave={hideTip}
                        title={used ? `${m.api} used by ${team}` : `${team} doesn't use ${m.api}`}
                      >
                        {used ? "●" : ""}
                      </div>
                    );
                  })}

                  <div className="row-summary">
                    <div className="summary-count">{usedCount} / {allTeams.length}</div>
                    <div className="summary-bar-outer">
                      <div className="summary-bar-fill" style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <aside className="right-panel">
          <div className="overview-title">Overview</div>
          <div className="overview-item">
            <div className="small">Total APIs</div>
            <div className="overview-number">{mockData.length}</div>
          </div>
          <div className="overview-item">
            <div className="small">Total Teams</div>
            <div className="overview-number">{allTeams.length}</div>
          </div>

          <div className="overview-section">
            <div className="small">Most reused APIs</div>
            <ol className="top-list">
              {mockData.slice().sort((a,b) => b.teams.length - a.teams.length).slice(0,6).map(m => (
                <li key={`top-${m.api}`}><strong>{m.api}</strong> — {m.teams.length} teams</li>
              ))}
            </ol>
          </div>

          <div className="overview-section">
            <div className="small">Legend</div>
            <div className="legend">
              <div className="legend-item"><div className="legend-box" style={{background: heatColor(1, maxTeamsUsing)}} /> <div className="small">Low</div></div>
              <div className="legend-item"><div className="legend-box" style={{background: heatColor(Math.round(maxTeamsUsing/2), maxTeamsUsing)}} /> <div className="small">Medium</div></div>
              <div className="legend-item"><div className="legend-box" style={{background: heatColor(maxTeamsUsing, maxTeamsUsing)}} /> <div className="small">High</div></div>
            </div>
          </div>
        </aside>
      </div>

      {tooltip.visible && (
        <div className="tooltip" style={{ left: tooltip.x, top: tooltip.y }}>{tooltip.text}</div>
      )}
    </div>
  );
}

export default ReportsPage;