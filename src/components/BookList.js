import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../services/api';
import BookDetailsModal from './BookDetailsModal';
import './Books.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailsModal, setDetailsModal] = useState({
    isVisible: false,
    book: null
  });

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetchBooks();
        setBooks(response.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch books');
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  const handleRowClick = (book) => {
    setDetailsModal({
      isVisible: true,
      book: book
    });
  };

  const handleDetailsClose = () => {
    setDetailsModal({
      isVisible: false,
      book: null
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="book-list">
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published Year</th>
            <th>Genre</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr 
              key={book.id}
              onClick={() => handleRowClick(book)}
              style={{ cursor: 'pointer' }}
              className="book-row"
            >
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published_year}</td>
              <td>{book.genre}</td>
              <td>{book.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <BookDetailsModal
        isVisible={detailsModal.isVisible}
        onClose={handleDetailsClose}
        book={detailsModal.book}
      />
    </div>
  );
};

export default BookList;
