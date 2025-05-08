import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import IdeasList from './pages/IdeasList';
import CreateIdea from './pages/CreateIdea';
import EditIdea from './pages/EditIdea';
import IdeaDetail from './pages/IdeaDetail';
import Calculator from './pages/Calculator';

function App() {
  return (
    <AppProvider>
      <Router>
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
      </Router>
    </AppProvider>
  );
}

export default App;