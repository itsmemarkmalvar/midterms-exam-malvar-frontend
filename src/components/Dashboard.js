import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faBars, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import BookList from './BookList';
import BookForm from './BookForm';
import EditBookList from './EditBookList';
import EditBookModal from './EditBookModal';
import './Dashboard.css';

const Dashboard = () => {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleEditBook = (id) => {
    setSelectedBookId(id);
    setEditModalVisible(true);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div key="home">
            <h2>Book List</h2>
            <BookList key={refreshTrigger} />
          </div>
        );
      case 'add':
        return (
          <div key="add">
            <BookForm onSuccess={() => {
              handleRefresh();
              setCurrentView('home');
            }} />
          </div>
        );
      case 'edit':
        return (
          <div key="edit">
            <h2>Edit Book</h2>
            <EditBookList key={refreshTrigger} onSelectBook={handleEditBook} />
          </div>
        );
      default:
        return null;
    }
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
            <button onClick={() => setCurrentView('home')}>
              <FontAwesomeIcon icon={faHome} /> {isSidebarOpen && 'Home'}
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentView('add')}>
              <FontAwesomeIcon icon={faBook} /> {isSidebarOpen && 'Add New Book'}
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentView('edit')}>
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
          <TransitionGroup>
            <CSSTransition
              key={currentView}
              timeout={300}
              classNames="fade"
            >
              <div className="dashboard-section">
                {renderContent()}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </main>
      <EditBookModal 
        isVisible={isEditModalVisible} 
        onClose={() => setEditModalVisible(false)} 
        bookId={selectedBookId}
        onSuccess={() => {
          handleRefresh();
          setEditModalVisible(false);
        }}
      />
    </div>
  );
};

export default Dashboard;
