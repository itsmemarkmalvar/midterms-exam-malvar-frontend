import React, { useState, useEffect } from 'react';
import { getBook, updateBook } from '../services/api';
import './EditBookModal.css';
import Spinner from './Spinner';
import sanitizeInput from '../utils/sanitizeInput';

const EditBookModal = ({ isVisible, onClose, bookId, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    published_year: '',
    genre: '',
    description: ''
  });
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (bookId) {
        setLoading(true);
        try {
          const response = await getBook(bookId);
          setFormData(response.data);
        } catch (err) {
          setError('Failed to fetch book details');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBook();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateFormData();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await updateBook(bookId, formData);
      setErrors({});
      window.dispatchEvent(new CustomEvent('notification', {
        detail: {
          message: 'Book updated successfully!',
          type: 'success'
        }
      }));
      onSuccess();
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
        err.response?.data?.message || 
        'Failed to update book';
      setError(errorMessage);
      window.dispatchEvent(new CustomEvent('notification', {
        detail: {
          message: errorMessage,
          type: 'error'
        }
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = name === 'published_year' 
      ? sanitizeInput.number(value)
      : name === 'description'
      ? sanitizeInput.description(value)
      : sanitizeInput.text(value);
    
    setFormData({
      ...formData,
      [name]: sanitizedValue
    });
  };

  const validateFormData = () => {
    const errors = {};
    const currentYear = new Date().getFullYear();

    // Title validation
    if (!formData.title?.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.length > 255) {
      errors.title = 'Title must be less than 255 characters';
    }

    // Author validation
    if (!formData.author?.trim()) {
      errors.author = 'Author is required';
    } else if (formData.author.length > 255) {
      errors.author = 'Author must be less than 255 characters';
    }

    // Published year validation
    if (!formData.published_year) {
      errors.published_year = 'Published year is required';
    } else if (formData.published_year < 1800 || formData.published_year > currentYear) {
      errors.published_year = `Published year must be between 1800 and ${currentYear}`;
    }

    // Genre validation
    if (!formData.genre?.trim()) {
      errors.genre = 'Genre is required';
    } else if (formData.genre.length > 255) {
      errors.genre = 'Genre must be less than 255 characters';
    }

    // Description validation
    if (!formData.description?.trim()) {
      errors.description = 'Description is required';
    }

    return errors;
  };

  if (!isVisible) return null;
  if (loading) return <Spinner />;

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
              className={errors.title ? 'error-input' : ''}
              required
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={errors.author ? 'error-input' : ''}
              required
            />
            {errors.author && <span className="error-message">{errors.author}</span>}
          </div>
          <div className="form-group">
            <label>Published Year:</label>
            <input
              type="number"
              name="published_year"
              value={formData.published_year}
              onChange={handleChange}
              className={errors.published_year ? 'error-input' : ''}
              required
            />
            {errors.published_year && <span className="error-message">{errors.published_year}</span>}
          </div>
          <div className="form-group">
            <label>Genre:</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className={errors.genre ? 'error-input' : ''}
              required
            />
            {errors.genre && <span className="error-message">{errors.genre}</span>}
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'error-input' : ''}
              required
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
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
