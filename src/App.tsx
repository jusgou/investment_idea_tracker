import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import IdeasList from './pages/IdeasList';
import CreateIdea from './pages/CreateIdea';
import EditIdea from './pages/EditIdea';
import IdeaDetail from './pages/IdeaDetail';
import Calculator from './pages/Calculator';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/ideas" element={<IdeasList />} />
                      <Route path="/ideas/:id" element={<IdeaDetail />} />
                      <Route path="/create" element={<CreateIdea />} />
                      <Route path="/edit/:id" element={<EditIdea />} />
                      <Route path="/calculator" element={<Calculator />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;