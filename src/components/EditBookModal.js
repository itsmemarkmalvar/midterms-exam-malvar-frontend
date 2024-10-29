import React, { useState, useEffect } from 'react';
import { getBook, updateBook } from '../services/api';
import './EditBookModal.css';

const EditBookModal = ({ isVisible, onClose, bookId }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    published_year: '',
    genre: '',
    description: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      if (bookId) {
        try {
          const response = await getBook(bookId);
          setFormData(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch book details');
          setLoading(false);
        }
      }
    };

    fetchBook();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add client-side validation
    if (formData.published_year < 1800 || formData.published_year > new Date().getFullYear() + 1) {
      setError('Published year must be between 1800 and ' + (new Date().getFullYear() + 1));
      return;
    }

    try {
      await updateBook(bookId, formData);
      onClose();
      window.location.reload();
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
        err.response?.data?.message || 
        'Failed to update book';
      setError(errorMessage);
      console.error('Update error:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isVisible) return null;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="edit-book-modal-overlay">
      <div className="edit-book-modal-content">
        <h2>Edit Book</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Published Year:</label>
            <input
              type="number"
              name="published_year"
              value={formData.published_year}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Genre:</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-group">
            <button type="button" onClick={onClose} className="close-button">
              Close
            </button>
            <button type="submit" className="save-button">
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
