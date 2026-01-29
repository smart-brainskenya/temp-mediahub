import { useState, useEffect } from "react";
import Toast from "./Toast";

export default function RequestAssetModal({ initialQuery, initialType = "image", onClose }) {
  const [query, setQuery] = useState(initialQuery || "");
  const [type, setType] = useState(initialType);
  const [context, setContext] = useState("project");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [toast, setToast] = useState(null);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setStatus("submitting");

    const requestData = {
      id: `req_${Date.now()}`,
      query: query.trim(),
      type,
      note: note.trim(),
      context,
      timestamp: new Date().toISOString(),
      status: "pending"
    };

    try {
      const response = await fetch('/api/request-asset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setToast({ message: "Failed to send request. Please try again.", type: "error" });
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  // Click backdrop to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content request-modal-content">
        
        {/* Header */}
        <div className="request-header">
          <h2>Request Missing Asset</h2>
          <button className="modal-close" style={{position: 'static'}} onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="request-body">
          {status === "success" ? (
            <div className="success-state">
              <div className="success-icon">✓</div>
              <h3>Request Sent!</h3>
              <p>
                We've received your request for <strong>"{query}"</strong>.<br/>
                Our team will look for it. Check back soon!
              </p>
              <button className="btn-primary" onClick={onClose}>
                Return to Gallery
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label className="form-label" htmlFor="req-query">
                  What are you looking for?
                </label>
                <input
                  id="req-query"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="form-input"
                  placeholder="e.g. Red apple on a table"
                  required
                  disabled={status === "submitting"}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label">Asset Type</label>
                <div className="radio-group">
                  <label className="radio-card">
                    <input
                      type="radio"
                      name="type"
                      value="image"
                      checked={type === "image"}
                      onChange={(e) => setType(e.target.value)}
                      disabled={status === "submitting"}
                    />
                    <div className="radio-card-content">
                      <span>🖼</span> Image
                    </div>
                  </label>
                  <label className="radio-card">
                    <input
                      type="radio"
                      name="type"
                      value="video"
                      checked={type === "video"}
                      onChange={(e) => setType(e.target.value)}
                      disabled={status === "submitting"}
                    />
                    <div className="radio-card-content">
                      <span>▶</span> Video
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Context</label>
                <div className="radio-group">
                  <label className="radio-card">
                    <input
                      type="radio"
                      name="context"
                      value="project"
                      checked={context === "project"}
                      onChange={(e) => setContext(e.target.value)}
                      disabled={status === "submitting"}
                    />
                    <div className="radio-card-content">
                      <span>🎓</span> School Project
                    </div>
                  </label>
                  <label className="radio-card">
                    <input
                      type="radio"
                      name="context"
                      value="class"
                      checked={context === "class"}
                      onChange={(e) => setContext(e.target.value)}
                      disabled={status === "submitting"}
                    />
                    <div className="radio-card-content">
                      <span>📚</span> Class Work
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="req-note">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="req-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="form-textarea"
                  placeholder="e.g. Needed for history presentation on Tuesday"
                  disabled={status === "submitting"}
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={onClose}
                  disabled={status === "submitting"}
                  style={{ border: 'none', color: 'var(--text-light)' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={status === "submitting" || !query.trim()}
                >
                  {status === "submitting" ? "Sending..." : "Send Request"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          duration={3000}
        />
      )}
    </div>
  );
}
