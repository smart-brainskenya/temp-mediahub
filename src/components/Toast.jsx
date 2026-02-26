import { useState } from "react";

export default function Toast({ message, type = "success", duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  // Auto-hide after duration
  setTimeout(() => {
    setIsVisible(false);
  }, duration);

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        {type === "success" && <span className="toast-icon">✓</span>}
        {type === "error" && <span className="toast-icon">✕</span>}
        {type === "info" && <span className="toast-icon">ℹ</span>}
        <span className="toast-message">{message}</span>
      </div>
    </div>
  );
}

