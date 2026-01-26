import { useEffect, useState } from "react";
import Toast from "./Toast";

export default function ImagePreviewModal({ image, onClose }) {
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

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(image.src);
    setToast({ message: "Image address copied to clipboard!", type: "success" });
  };

  const handleCopyHtmlCode = () => {
    const htmlCode = `<img src="${image.src}" alt="${image.alt}" />`;
    navigator.clipboard.writeText(htmlCode);
    setToast({ message: "HTML code copied to clipboard!", type: "success" });
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
          <h2>{image.title}</h2>
          
          {/* Native img element - right-click works normally */}
          <img 
            src={image.src} 
            alt={image.alt}
            className="modal-image"
            onContextMenu={(e) => {
              // Allow context menu - don't prevent default
              e.target.style.cursor = "context-menu";
            }}
          />
          
          <div className="modal-buttons">
            <button 
              className="btn-primary" 
              onClick={handleCopyAddress}
            >
              Copy Image Address
            </button>
            <button 
              className="btn-secondary" 
              onClick={handleCopyHtmlCode}
            >
              Copy Image HTML Code
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
