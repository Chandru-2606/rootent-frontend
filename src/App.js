import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';
import ResumeList from './pages/ResumeList';
import CreateResume from './components/Resumes/createResume';
import { SnackbarProvider } from 'notistack';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                  <Routes>
                    <Route path="/" element={<ResumeList />} />
                    <Route path="/create/:resumeId?" element={<CreateResume />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
