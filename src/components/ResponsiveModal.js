import React from 'react';

const ResponsiveModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Notice</h2>
        <p>The window is too small. Please use the program in a larger window for the best experience.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ResponsiveModal;
