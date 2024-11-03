import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BookForm from './components/BookForm';
import Notification from './components/Notification';
import './components/Books.css';

function App() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const handleNotification = (event) => {
      setNotification(event.detail);
    };
    window.addEventListener('notification', handleNotification);

    return () => {
      window.removeEventListener('notification', handleNotification);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books/add" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
