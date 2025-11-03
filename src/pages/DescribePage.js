import React, { useState, useMemo } from "react";
import "./describePage.css"
import rawMock from "../__mock__/mockSearchApi.json";

function DescribePage() {
  const [language, setLanguage] = useState("");
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // normalize and shape incoming JSON
  const catalog = useMemo(() => {
    const list = Array.isArray(rawMock) ? rawMock : [];
    return list.map((it) => ({
      name: it.name ?? it.nameOfApi ?? "unknown",
      description: it.description ?? it.desc ?? "",
      tags: Array.isArray(it.tags) ? it.tags : it.tags ? [it.tags] : [],
      language: it.language ?? "Unknown",
      endpoint: it.endpoint ?? "",
      method: it.method ?? "",
      version: it.version ?? "",
      category: it.category ?? "",
    }));
  }, []);

  const languages = useMemo(() => ["", ...Array.from(new Set(catalog.map((m) => m.language || "Unknown"))).sort()], [catalog]);

  const allTags = useMemo(() => {
    const s = new Set();
    catalog.forEach((c) => (c.tags || []).forEach((t) => s.add(String(t))));
    return Array.from(s).sort();
  }, [catalog]);

  const normalize = (s) => (s || "").toString().trim().toLowerCase();

  const applyFilter = (e) => {
    e?.preventDefault();
    setPage(1);
    const q = normalize(query).slice(0, 200);

    const filtered = catalog.filter((item) => {
      if (language && item.language.toLowerCase() !== language.toLowerCase()) return false;
      if (q) {
        const inName = normalize(item.name).includes(q) || normalize(item.nameOfApi).includes(q);
        const inDesc = normalize(item.description).includes(q);
        if (!inName && !inDesc) return false;
      }
      if (selectedTags.length > 0) {
        const itemTags = (item.tags || []).map((t) => normalize(t));
        if (!selectedTags.every((st) => itemTags.includes(normalize(st)))) return false;
      }
      return true;
    });

    setResults(filtered);
  };

  const resetFilter = () => {
    setLanguage("");
    setQuery("");
    setSelectedTags([]);
    setResults([]);
    setPage(1);
  };

  const toggleTag = (tag) => {
    setPage(1);
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  // pagination and list to show
  const activeList = results.length === 0 ? catalog : results;
  const total = activeList.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const shown = activeList.slice((page - 1) * pageSize, page * pageSize);

  const goPage = (n) => setPage(Math.min(Math.max(1, n), totalPages));

  return (
    <div className="market-root">
      <header className="market-header">
        <div>
          <div className="market-title">API Marketplace</div>
          <div className="market-sub">Discover and filter APIs — modern catalog view</div>
        </div>
        <div className="market-count">{total} APIs</div>
      </header>

      <div className="market-layout">
        <aside className="left-panel" aria-label="filters">
          <form onSubmit={applyFilter}>
            <div className="panel-section">
              <label className="label">Language</label>
              <select className="select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                {languages.map((l) => (
                  <option key={l || "__all__"} value={l}>{l || "All languages"}</option>
                ))}
              </select>
            </div>

            <div className="panel-section">
              <label className="label">Tags</label>
              <div className="tags-grid" role="list">
                {allTags.length === 0 && <div className="muted">No tags available</div>}
                {allTags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTag(t)}
                    className={`tag-chip ${selectedTags.includes(t) ? "selected" : ""}`}
                    aria-pressed={selectedTags.includes(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="panel-section">
              <label className="label">Search</label>
              <input
                className="search-input"
                placeholder="Name or description"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="panel-section panel-actions">
              <button type="submit" className="btn btn-primary">Search</button>
              <button type="button" onClick={resetFilter} className="btn btn-ghost">Reset</button>
            </div>
          </form>
        </aside>

        <main className="right-panel">
          <div className="count-row">
            <div className="count-text"><strong>{total}</strong> APIs found</div>
            <div className="page-info">Page {page} of {totalPages}</div>
          </div>

          <div className="grid">
            {shown.map((r, idx) => (
              <article key={`${r.name}_${r.endpoint}_${idx}`} className="api-card">
                <div className="card-title">
                  <div className="title-left">
                    <div className="title-text">{r.name}</div>
                    {r.version && <div className="version-chip">{r.version}</div>}
                  </div>
                </div>

                <div className="card-desc">{r.description || "No description provided."}</div>

                <div className="pills">
                  {(r.tags || []).slice(0, 6).map((t) => <div key={t} className="pill">{t}</div>)}
                </div>

                <div className="card-footer">
                  <div className="footer-left">
                    <div className="lang-badge">{r.language}</div>
                    <div className="method">{(r.method || "GET").toUpperCase()}</div>
                  </div>
                  <div className="endpoint">{r.endpoint || "/"}</div>
                </div>
              </article>
            ))}
          </div>

          <div className="pagination" role="navigation" aria-label="pagination">
            <button className="page-btn" onClick={() => goPage(1)} disabled={page === 1}>« First</button>
            <button className="page-btn" onClick={() => goPage(page - 1)} disabled={page === 1}>‹ Prev</button>
            <div className="page-summary">{(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}</div>
            <button className="page-btn" onClick={() => goPage(page + 1)} disabled={page === totalPages}>Next ›</button>
            <button className="page-btn" onClick={() => goPage(totalPages)} disabled={page === totalPages}>Last »</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DescribePage;