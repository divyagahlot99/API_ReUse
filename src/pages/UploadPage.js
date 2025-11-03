import React, { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSwagger, computeFromSwagger } from '../store/slices/apiSlice';

function UploadPage() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const onFile = useCallback(async (file) => {
    try {
      const text = await file.text();
      let json = null;
      try {
        json = JSON.parse(text);
      } catch (e) {
        // try YAML? simple fallback omitted
        alert('Uploaded file is not valid JSON swagger.');
        return;
      }
      dispatch(setSwagger(json));
      dispatch(computeFromSwagger(json));
    } catch (err) {
      alert('Failed to read file');
    }
  }, [dispatch]);

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  };

  const onClickBrowse = () => inputRef.current && inputRef.current.click();

  const onChange = (e) => {
    const file = e.target.files[0];
    if (file) onFile(file);
  };

  return (
    <div style={{ flex: 1, padding: '2rem' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Upload</h1>
      </header>

      <div className="card upload-card">
      <h2 className="card-title">Upload or Paste Swagger</h2>
      <div
        className="dropzone"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={onClickBrowse}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/json"
          style={{ display: 'none' }}
          onChange={onChange}
        />
        <div className="drop-hint">
          <div className="file-icon">📄</div>
          <div>Drag and drop a Swagger file here, or click to browse.</div>
          <button
            className="btn-primary"
            onClick={(ev) => {
              ev.stopPropagation();
              onClickBrowse();
            }}
          >
            Analyze for Reuse
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default UploadPage;