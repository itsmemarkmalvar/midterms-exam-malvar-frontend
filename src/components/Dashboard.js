import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import BookForm from './BookForm';
import ResponsiveModal from './ResponsiveModal';
import './Dashboard.css';

const Dashboard = () => {
  const [isModalVisible, setModalVisible] = useState(false);

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
      <aside className="sidebar">
        <h2>Navigation</h2>
        <ul>
          <li><button>Home</button></li>
          <li><button>Add Book</button></li>
        </ul>
      </aside>
      <main className="main-content">
        <header className="navbar">
          <h1>Book Management System</h1>
        </header>
        <div className="dashboard-content">
          <div className="dashboard-section">
            <h2>Book List</h2>
            <BookList />
          </div>
          <div className="dashboard-section">
            <h2>Add New Book</h2>
            <BookForm />
          </div>
        </div>
      </main>
      <ResponsiveModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
    </div>
  );
};

export default Dashboard;
