import React from 'react';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ isVisible, onClose, onConfirm, bookTitle }) => {
  if (!isVisible) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete "{bookTitle}"?</p>
        <p className="warning-text">This action cannot be undone.</p>
        <div className="button-group">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button onClick={onConfirm} className="confirm-delete-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal; 