import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faBars } from '@fortawesome/free-solid-svg-icons';
import BookList from './BookList';
import BookForm from './BookForm';
import ResponsiveModal from './ResponsiveModal';
import './Dashboard.css';

const Dashboard = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showBookForm, setShowBookForm] = useState(false);
  const [showHome, setShowHome] = useState(true); // State to show/hide BookList

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="dashboard">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <button className="toggle-button" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h2 className={isSidebarOpen ? '' : 'hidden'}>Navigation</h2>
        <ul>
          <li>
            <button onClick={() => { setShowHome(true); setShowBookForm(false); }}>
              <FontAwesomeIcon icon={faHome} /> {isSidebarOpen && 'Home'}
            </button>
          </li>
          <li>
            <button onClick={() => { setShowBookForm(true); setShowHome(false); }}>
              <FontAwesomeIcon icon={faBook} /> {isSidebarOpen && 'Add New Book'}
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
            {showBookForm ? (
              <BookForm />
            ) : (
              <>
                <h2>Book List</h2>
                <BookList />
              </>
            )}
          </div>
        </div>
      </main>
      <ResponsiveModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
    </div>
  );
};

export default Dashboard;
