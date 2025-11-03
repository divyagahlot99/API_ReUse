import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import DescribePage from './DescribePage';
import ReportsPage from './ReportsPage';
import UploadPage from './UploadPage';

const menuItems = [
  { label: 'Home', icon: '🏠', path: '/' },
  { label: 'Upload', icon: '📤', path: '/upload' },
  { label: 'Describe', icon: '📝', path: '/describe' },
  { label: 'Reports', icon: '📊', path: '/reports' },
];

export default function Dashboard() {
  const [active, setActive] = useState('Home');
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fa' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '240px',
          background: 'linear-gradient(180deg, #eaf1fb 0%, #fff 100%)',
          borderRight: '1px solid #e3e8ef',
          boxShadow: '2px 0 8px 0 rgba(34, 60, 80, 0.07)',
          padding: '2rem 0 2rem 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          minHeight: '100vh',
        }}
      >
        {/* User Profile Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          paddingLeft: '2rem',
          marginBottom: '1.5rem'
        }}>
          <img
            src="https://randomuser.me/api/portraits/women/48.jpg"
            alt="Profile"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #2563eb',
              boxShadow: '0 2px 8px rgba(34, 60, 80, 0.10)'
            }}
          />
          <div>
            <div style={{ fontWeight: 'bold', color: '#222', fontSize: '1.1rem' }}>Divya Gahlot</div>
            <div style={{ color: '#2563eb', fontSize: '0.95rem', fontWeight: '500' }}>Software Engineer</div>
          </div>
        </div>
        <div style={{
          fontWeight: 'bold',
          fontSize: '1.5rem',
          color: '#222',
          paddingLeft: '2rem',
          marginBottom: '2rem',
          letterSpacing: '-1px'
        }}>
          API Compass
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '2rem' }}>
          {menuItems.map(item => (
            <button
              key={item.label}
              onClick={() => {
                setActive(item.label);
                navigate(item.path);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.7rem 1rem',
                border: active === item.label ? '1.5px solid #2563eb' : '1.5px solid transparent',
                borderRadius: '8px',
                background: active === item.label ? '#2563eb22' : 'transparent',
                color: active === item.label ? '#2563eb' : '#222',
                fontWeight: active === item.label ? 'bold' : 'normal',
                cursor: 'pointer',
                fontSize: '1rem',
                outline: 'none',
                transition: 'background 0.2s, border 0.2s',
              }}
              onMouseOver={e => {
                if (active !== item.label) e.currentTarget.style.background = '#eaf1fb';
              }}
              onMouseOut={e => {
                if (active !== item.label) e.currentTarget.style.background = 'transparent';
              }}
            >
              <span style={{ fontSize: '1.2rem', opacity: active === item.label ? 1 : 0.7 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/describe" element={<DescribePage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </div>
    </div>
  );
}