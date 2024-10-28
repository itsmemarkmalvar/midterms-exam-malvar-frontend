import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const BookList = ({ onSelectBook }) => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const mockBooks = [
      { id: 1, title: 'Book One', author: 'Author One', publishedYear: 2021, genre: 'Fiction', description: 'A fascinating tale.' },
      { id: 2, title: 'Book Two', author: 'Author Two', publishedYear: 2020, genre: 'Non-Fiction', description: 'An insightful read.' },
    ];
    setBooks(mockBooks);
  }, []);

  const handleRowClick = (book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  return (
    <>
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
            <tr key={book.id} onClick={() => handleRowClick(book)} style={{ cursor: 'pointer' }}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publishedYear}</td>
              <td>{book.genre}</td>
              <td>{book.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalVisible && selectedBook && (
        <div className="book-modal-overlay">
          <div className="book-modal-content">
            <button onClick={() => setModalVisible(false)} className="modal-close-button">
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2>{selectedBook.title}</h2>
            <div className="book-details-grid">
              <div className="detail-item">
                <label>Author:</label>
                <p>{selectedBook.author}</p>
              </div>
              <div className="detail-item">
                <label>Published Year:</label>
                <p>{selectedBook.publishedYear}</p>
              </div>
              <div className="detail-item">
                <label>Genre:</label>
                <p>{selectedBook.genre}</p>
              </div>
              <div className="detail-item">
                <label>Description:</label>
                <p>{selectedBook.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookList;
