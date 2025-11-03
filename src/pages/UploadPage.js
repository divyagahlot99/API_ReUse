import React, { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSwagger, computeFromSwagger } from '../store/slices/apiSlice';
import UploadCard from '../components/UploadCard';
import ScoreCard from '../components/ScoreCard';
import TopMatches from '../components/TopMatches';

function UploadPage() {
  

  return (
    <div style={{ flex: 1, padding: '2rem' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Upload</h1>
      </header>

      <main className="content-grid">
      <section className="left-col">
      <UploadCard />
      <ScoreCard />
      </section>
      </main>
    </div>
  );
}

export default UploadPage;