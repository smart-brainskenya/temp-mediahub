import { useEffect, useState } from "react";
import Toast from "./Toast";

export default function VideoPreviewModal({ video, onClose }) {
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(video.src);
    setToast({ message: "Video link copied to clipboard!", type: "success" });
  };

  // Click backdrop to close (but not the modal itself)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close preview">
          ✕
        </button>
        
        <div className="modal-body">
          <h2>{video.title}</h2>
          
          {/* Native video element - right-click works normally */}
          <video 
            controls 
            poster={video.poster}
            className="modal-video"
            onContextMenu={(e) => {
              // Allow context menu - don't prevent default
              e.currentTarget.style.cursor = "context-menu";
            }}
          >
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="modal-buttons">
            <button 
              className="btn-primary" 
              onClick={handleCopyLink}
            >
              Copy Video Link
            </button>
          </div>
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
