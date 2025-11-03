function UploadPage() {

  return (
    <div style={{ flex: 1, padding: '2rem' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Upload</h1>
        <div>
          <span style={{ marginRight: '1.5rem', fontSize: '1.5rem', cursor: 'pointer' }}>🔔</span>
          <span style={{ fontSize: '1.5rem', cursor: 'pointer' }}>👤</span>
        </div>
      </header>
    </div>
  );
}

export default UploadPage;