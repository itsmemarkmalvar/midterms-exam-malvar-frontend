import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './BookForm.css';

const BookForm = ({ bookId, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishedYear: '',
    genre: '',
    description: ''
  });

  useEffect(() => {
    if (bookId) {
      // Mock data for editing
      const mockBook = {
        title: `Book ${bookId}`,
        author: `Author ${bookId}`,
        publishedYear: 2020 + bookId,
        genre: `Genre ${bookId}`,
        description: `Description for Book ${bookId}`,
      };
      setFormData(mockBook);
    }
  }, [bookId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement create/update functionality
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="book-form">
      <h2>{bookId ? 'Edit Book' : 'Add New Book'}</h2>
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
            name="publishedYear"
            value={formData.publishedYear}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button type="submit">{bookId ? 'Update Book' : 'Add Book'}</button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
