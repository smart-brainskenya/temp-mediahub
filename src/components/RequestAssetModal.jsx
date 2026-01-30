import { useState, useEffect } from "react";
import Toast from "./Toast";
import { href } from "react-router-dom";

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
    
    // Validation: require at least 3 characters in query
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 3) {
      setToast({ message: "Please describe what you're looking for (at least 3 characters).", type: "error" });
      return;
    }

    setStatus("submitting");

    const requestData = {
      id: `req_${Date.now()}`,
      query: trimmedQuery,
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
      setStatus("idle");
      setToast({ message: "Failed to send request. Please try again.", type: "error" });
    }
  };

  // Click backdrop to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseModal = () => {
    // Clear search and navigate back
    localStorage.removeItem("searchQuery");
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content request-modal-content">
        
        {/* Header */}
        <div className="request-header">
          <h2>Request Missing Asset</h2>
          <button className="modal-close" style={{position: 'static'}} onClick={handleCloseModal} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="request-body">
          {status === "success" ? (
            <div className="success-state">
              <div className="success-icon">✓</div>
              <h3>Request sent successfully!</h3>
              <p>We'll add "<strong>{query.trim()}</strong>" to our collection soon.</p>
              <p className="success-subtext">Check back to see your request in action!</p>
              <button className="btn-primary" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label className="form-label" htmlFor="req-query">
                  What are you looking for?
                </label>
                <p className="form-hint">Be specific to help us find it faster</p>
                <input
                  id="req-query"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="form-input"
                  placeholder="e.g. Red apple, Mountain landscape, Soccer goals"
                  required
                  disabled={status === "submitting"}
                  autoFocus
                  minLength="3"
                />
                <small className="character-count">{query.trim().length} characters</small>
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
                  placeholder="e.g. Needed for a Potfolio website, school presentation,"
                  disabled={status === "submitting"}
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={handleCloseModal}
                  disabled={status === "submitting"}
                  style={{ border: 'none', color: 'var(--text-light)' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={status === "submitting" || query.trim().length < 3}
                  style={{ position: 'relative' }}
                >
                  {status === "submitting" ? (
                    <>
                      <span style={{ opacity: 0.7 }}>Sending...</span>
                      <span className="loading-dot" style={{ marginLeft: '0.5rem' }}>•</span>
                    </>
                  ) : (
                    "Send Request"
                  )}
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