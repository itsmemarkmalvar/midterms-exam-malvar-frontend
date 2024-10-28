import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ResponsiveModal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} /> Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default ResponsiveModal;
