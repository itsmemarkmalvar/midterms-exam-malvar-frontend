import React, { useState } from 'react';
import { createBook } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './BookForm.css';

const BookForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    published_year: '',
    genre: '',
    description: ''
  });

  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createBook(formData);
      setSuccess(true);
      setError(null);
      setErrors({});
      setFormData({
        title: '',
        author: '',
        published_year: '',
        genre: '',
        description: ''
      });
      window.dispatchEvent(new CustomEvent('notification', {
        detail: {
          message: 'Book added successfully!',
          type: 'success'
        }
      }));
      if (onClose) onClose();
    } catch (err) {
      const errorMessage = err.response?.status === 422 
        ? 'Please check your input and try again.'
        : 'Failed to add book. Please try again.';
      setError(errorMessage);
      window.dispatchEvent(new CustomEvent('notification', {
        detail: {
          message: errorMessage,
          type: 'error'
        }
      }));
      setSuccess(false);
    }
  };

  const validateForm = (formData) => {
    const errors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.length > 255) {
      errors.title = 'Title must be less than 255 characters';
    }

    if (!formData.author.trim()) {
      errors.author = 'Author is required';
    } else if (formData.author.length > 255) {
      errors.author = 'Author must be less than 255 characters';
    }

    if (!formData.published_year) {
      errors.published_year = 'Published year is required';
    } else if (formData.published_year < 1800 || formData.published_year > currentYear) {
      errors.published_year = `Published year must be between 1800 and ${currentYear}`;
    }

    if (!formData.genre.trim()) {
      errors.genre = 'Genre is required';
    } else if (formData.genre.length > 255) {
      errors.genre = 'Genre must be less than 255 characters';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }

    return errors;
  };

  return (
    <div className="book-form">
      <h2>Add New Book</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Book added successfully!</div>}
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
          <button type="submit">Add Book</button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
