import { useState } from 'react';
import TopMatches from '../components/TopMatches';

function HomePage() {
  const [apiInput, setApiInput] = useState('');
  const [suggestConsolidation, setSuggestConsolidation] = useState(true);
  const [selectedButtons, setSelectedButtons] = useState([]);

  const tagButtons = [
    { id: 'nl1', label: 'Python' },
    { id: 'nl2', label: 'Javascript' }
  ];

  return (
    <div style={{ flex: 1, padding: '2rem' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Dashboard</h1>
      </header>

      {/* Dashboard Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Left Panel */}
        <div>
          {/* What API are you building */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>What API are you building?</h2>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <input
                type="text"
                value={apiInput}
                onChange={e => setApiInput(e.target.value)}
                placeholder="e.g., OAuth flow for user login"
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                }}
              />
              <button
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
              >
                Analyze
              </button>
            </div>
            {tagButtons.map(btn => (
              <button
                key={btn.id}
                style={{
                  marginTop: btn.id === 'nl1' ? '1rem' : '0',
                  background: selectedButtons.includes(btn.id) ? '#005e5e' : '#cfd8dc',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.5rem 1rem',
                  fontWeight: 'bold',
                  color: selectedButtons.includes(btn.id) ? '#e0f7fa' : '#222',
                  cursor: 'pointer',
                  marginBottom: btn.id === 'nl1' ? '0.75rem' : '0',
                  boxShadow: selectedButtons.includes(btn.id) ? '0 2px 8px rgba(0,94,94,0.10)' : 'none',
                  outline: 'none',
                }}
                onClick={() => {
                  setSelectedButtons(prev =>
                    prev.includes(btn.id) ? prev.filter(b => b !== btn.id) : [...prev, btn.id]
                  );
                }}
              >
                {btn.label}
              </button>
            ))}
          </section>

          {/* Governance & Consolidation */}
          <section>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="checkbox"
                checked={suggestConsolidation}
                onChange={e => setSuggestConsolidation(e.target.checked)}
                style={{ accentColor: '#2563eb' }}
              />
              Suggest consolidation
            </label>
            <div style={{
              background: '#f3f4f6',
              borderRadius: '8px',
              padding: '1rem',
              color: '#222',
            }}>
              Consider reusing the <span style={{ fontWeight: 'bold' }}>OAuth Login API</span>
            </div>
          </section>

          {/* Reuse Suggestions */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Reuse Suggestions</h2>
            <p style={{ color: '#555', marginBottom: '1rem' }}>Top matching APIs from internal catalog</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '1rem',
                flex: 1,
              }}>
                <div style={{ fontWeight: 'bold' }}>Authentication Service</div>
                <div style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '1.1rem' }}>87% similarity</div>
                <div style={{ marginTop: '0.5rem', color: '#555' }}>Team <span style={{ fontWeight: 'bold' }}>Identity</span></div>
              </div>
              <div style={{
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '1rem',
                flex: 1,
              }}>
                <div style={{ fontWeight: 'bold' }}>OAuth Login</div>
                <div style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '1.1rem' }}>76% similarity</div>
                <div style={{ marginTop: '0.5rem', color: '#555' }}>Team <span style={{ fontWeight: 'bold' }}>Auth</span></div>
              </div>
            </div>
          </section>


        </div>

        <aside className="right-col">
        <TopMatches />
        </aside>
      </div>
    </div>
  );
}

export default HomePage;