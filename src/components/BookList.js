import React, { useState, useEffect } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const mockBooks = [
      { id: 1, title: 'Book One', author: 'Author One', publishedYear: 2021, genre: 'Fiction', description: 'A fascinating tale.' },
      { id: 2, title: 'Book Two', author: 'Author Two', publishedYear: 2020, genre: 'Non-Fiction', description: 'An insightful read.' },
    ];
    setBooks(mockBooks);
  }, []);

  return (
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
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publishedYear}</td>
            <td>{book.genre}</td>
            <td>{book.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookList;
