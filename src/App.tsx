import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import TestComponent from './components/TestComponent';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<TestComponent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;