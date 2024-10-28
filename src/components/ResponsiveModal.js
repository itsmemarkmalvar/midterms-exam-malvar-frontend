import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ResponsiveModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Notice</h2>
        <p>The window is too small. Please use the program in a larger window for the best experience.</p>
        <button onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} /> Close
        </button>
      </div>
    </div>
  );
};

export default ResponsiveModal;
