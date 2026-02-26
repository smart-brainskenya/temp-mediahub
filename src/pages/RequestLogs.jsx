import { useState, useEffect, useMemo } from 'react';
import './RequestLogs.css';

export default function RequestLogs() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [configWarning, setConfigWarning] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, fulfilled

  useEffect(() => {
    fetch('/api/request-asset')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch requests');
        }
        return res.json();
      })
      .then(data => {
        // Handle explicit configuration warning
        if (data.warning === 'BLOB_NOT_CONFIGURED') {
          setConfigWarning('Vercel Blob Storage is not connected. Requests are temporary and will not persist.');
          setRequests(data.requests || []);
        } 
        // Handle standard array response (Production with Blob OR Local Dev)
        else if (Array.isArray(data)) {
          setRequests(data);
        } 
        // Handle legacy/fallback object structure
        else if (data.requests && Array.isArray(data.requests)) {
          setRequests(data.requests);
        } 
        else {
          setRequests([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Could not load requests.');
        setLoading(false);
      });
  }, []);

  const sortedRequests = useMemo(() => {
    let filtered = [...requests].sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(req => req.status === filterStatus);
    }
    
    return filtered;
  }, [requests, filterStatus]);

  const formatDate = (isoString) => {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const fulfilledCount = requests.filter(r => r.status === 'fulfilled').length;

  const handleFulfill = async (id) => {
    // Note: In Production (Vercel Blob), we don't currently have an API to update a specific record 
    // without overwriting the whole file. For Prompt B, we keep this UI-only/local.
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'fulfilled' } : req
    ));
    
    // Attempt local file update if in dev mode
    try {
      await fetch('/api/fulfill-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
    } catch {
      // Ignore if API doesn't exist (e.g. production)
    }
  };

  if (loading) {
    return (
      <div className="logs-container">
        <div className="logs-header">
          <h1>Asset Request Logs</h1>
        </div>
        <div className="logs-loading">
          <div className="loading-spinner"></div>
          <p>Fetching requests from production storage...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="logs-container">
        <div className="logs-header">
          <h1>Asset Request Logs</h1>
        </div>
        <div className="logs-error">
          <div className="error-icon">⚠️</div>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="logs-container">
      <div className="logs-header">
        <div className="title-row">
          <h1>Asset Request Logs</h1>
          <div className="storage-badge">
            <span className={`dot ${configWarning ? 'error' : ''}`}></span> 
            {configWarning ? 'Storage Disconnected' : 'Persistent Storage Active'}
          </div>
        </div>
        <p>Review and manage student requests for missing images and videos.</p>
        
        {configWarning && (
          <div className="logs-error" style={{ marginTop: '1rem', padding: '1rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="error-icon" style={{ fontSize: '1.5rem', marginBottom: 0 }}>⚠️</div>
              <div>
                <strong>Configuration Required:</strong> {configWarning}<br/>
                <span style={{ fontSize: '0.9rem' }}>Please connect a Vercel Blob store to this project in the Vercel Dashboard.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="logs-stats">
        <div className="stat-card">
          <div className="stat-number">{requests.length}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-number">{pendingCount}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card fulfilled">
          <div className="stat-number">{fulfilledCount}</div>
          <div className="stat-label">Fulfilled</div>
        </div>
      </div>

      <div className="logs-filters">
        <button 
          className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
          onClick={() => setFilterStatus('all')}
        >
          Show All
        </button>
        <button 
          className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
          onClick={() => setFilterStatus('pending')}
        >
          Pending
        </button>
        <button 
          className={`filter-btn ${filterStatus === 'fulfilled' ? 'active' : ''}`}
          onClick={() => setFilterStatus('fulfilled')}
        >
          Fulfilled
        </button>
      </div>

      {sortedRequests.length === 0 ? (
        <div className="logs-empty">
          <div className="empty-icon">📁</div>
          <h3>No asset requests yet.</h3>
          <p>Student requests will appear here once submitted.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="logs-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Request Detail</th>
                <th>Context</th>
                <th>Note</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedRequests.map((req) => (
                <tr key={req.id} className={req.status === 'fulfilled' ? 'row-muted' : ''}>
                  <td className="col-time" data-label="Date">{formatDate(req.timestamp)}</td>
                  <td data-label="Type">
                    <span className={`badge-type ${req.type}`}>
                      {req.type === 'image' ? '🖼️' : '▶️'} {req.type}
                    </span>
                  </td>
                  <td className="col-query" data-label="Query">
                    <strong>{req.query}</strong>
                  </td>
                  <td data-label="Context">
                    <span className="badge-context">
                      {req.context === 'project' ? '🎓 Project' : '📚 Class'}
                    </span>
                  </td>
                  <td className="col-note" data-label="Note">
                    {req.note ? <span className="note-text">{req.note}</span> : <span className="text-muted">—</span>}
                  </td>
                  <td data-label="Status">
                    <span className={`badge-status ${req.status}`}>
                      {req.status === 'pending' ? '⏳ Pending' : '✓ Fulfilled'}
                    </span>
                  </td>
                  <td data-label="Action">
                    {req.status === 'pending' ? (
                      <button 
                        className="btn-fulfill-pill"
                        onClick={() => handleFulfill(req.id)}
                      >
                        Complete
                      </button>
                    ) : (
                      <span className="status-done">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
