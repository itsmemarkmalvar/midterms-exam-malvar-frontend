import React, { useState, useEffect } from 'react';
import { fetchBooks, deleteBook } from '../services/api';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import BookDetailsModal from './BookDetailsModal';

const EditBookList = ({ onSelectBook }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isVisible: false,
    bookId: null,
    bookTitle: ''
  });
  const [detailsModal, setDetailsModal] = useState({
    isVisible: false,
    book: null
  });

  const fetchBookList = async () => {
    try {
      const response = await fetchBooks();
      setBooks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch books');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookList();
  }, []);

  const handleDeleteClick = (book) => {
    setDeleteModal({
      isVisible: true,
      bookId: book.id,
      bookTitle: book.title
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteBook(deleteModal.bookId);
      if (response.status === 204) {
        setDeleteModal({ isVisible: false, bookId: null, bookTitle: '' });
        fetchBookList();
      } else {
        throw new Error('Failed to delete book');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
        err.response?.data?.message || 
        'Failed to delete book';
      setError(errorMessage);
      console.error('Delete error:', err);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isVisible: false, bookId: null, bookTitle: '' });
  };

  const handleRowClick = (event, book) => {
    if (event.target.tagName === 'BUTTON') {
      return;
    }
    
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
    <>
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published Year</th>
            <th>Description</th>
            <th style={{ width: '200px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr 
              key={book.id}
              onClick={(e) => handleRowClick(e, book)}
              style={{ cursor: 'pointer' }}
              className="book-row"
            >
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published_year}</td>
              <td>{book.description}</td>
              <td>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button 
                    onClick={() => onSelectBook(book.id)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(book)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmationModal
        isVisible={deleteModal.isVisible}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        bookTitle={deleteModal.bookTitle}
      />

      <BookDetailsModal
        isVisible={detailsModal.isVisible}
        onClose={handleDetailsClose}
        book={detailsModal.book}
      />
    </>
  );
};

export default EditBookList;
