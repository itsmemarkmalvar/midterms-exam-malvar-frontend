import React, { useState, useEffect } from 'react';

const EditBookList = ({ onSelectBook }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const mockBooks = [
      { id: 1, title: 'Book One', author: 'Author One', publishedYear: 2021, genre: 'Fiction', description: 'A fascinating tale.' },
      { id: 2, title: 'Book Two', author: 'Author Two', publishedYear: 2020, genre: 'Non-Fiction', description: 'An insightful read.' },
    ];
    setBooks(mockBooks);
  }, []);

  const handleDelete = (id) => {
    // TODO: Implement delete functionality
    console.log('Delete book with id:', id);
  };

  return (
    <table className="book-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Published Year</th>
          <th>Genre</th>
          <th>Description</th>
          <th style={{ width: '200px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td style={{ fontSize: '14px' }}>{book.title}</td>
            <td style={{ fontSize: '14px' }}>{book.author}</td>
            <td style={{ fontSize: '14px' }}>{book.publishedYear}</td>
            <td style={{ fontSize: '14px' }}>{book.genre}</td>
            <td style={{ fontSize: '14px' }}>{book.description}</td>
            <td>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button 
                  onClick={() => onSelectBook(book.id)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(book.id)}
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
  );
};

export default EditBookList;
