import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BookForm from './components/BookForm';
import './components/Books.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books/add" element={<BookForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
