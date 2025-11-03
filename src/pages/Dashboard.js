import React from 'react';
import UploadCard from '../components/UploadCard';
import TopMatches from '../components/TopMatches';
import ScoreCard from '../components/ScoreCard';
import ApiDrawer from '../components/ApiDrawer';

export default function Dashboard() {
  return (
    <div className="page-root">
      <header className="topbar">
        <div className="brand">📦 Service Blueprint</div>
        <nav className="nav">
          <span className="nav-link">Dashboard</span>
          <span className="nav-link">Team Reuse Score</span>
        </nav>
      </header>

      <main className="content-grid">
        <section className="left-col">
          <UploadCard />
          <ScoreCard />
        </section>

        <aside className="right-col">
          <TopMatches />
        </aside>
      </main>

      <ApiDrawer />
    </div>
  )
}