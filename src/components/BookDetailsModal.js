import React from 'react';
import './BookDetailsModal.css';

const BookDetailsModal = ({ isVisible, onClose, book }) => {
  if (!isVisible) return null;
  if (!book) return <div className="details-modal-overlay"><div className="details-modal-content">Loading...</div></div>;

  return (
    <div className="details-modal-overlay">
      <div className="details-modal-content">
        <h2>{book.title}</h2>
        <div className="book-details-info">
          <div className="detail-row">
            <label>Author:</label>
            <span>{book.author}</span>
          </div>
          <div className="detail-row">
            <label>Published Year:</label>
            <span>{book.published_year}</span>
          </div>
          <div className="detail-row">
            <label>Genre:</label>
            <span>{book.genre}</span>
          </div>
          <div className="detail-row description">
            <label>Description:</label>
            <p>{book.description}</p>
          </div>
        </div>
        <div className="button-group">
          <button onClick={onClose} className="close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal; 