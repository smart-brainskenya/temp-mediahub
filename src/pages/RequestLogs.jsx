import { useState, useEffect, useMemo } from 'react';
import './RequestLogs.css';

export default function RequestLogs() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProduction, setIsProduction] = useState(false);
  const [prodMessage, setProdMessage] = useState('');
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
        if (data.production) {
          setIsProduction(true);
          setProdMessage(data.message);
        } else if (Array.isArray(data)) {
          setRequests(data);
        } else {
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
    return new Date(isoString).toLocaleString();
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const fulfilledCount = requests.filter(r => r.status === 'fulfilled').length;

  const handleFulfill = async (id) => {
    try {
      const response = await fetch('/api/fulfill-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      
      if (response.ok) {
        setRequests(prev => prev.map(req => 
          req.id === id ? { ...req, status: 'fulfilled' } : req
        ));
      }
    } catch (err) {
      console.error('Failed to fulfill request:', err);
    }
  };

  if (loading) {
    return (
      <div className="logs-container">
        <div className="logs-header">
          <h1>Asset Request Logs</h1>
        </div>
        <div className="logs-loading">
          <p>Loading requests...</p>
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
        <div className="logs-error">⚠️ {error}</div>
      </div>
    );
  }

  return (
    <div className="logs-container">
      <div className="logs-header">
        <h1>Asset Request Logs</h1>
        <p>Review student requests for missing assets. Approve and add them to the collection.</p>
      </div>

      {isProduction ? (
        <div className="logs-production-message">
          <div className="logs-info-icon">ℹ️</div>
          <h3>Production Environment</h3>
          <p>{prodMessage}</p>
        </div>
      ) : (
        <>
          <div className="logs-stats">
            <div className="stat-card">
              <div className="stat-number">{requests.length}</div>
              <div className="stat-label">Total Requests</div>
            </div>
            <div className="stat-card highlight-pending">
              <div className="stat-number">{pendingCount}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-card highlight-fulfilled">
              <div className="stat-number">{fulfilledCount}</div>
              <div className="stat-label">Fulfilled</div>
            </div>
          </div>

          {requests.length > 0 && (
            <div className="logs-filters">
              <button 
                className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                All ({requests.length})
              </button>
              <button 
                className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
                onClick={() => setFilterStatus('pending')}
              >
                Pending ({pendingCount})
              </button>
              <button 
                className={`filter-btn ${filterStatus === 'fulfilled' ? 'active' : ''}`}
                onClick={() => setFilterStatus('fulfilled')}
              >
                Fulfilled ({fulfilledCount})
              </button>
            </div>
          )}

          {sortedRequests.length === 0 ? (
            <div className="logs-empty">
              <p>😊 No requests to display.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="logs-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Type</th>
                    <th>What They're Looking For</th>
                    <th>Context</th>
                    <th>Notes</th>
                    <th>Status</th>
                    {!isProduction && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {sortedRequests.map((req) => (
                    <tr key={req.id}>
                      <td className="col-time" data-label="Time">{formatDate(req.timestamp)}</td>
                      <td data-label="Type">
                        <span className={`badge-type ${req.type}`}>
                          {req.type === 'image' ? '🖼️' : '▶️'} {req.type}
                        </span>
                      </td>
                      <td className="col-query" data-label="Query"><strong>{req.query}</strong></td>
                      <td data-label="Context">
                        <span className="badge-context">
                          {req.context === 'project' ? '🎓' : '📚'} {req.context === 'project' ? 'School Project' : 'Class Work'}
                        </span>
                      </td>
                      <td className="col-note" data-label="Notes">
                        {req.note ? <span>{req.note}</span> : <span className="text-muted">—</span>}
                      </td>
                      <td data-label="Status">
                        <span className={`badge-status ${req.status}`}>
                          {req.status === 'pending' ? '⏳ Pending' : '✓ Fulfilled'}
                        </span>
                      </td>
                      {!isProduction && (
                        <td data-label="Action">
                          {req.status === 'pending' && (
                            <button 
                              className="btn-fulfill"
                              onClick={() => handleFulfill(req.id)}
                              title="Mark as fulfilled once asset is added"
                            >
                              Approve
                            </button>
                          )}
                          {req.status === 'fulfilled' && (
                            <span className="text-fulfilled">✓ Done</span>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
