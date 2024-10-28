import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faBars, faEdit } from '@fortawesome/free-solid-svg-icons';
import BookList from './BookList';
import BookForm from './BookForm';
import EditBookList from './EditBookList';
import EditBookModal from './EditBookModal'; // Import the new modal component
import './Dashboard.css';

const Dashboard = () => {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showBookForm, setShowBookForm] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [showEditBook, setShowEditBook] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleEditBook = (id) => {
    setSelectedBookId(id);
    setEditModalVisible(true);
  };

  return (
    <div className="dashboard">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <button className="toggle-button" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h2 className={isSidebarOpen ? '' : 'hidden'}>Navigation</h2>
        <ul>
          <li>
            <button onClick={() => { setShowHome(true); setShowBookForm(false); setShowEditBook(false); }}>
              <FontAwesomeIcon icon={faHome} /> {isSidebarOpen && 'Home'}
            </button>
          </li>
          <li>
            <button onClick={() => { setShowBookForm(true); setShowHome(false); setShowEditBook(false); }}>
              <FontAwesomeIcon icon={faBook} /> {isSidebarOpen && 'Add New Book'}
            </button>
          </li>
          <li>
            <button onClick={() => { setShowEditBook(true); setShowHome(false); setShowBookForm(false); }}>
              <FontAwesomeIcon icon={faEdit} /> {isSidebarOpen && 'Edit Book'}
            </button>
          </li>
        </ul>
      </aside>
      <main className="main-content">
        <header className="navbar">
          <h1>Book Management System</h1>
        </header>
        <div className="dashboard-content">
          <div className="dashboard-section">
            {showBookForm && <BookForm />}
            {showHome && (
              <>
                <h2>Book List</h2>
                <BookList />
              </>
            )}
            {showEditBook && (
              <>
                <h2>Edit Book</h2>
                <EditBookList onSelectBook={handleEditBook} />
              </>
            )}
          </div>
        </div>
      </main>
      <EditBookModal isVisible={isEditModalVisible} onClose={() => setEditModalVisible(false)} bookId={selectedBookId} />
    </div>
  );
};

export default Dashboard;
