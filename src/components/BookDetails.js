import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BookDetails = ({ bookId }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data for testing
    const mockBook = {
      id: bookId,
      title: `Book ${bookId}`,
      author: `Author ${bookId}`,
      isbn: `ISBN-${bookId}`,
      publishedYear: 2020 + bookId,
      description: `Description for Book ${bookId}`,
    };
    setBook(mockBook);
    setLoading(false);
  }, [bookId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="book-details">
      <h2>{book?.title}</h2>
      <div className="book-info">
        <p><strong>Author:</strong> {book?.author}</p>
        <p><strong>ISBN:</strong> {book?.isbn}</p>
        <p><strong>Published Year:</strong> {book?.publishedYear}</p>
        <div className="book-description">
          <h3>Description</h3>
          <p>{book?.description}</p>
        </div>
      </div>
      <div className="book-actions">
        <button onClick={() => navigate('/books')}>Back to List</button>
        <button onClick={() => navigate(`/books/edit/${bookId}`)}>Edit Book</button>
      </div>
    </div>
  );
};

export default BookDetails;
