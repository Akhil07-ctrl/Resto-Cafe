import { useEffect } from 'react';
import './styles.css';

export default function Notification({ message, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-hide after 3 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="notification">
      <div className="notification-content">
        <span>{message}</span>
        <button className="notification-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
}