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
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBook(formData);
      setSuccess(true);
      setError(null);
      // Reset form after successful submission
      setFormData({
        title: '',
        author: '',
        published_year: '',
        genre: '',
        description: ''
      });
      // Optional: Close form or show success message
      if (onClose) onClose();
    } catch (err) {
      setError('Failed to add book. Please try again.');
      setSuccess(false);
    }
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
          <button type="submit">Add Book</button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
